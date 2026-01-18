import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  changePasswordSchema,
  type ChangePasswordFormData,
} from "@/validators/configuration";
import { requestPasswordChangeCode, changePassword } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound } from "lucide-react";

export function ChangePasswordCard() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [codeRequested, setCodeRequested] = useState(false);
  const [isRequestingCode, setIsRequestingCode] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      code: "",
    },
    mode: "onChange",
  });

  // Mutation para solicitar código
  const requestCodeMutation = useMutation({
    mutationFn: requestPasswordChangeCode,
    onSuccess: () => {
      setCodeRequested(true);
      toast.success("Código de verificação enviado! Verifique seu email.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao solicitar código de verificação");
    },
  });

  // Mutation para alterar senha
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      form.reset();
      setCodeRequested(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao alterar senha");
    },
  });

  const handleRequestCode = async () => {
    setIsRequestingCode(true);
    try {
      await requestCodeMutation.mutateAsync();
    } finally {
      setIsRequestingCode(false);
    }
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!codeRequested) {
      toast.error("Por favor, solicite o código de verificação primeiro");
      return;
    }
    await changePasswordMutation.mutateAsync(data);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          <CardTitle>Alterar Senha</CardTitle>
        </div>
        <CardDescription>
          Para alterar sua senha, você precisará fornecer sua senha atual, uma
          nova senha e um código de verificação enviado por email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha Atual</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Digite sua senha atual"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? (
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua nova senha"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
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

            <div className="space-y-2">
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
                          disabled={
                            isRequestingCode || requestCodeMutation.isPending
                          }
                        >
                          {codeRequested ? "Reenviar" : "Solicitar Código"}
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
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                changePasswordMutation.isPending ||
                !codeRequested ||
                !form.formState.isValid
              }
            >
              {changePasswordMutation.isPending
                ? "Alterando..."
                : "Alterar Senha"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
