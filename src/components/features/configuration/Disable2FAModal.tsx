import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  disable2FASchema,
  type Disable2FAFormData,
} from "@/validators/configuration";
import { requestEmailCode, disable2FA } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldOff } from "lucide-react";

interface Disable2FAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function Disable2FAModal({
  isOpen,
  onClose,
  onSuccess,
}: Disable2FAModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [codeRequested, setCodeRequested] = useState(false);

  const form = useForm<Disable2FAFormData>({
    resolver: zodResolver(disable2FASchema),
    defaultValues: {
      password: "",
      code: "",
    },
    mode: "onChange",
  });

  // Mutation para solicitar código
  const requestCodeMutation = useMutation({
    mutationFn: requestEmailCode,
    onSuccess: () => {
      setCodeRequested(true);
      toast.success("Código de verificação enviado! Verifique seu email.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao solicitar código de verificação");
    },
  });

  // Mutation para desativar 2FA
  const disableMutation = useMutation({
    mutationFn: disable2FA,
    onSuccess: () => {
      toast.success("Autenticação de dois fatores desativada com sucesso!");
      form.reset();
      setCodeRequested(false);
      onSuccess();
      onClose();
    },
    onError: (err: any) => {
      toast.error(
        err.message || "Erro ao desativar autenticação de dois fatores"
      );
    },
  });

  const handleRequestCode = async () => {
    await requestCodeMutation.mutateAsync();
  };

  const onSubmit = async (data: Disable2FAFormData) => {
    if (!codeRequested) {
      toast.error("Por favor, solicite o código de verificação primeiro");
      return;
    }
    await disableMutation.mutateAsync(data);
  };

  const handleClose = () => {
    form.reset();
    setCodeRequested(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ShieldOff className="h-5 w-5 text-yellow-500" />
            <DialogTitle>Desativar Autenticação de Dois Fatores</DialogTitle>
          </div>
          <DialogDescription>
            Por segurança, confirme sua senha e forneça o código de verificação
            enviado por email para desativar o 2FA.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
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
                  <FormLabel>Código de Verificação</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        {...field}
                        disabled={!codeRequested}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleRequestCode}
                        disabled={requestCodeMutation.isPending}
                      >
                        {requestCodeMutation.isPending
                          ? "Enviando..."
                          : codeRequested
                            ? "Reenviar"
                            : "Solicitar Código"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {!codeRequested && (
                    <p className="text-sm text-muted-foreground">
                      Clique em "Solicitar Código" para receber um código de
                      verificação por email
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={disableMutation.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={
                  disableMutation.isPending ||
                  !codeRequested ||
                  !form.formState.isValid
                }
              >
                {disableMutation.isPending ? "Desativando..." : "Desativar 2FA"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
