import { useCheckout } from "@checkout/hooks/useCheckout";
import { Input } from "@checkout-layout/ui/input";
import { Button } from "@checkout-layout/ui/button";
import { Label } from "@checkout-layout/ui/label";
import { useForm, Controller } from "react-hook-form";
import { customerSchema, type CustomerData } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { InputMask } from "@checkout-layout/ui/input-mask";

const FormFirst: React.FC = () => {
  const { theme, productOrder, setCustomerData, nextStep } = useCheckout();
  const { customer } = productOrder;

  const {
    register,
    control,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      email: customer.email,
      cellphone: customer.cellphone,
      name: customer.name,
      cpf: customer.cpf,
    },
  });

  // Função de submit agora sem validação para permitir navegação livre
  const handleNextStep = () => {
    // Coleta os dados atuais do form (mesmo sem validação)
    const formData = {
      email: customer.email,
      cellphone: customer.cellphone,
      name: customer.name,
      cpf: customer.cpf,
    };
    setCustomerData({ ...customer, ...formData });
    nextStep();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
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
              <Controller
                name="cellphone"
                control={control}
                render={({ field }) => (
                  <InputMask
                    id="telefone"
                    type="tel"
                    {...field}
                    className={errors.cellphone ? "border-red-500" : ""}
                    placeholder="(83) 9987-3542"
                    mask="(00) 00000-0000"
                  />
                )}
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
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <InputMask
                    id="cpf"
                    {...field}
                    className={errors.cpf ? "border-red-500" : ""}
                    mask="000.000.000-00"
                    placeholder="975.257.700-85"
                  />
                )}
              />
              {errors.cpf && (
                <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                  <IoIosInformationCircleOutline className="w-4 h-4" />
                  {errors.cpf.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Caixa de informações de segurança */}
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

        <div className="flex justify-center sm:justify-end">
          <Button
            type="button"
            onClick={handleNextStep}
            className="font-bold w-full sm:w-auto text-white py-5 hover:opacity-90"
            style={{
              backgroundColor: theme.defaultColors.buttonColor,
              color: theme.defaultColors.buttonTextColor,
            }}
          >
            IR PARA A ENTREGA
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormFirst;
