import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createPixKeySchema,
  type CreatePixKeyFormData,
} from "@/validators/withdrawal";
import {
  usePixKeys,
  useCreatePixKey,
  useDeletePixKey,
  useSendWithdrawalCode,
} from "@/hooks/useWithdrawal";
import { Trash2, Plus } from "lucide-react";
import type { PixKey } from "@/types/withdrawal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const pixKeyTypeLabels: Record<string, string> = {
  EMAIL: "E-mail",
  CPF: "CPF",
  CNPJ: "CNPJ",
  PHONE: "Telefone",
  RANDOM: "Chave Aleatória",
};

export function PixKeyManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState<PixKey | null>(null);
  const [deleteCode, setDeleteCode] = useState("");
  const [isRequestingCode, setIsRequestingCode] = useState(false);

  const { pixKeys, isLoading } = usePixKeys();
  const createPixKey = useCreatePixKey();
  const deletePixKey = useDeletePixKey();
  const sendCode = useSendWithdrawalCode();

  const form = useForm<CreatePixKeyFormData>({
    resolver: zodResolver(createPixKeySchema),
    defaultValues: {
      type: "EMAIL",
      value: "",
      code: "",
    },
  });

  const handleCreateSubmit = async (data: CreatePixKeyFormData) => {
    try {
      await createPixKey.mutateAsync(data);
      form.reset();
      setIsCreateModalOpen(false);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleRequestCode = async () => {
    try {
      setIsRequestingCode(true);
      await sendCode.mutateAsync("PIX_KEY");
    } catch (error) {
      // Erro já é tratado no hook
    } finally {
      setIsRequestingCode(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteKey) return;

    try {
      await deletePixKey.mutateAsync({
        pixKeyId: deleteKey.id,
        data: { code: deleteCode },
      });
      setDeleteKey(null);
      setDeleteCode("");
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-700/20 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Chaves Cadastradas</h3>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Chave PIX
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Chave PIX</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Chave</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EMAIL">E-mail</SelectItem>
                          <SelectItem value="CPF">CPF</SelectItem>
                          <SelectItem value="CNPJ">CNPJ</SelectItem>
                          <SelectItem value="PHONE">Telefone</SelectItem>
                          <SelectItem value="RANDOM">
                            Chave Aleatória
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor da Chave</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o valor da chave"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createPixKey.isPending}>
                    {createPixKey.isPending ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {pixKeys.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhuma chave PIX cadastrada
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pixKeys.map((key) => (
            <Card key={key.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {pixKeyTypeLabels[key.type] || key.type}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteKey(key)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{key.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog
        open={!!deleteKey}
        onOpenChange={(open) => !open && setDeleteKey(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta chave PIX? Esta ação requer
              código de verificação.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Código de verificação
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={deleteCode}
                  onChange={(e) => setDeleteCode(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRequestCode}
                  disabled={isRequestingCode || sendCode.isPending}
                >
                  {isRequestingCode || sendCode.isPending
                    ? "Enviando..."
                    : "Enviar código"}
                </Button>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={!deleteCode || deleteCode.length !== 6}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
