import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { validateCPF } from "@checkout/layout/themes/simples/components/FormThreeSteps/validator";
import { Input } from "@checkout-layout/ui/input";
interface CpfModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutTheme: CheckoutThemeType;
}

const cpfSchema = z.object({
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(validateCPF, "CPF inválido"),
});

type CpfFormData = z.infer<typeof cpfSchema>;

export const CpfModal: React.FC<CpfModalProps> = ({
  open,
  onOpenChange,
  checkoutTheme,
}) => {
  const { productOrder, setCustomerData } = useCheckout();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CpfFormData>({
    resolver: zodResolver(cpfSchema),
    defaultValues: {
      cpf: productOrder.customer.cpf || "",
    },
  });

  const formatCPF = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return value;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setValue("cpf", formatted);
  };

  const onSubmit = async (data: CpfFormData) => {
    setLoading(true);
    try {
      setCustomerData({
        ...productOrder.customer,
        cpf: data.cpf,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar CPF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen fixed inset-0 z-50"
      style={{
        display: open ? "flex" : "none",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Content */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div
          className="bg-white rounded-t-xl shadow-lg p-0"
          style={{
            backgroundColor: checkoutTheme.defaultColors.cardBackground,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-4">
            <div className=""></div>
            <h2
              className="ml-4 text-xl font-semibold text-center"
              style={{ color: checkoutTheme.defaultColors.cardText }}
            >
              Adicionar CPF
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X
                size={20}
                style={{ color: checkoutTheme.defaultColors.cardText }}
              />
            </button>
          </div>

          <div className="px-6">
            <p
              className="text-gray-600 text-sm"
              style={{ color: checkoutTheme.defaultColors.cardDescription }}
            >
              O CPF será usado para emitir faturas
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-2">
            <div className="space-y-4">
              <div>
                <Input
                  {...register("cpf")}
                  type="text"
                  placeholder="Insira o número de CPF de 11 dígitos"
                  onChange={handleCpfChange}
                  maxLength={14}
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: checkoutTheme.defaultColors.cardText,
                  }}
                />
                {errors.cpf && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.cpf.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 text-lg font-semibold rounded-xl transition-colors hover:opacity-90"
              style={{
                backgroundColor: checkoutTheme.defaultColors.buttonColor,
                color: checkoutTheme.defaultColors.buttonTextColor,
              }}
            >
              {loading ? "Salvando..." : "Confirmar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
