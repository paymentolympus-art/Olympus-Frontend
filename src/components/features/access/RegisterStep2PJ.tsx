import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step2PJSchema,
  type Step2PJFormData,
} from "@/validators/register-step2-pj";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Building2, Building, Store, Phone } from "lucide-react";
import { formatCNPJ, formatPhone } from "./utils/formatters";
import { InputWithIcon } from "./InputWithIcon";
import { useRegisterStore } from "@/stores/register-store";
import { validatePJData } from "@/validators/register-final";
import { registerUser } from "@/api/user";
import { toast } from "sonner";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function RegisterStep2PJ() {
  const navigate = useNavigate();
  const {
    step1Data,
    step2PJData,
    saveStep2PJData,
    setCurrentError,
    setIsSubmitting,
    reset,
  } = useRegisterStore();

  const form = useForm<Step2PJFormData>({
    resolver: zodResolver(step2PJSchema),
    defaultValues: step2PJData || {
      companyCnpj: "",
      companyName: "",
      tradeName: "",
      phone: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  // Atualiza erro no store
  useEffect(() => {
    const errors = form.formState.errors;
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      setCurrentError(firstError.message);
    } else {
      setCurrentError(null);
    }
  }, [form.formState.errors, setCurrentError]);

  const validateField = async (fieldName: keyof Step2PJFormData) => {
    await form.trigger(fieldName);
  };

  const handleSubmit = async (data: Step2PJFormData) => {
    if (!step1Data) {
      toast.error("Dados da etapa 1 não encontrados");
      return;
    }

    setIsSubmitting(true);
    try {
      // Validação final antes de enviar
      const finalData = validatePJData(step1Data, data);

      // Salva no store
      saveStep2PJData(data);

      // Envia para API
      const message = await registerUser(finalData);

      // Limpa tudo
      form.reset();
      reset();

      toast.success(message);
      navigate(ROUTES_PUBLIC.LOGIN);
    } catch (error: any) {
      const msg = error?.message || "Erro ao registrar usuário";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="register-step2-pj-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="companyCnpj"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Building2}
                  placeholder="Digite seu CNPJ"
                  maxLength={18}
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCNPJ(e.target.value);
                    field.onChange(formatted);
                  }}
                  onBlur={() => validateField("companyCnpj")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Building}
                  placeholder="Digite a razão social"
                  {...field}
                  onBlur={() => validateField("companyName")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tradeName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Store}
                  placeholder="Digite o nome fantasia"
                  {...field}
                  onBlur={() => validateField("tradeName")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Phone}
                  placeholder="Digite seu telefone"
                  maxLength={15}
                  {...field}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    field.onChange(formatted);
                  }}
                  onBlur={() => validateField("phone")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={(checked) => {
                    field.onChange(!!checked);
                    validateField("acceptTerms");
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none flex-1 ml-2">
                <FormLabel className="text-xs sm:text-sm font-normal leading-tight text-white">
                  <span className="whitespace-nowrap">
                    Aceito os{" "}
                    <a
                      href="#"
                      className="text-primary hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      termos de uso
                    </a>{" "}
                    e{" "}
                    <a
                      href="#"
                      className="text-primary hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      política de privacidade
                    </a>
                  </span>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
