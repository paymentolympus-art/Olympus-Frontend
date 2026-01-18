import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/validators/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { loginUser } from "@/api/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES_PRIVATE } from "@/constants/routes";

export function LoginForm() {
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  // Função para obter a primeira mensagem de erro
  const getFirstError = () => {
    const errors = form.formState.errors;
    const errorFields = Object.keys(errors) as (keyof LoginFormData)[];

    for (const field of errorFields) {
      const error = errors[field];
      if (error?.message) {
        return {
          field,
          message: error.message,
        };
      }
    }
    return null;
  };

  // Atualiza a mensagem de erro atual quando os erros mudam
  useEffect(() => {
    const error = getFirstError();
    if (error) {
      setCurrentError(error.message);
    } else {
      setCurrentError(null);
    }
  }, [form.formState.errors, form.formState.isValidating]);

  // Função para focar no primeiro campo com erro
  const focusFirstError = () => {
    const error = getFirstError();
    if (error?.field) {
      const element = document.querySelector(
        `[name="${error.field}"]`
      ) as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  };

  // Função para validar um campo específico
  const validateField = async (fieldName: keyof LoginFormData) => {
    await form.trigger(fieldName);
  };

  async function onSubmit(data: LoginFormData) {
    try {
      const message = await loginUser(data);

      form.reset();
      setCurrentError(null);
      toast.success(message);

      // Aguarda um pouco para garantir que o token seja salvo
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate(ROUTES_PRIVATE.DASHBOARD);
    } catch (error: any) {
      const msg = error?.message || "Erro ao fazer login";
      toast.error(msg);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  onBlur={() => validateField("email")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    {...field}
                    onBlur={() => validateField("password")}
                    className={cn(
                      "pr-10",
                      !showPassword &&
                        "md:text-inherit md:text-xl font-serif placeholder:font-sans leading-1"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Lembrar-me e Esqueceu a senha */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      validateField("rememberMe");
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal ">
                  Lembrar-me
                </FormLabel>
              </FormItem>
            )}
          />

          <button
            type="button"
            className="text-sm text-neutral-300 sm:text-neutral-400 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              // Implementar lógica de recuperação de senha
              alert("Funcionalidade de recuperação de senha");
            }}
          >
            Esqueceu sua senha?
          </button>
        </div>

        {/* Mensagem de erro centralizada */}
        {currentError && (
          <div
            className="border rounded-md p-3"
            style={{
              borderColor: "rgba(239, 68, 68, 0.4)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-destructive text-sm font-medium">
                {currentError}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={focusFirstError}
                className="text-destructive hover:text-destructive h-auto p-1"
              >
                Corrigir
              </Button>
            </div>
          </div>
        )}

        {/* Botão de Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
