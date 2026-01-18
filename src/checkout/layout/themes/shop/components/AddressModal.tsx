import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@checkout-layout/ui/form";
import { Input } from "@checkout-layout/ui/input";
import { Button } from "@checkout-layout/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout-layout/ui/select";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { cn } from "@/lib/utils";

const addressSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone muito longo"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  zipCode: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
  state: z.string().min(2, "Selecione um estado"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  neighborhood: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
  street: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  number: z.string().min(1, "Número da residência é obrigatório"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const AddressModal: React.FC<AddressModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { setAddressData, setCustomerData, theme } = useCheckout();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      zipCode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: AddressFormData) => {
    // Save customer data
    setCustomerData({
      name: data.name,
      email: data.email,
      cellphone: data.phone,
      cpf: "",
    });

    // Save address data
    setAddressData({
      cep: data.zipCode,
      address: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      complement: "",
    });

    onOpenChange(false);
  };

  return (
    <div
      className="w-full h-full fixed top-0 left-0"
      style={{
        backgroundColor: theme.defaultColors.cardBackground,
        display: open ? "block" : "none",
      }}
    >
      <div
        className="w-full h-full m-0 p-0 rounded-none"
        style={{ backgroundColor: theme.defaultColors.cardBackground }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex flex-row justify-between items-center gap-4 p-4 border-b sticky top-0 z-10">
            <button
              className="transition-colors"
              onClick={() => onOpenChange(false)}
              style={{ color: theme.defaultColors.cardText }}
            >
              <ArrowLeft size={24} />
            </button>
            <h2
              className="text-lg font-semibold"
              style={{ color: theme.defaultColors.cardText }}
            >
              Adicionar o novo endereço
            </h2>
            <div className="w-6"></div> {/* Spacer for centering */}
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-4 space-y-6"
              >
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: theme.defaultColors.cardDescription }}
                  >
                    Informações de contato
                  </h3>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nome completo"
                            {...field}
                            className={cn(
                              "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                              {
                                "border-red-500": errors.name,
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground text-sm py-2 whitespace-nowrap">
                            BR +55
                          </span>
                          <FormControl>
                            <Input
                              placeholder="Número de telefone"
                              {...field}
                              className={cn(
                                "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                                {
                                  "border-red-500": errors.phone,
                                }
                              )}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            type="email"
                            {...field}
                            className={cn(
                              "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                              {
                                "border-red-500": errors.email,
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: theme.defaultColors.cardDescription }}
                  >
                    Informações de endereço
                  </h3>

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="CEP/Código postal"
                            {...field}
                            className={cn(
                              "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                              {
                                "border-red-500": errors.zipCode,
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={cn(
                                  "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                                  {
                                    "border-red-500": errors.state,
                                  }
                                )}
                              >
                                <SelectValue placeholder="Estado/UF" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brazilianStates.map((state) => (
                                <SelectItem
                                  key={state.value}
                                  value={state.value}
                                >
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs font-light" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Cidade"
                              {...field}
                              className={cn(
                                "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                                {
                                  "border-red-500": errors.city,
                                }
                              )}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-light" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Bairro/Distrito"
                            {...field}
                            className={cn(
                              "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                              {
                                "border-red-500": errors.neighborhood,
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Endereço"
                            {...field}
                            className={cn(
                              "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                              {
                                "border-red-500": errors.street,
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Nº da residência. Use "s/n" se nenhum'
                            {...field}
                            className={cn(
                              "!border-t-transparent !border-x-transparent border-b rounded-none bg-transparent px-0 pb-2",
                              {
                                "border-red-500": errors.number,
                              }
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Privacy Policy */}
                <div className="pt-4">
                  <p
                    className="text-xs"
                    style={{ color: theme.defaultColors.cardDescription }}
                  >
                    Leia a{" "}
                    <span
                      className="font-medium"
                      style={{ color: theme.defaultColors.cardText }}
                    >
                      Política de privacidade do{" "}
                      {theme.defaultTexts.shopNameText}
                    </span>{" "}
                    para saber mais sobre como usamos suas informações pessoais.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2 pb-safe">
                  <Button
                    type="submit"
                    className="w-full font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200"
                    style={{
                      backgroundColor: theme.defaultColors.buttonColor,
                      color: theme.defaultColors.buttonTextColor,
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
