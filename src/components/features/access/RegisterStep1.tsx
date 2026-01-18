import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1FormData } from "@/validators/register-step1";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { User, Mail, Lock } from "lucide-react";
import { InputWithIcon } from "./InputWithIcon";
import { useRegisterStore } from "@/stores/register-store";
import { useEffect } from "react";

interface RegisterStep1Props {
  onNext: () => void;
}

export function RegisterStep1({ onNext }: RegisterStep1Props) {
  const { step1Data, saveStep1Data, setCurrentError } = useRegisterStore();

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1Data || {
      name: "",
      email: "",
      accountType: undefined,
      password: "",
      confirmPassword: "",
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

  const validateField = async (fieldName: keyof Step1FormData) => {
    await form.trigger(fieldName);
  };

  const handleSubmit = async (data: Step1FormData) => {
    const isValid = await form.trigger();
    if (isValid) {
      saveStep1Data(data);
      onNext();
    }
  };

  return (
    <Form {...form}>
      <form
        id="register-step1-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={User}
                  placeholder="Digite seu nome"
                  {...field}
                  onBlur={() => validateField("name")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Mail}
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...field}
                  onBlur={() => validateField("email")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="PERSON" id="pf" />
                    <label
                      htmlFor="pf"
                      className="text-white cursor-pointer flex items-center gap-2"
                    >
                      Pessoa Física
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="COMPANY" id="pj" />
                    <label
                      htmlFor="pj"
                      className="text-white cursor-pointer flex items-center gap-2"
                    >
                      Pessoa Jurídica
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Lock}
                  type="password"
                  placeholder="Digite sua senha"
                  className="font-serif placeholder:font-sans"
                  {...field}
                  onBlur={() => validateField("password")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithIcon
                  icon={Lock}
                  type="password"
                  placeholder="Confirme sua senha"
                  className="font-serif placeholder:font-sans"
                  {...field}
                  onBlur={() => validateField("confirmPassword")}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
