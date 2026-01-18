import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/format";
import {
  createWithdrawalSchema,
  type CreateWithdrawalFormData,
} from "@/validators/withdrawal";
import {
  useCreateWithdrawal,
  useWithdrawalBalance,
  usePixKeys,
  useSendWithdrawalCode,
} from "@/hooks/useWithdrawal";

interface WithdrawalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WithdrawalModal({ open, onOpenChange }: WithdrawalModalProps) {
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const { balance } = useWithdrawalBalance();
  const { pixKeys, isLoading: isLoadingPixKeys } = usePixKeys();
  const createWithdrawal = useCreateWithdrawal();
  const sendCode = useSendWithdrawalCode();

  const form = useForm<CreateWithdrawalFormData>({
    resolver: zodResolver(createWithdrawalSchema),
    defaultValues: {
      value: 0,
      code: "",
      pixKeyId: "",
    },
  });

  const selectedValue = form.watch("value");

  // Calcular valor líquido e taxa
  const withdrawalTax = balance?.withdrawalTax || 0;
  const netValue = selectedValue > 0 ? selectedValue - withdrawalTax : 0;
  const availableForWithdrawal = balance?.availableBalance || 0;

  const handleRequestCode = async () => {
    try {
      setIsRequestingCode(true);
      await sendCode.mutateAsync("WITHDRAWAL");
    } catch (error) {
      // Erro já é tratado no hook
    } finally {
      setIsRequestingCode(false);
    }
  };

  const onSubmit = async (data: CreateWithdrawalFormData) => {
    try {
      await createWithdrawal.mutateAsync(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Realizar saque</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo Valor */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="10"
                      placeholder="0,00"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    Disponível para antecipação:{" "}
                    {formatCurrency(availableForWithdrawal)}
                  </p>
                </FormItem>
              )}
            />

            {/* Seleção de Chave PIX */}
            <FormField
              control={form.control}
              name="pixKeyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione a chave PIX</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingPixKeys || pixKeys.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma chave PIX" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pixKeys.map((key) => (
                        <SelectItem key={key.id} value={key.id}>
                          {key.type}: {key.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  {pixKeys.length === 0 && (
                    <p className="text-sm text-yellow-500">
                      Você precisa cadastrar uma chave PIX primeiro
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Taxa de saque */}
            <div className="p-4 rounded-md border border-gray-700/20 bg-gray-900/20">
              <p>Valor líquido</p>
              <p className="text-2xl font-bold">
                {netValue > 0 ? formatCurrency(netValue) : "0,00"}
              </p>
              <p className="text-sm">Taxa de {formatCurrency(withdrawalTax)}</p>
            </div>

            {/* Código de verificação */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Código de verificação</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRequestCode}
                      disabled={isRequestingCode || sendCode.isPending}
                    >
                      {isRequestingCode || sendCode.isPending
                        ? "Enviando..."
                        : "Enviar código"}
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botões */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={
                  createWithdrawal.isPending ||
                  !form.formState.isValid ||
                  pixKeys.length === 0
                }
              >
                {createWithdrawal.isPending ? "Processando..." : "Confirmar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
