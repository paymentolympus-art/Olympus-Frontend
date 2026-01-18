import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step2PFSchema,
  type Step2PFFormData,
} from "@/validators/register-step2-pf";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CreditCard, Phone, Calendar } from "lucide-react";
import { formatCPF, formatPhone, formatDate } from "./utils/formatters";
import { InputWithIcon } from "./InputWithIcon";
import { useRegisterStore } from "@/stores/register-store";
import { validatePFData } from "@/validators/register-final";
import { registerUser } from "@/api/user";
import { toast } from "sonner";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function RegisterStep2PF() {
  const navigate = useNavigate();
  const {
    step1Data,
    step2PFData,
    saveStep2PFData,
    setCurrentError,
    setIsSubmitting,
    reset,
  } = useRegisterStore();

  const form = useForm<Step2PFFormData>({
    resolver: zodResolver(step2PFSchema),
    defaultValues: step2PFData || {
      cpf: "",
      phone: "",
      birthDate: "",
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

  const validateField = async (fieldName: keyof Step2PFFormData) => {
    await form.trigger(fieldName);
  };

  const handleSubmit = async (data: Step2PFFormData) => {
    if (!step1Data) {
      toast.error("Dados da etapa 1 não encontrados");
      return;
    }

    setIsSubmitting(true);
    try {
      // Validação final antes de enviar
      const finalData = validatePFData(step1Data, data);

      // Salva no store
      saveStep2PFData(data);

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
        id="register-step2-pf-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={CreditCard}
                  placeholder="Digite seu CPF"
                  maxLength={14}
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    field.onChange(formatted);
                  }}
                  onBlur={() => validateField("cpf")}
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
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Calendar}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  {...field}
                  onChange={(e) => {
                    const formatted = formatDate(e.target.value);
                    field.onChange(formatted);
                  }}
                  onBlur={() => validateField("birthDate")}
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
