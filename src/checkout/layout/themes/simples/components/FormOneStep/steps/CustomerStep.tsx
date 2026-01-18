import React from "react";
import { useEffect } from "react";
import { Input } from "@checkout-layout/ui/input";
import { Label } from "@checkout-layout/ui/label";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { InputMask } from "@checkout-layout/ui/input-mask";
import { Check } from "lucide-react";
import { type CustomerData } from "../../FormThreeSteps/schemas";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const customerSchema = z.object({
  email: z.string().email(),
  cellphone: z.string().min(1),
  name: z.string().min(1),
  cpf: z.string().min(1),
});

const CustomerStep: React.FC = () => {
  const { theme, productOrder, setCustomerData, nextStep } = useCheckout();
  const { step, customer } = productOrder;

  const {
    register,
    formState: { errors, isValid },
  } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      email: customer.email,
      cellphone: customer.cellphone,
      name: customer.name,
      cpf: customer.cpf,
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isValid && step === 1) {
      setCustomerData({
        email: customer.email,
        cellphone: customer.cellphone,
        name: customer.name,
        cpf: customer.cpf,
      });
      nextStep();

      timer = setTimeout(() => {
        document
          .getElementById("address-step")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [isValid, customer, setCustomerData, nextStep, step]);

  return (
    <div
      className={`rounded-lg p-6 ${
        theme.defaultSnippets.isCardShadow
          ? "shadow-lg"
          : "border border-gray-200/60"
      }`}
      style={{
        backgroundColor: theme.defaultColors.cardBackground,
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-base font-semibold"
            style={{ color: theme.defaultColors.cardText }}
          >
            Identificação
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
              placeholder="exem@gmail.com"
            />
            {errors?.email && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="telefone">Telefone</Label>
            <InputMask
              id="telefone"
              type="tel"
              {...register("cellphone")}
              className={errors.cellphone ? "border-red-500" : ""}
              placeholder="(83) 9987-3542"
              mask="(00) 00000-0000"
            />
            {errors.cellphone && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.cellphone.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="nomeCompleto">Nome completo</Label>
            <Input
              id="nomeCompleto"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
              placeholder="João da Silva"
            />
            {errors.name && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="cpf">CPF</Label>
            <InputMask
              id="cpf"
              {...register("cpf")}
              className={errors.cpf ? "border-red-500" : ""}
              mask="000.000.000-00"
              placeholder="975.257.700-85"
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.cpf.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50/70 border-2 border-dashed border-gray-300/60 rounded-sm p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Usamos seus dados de forma 100% segura para garantir a sua
            satisfação:
          </p>
          <ul
            className="space-y-2 text-sm text-gray-600"
            style={{
              color: theme.defaultColors.cardText,
            }}
          >
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span style={{ color: theme.defaultColors.cardDescription }}>
                Enviar o seu comprovante de compra e pagamento;
              </span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span style={{ color: theme.defaultColors.cardDescription }}>
                Ativar a sua garantia de devolução caso não fique satisfeito;
              </span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span style={{ color: theme.defaultColors.cardDescription }}>
                Acompanhar o andamento do seu pedido;
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { CustomerStep };
