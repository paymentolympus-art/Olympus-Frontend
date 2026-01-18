import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { FormFirst, FormSecond, StepIndicator } from "./steps";

/**
 * FormTwoSteps - Formulário de checkout com 2 etapas
 *
 * Etapa 1: Identificação (dados do cliente)
 * Etapa 2: Pagamento (PIX e order bumps)
 *
 * Não possui etapa de entrega - ideal para produtos digitais ou serviços
 */
const FormTwoSteps: React.FC = () => {
  const { theme, productOrder } = useCheckout();
  const { step } = productOrder;

  return (
    <div className="flex flex-col gap-4 max-w-2xl sm:max-w-full mx-auto">
      {/* Indicador de progresso com 2 etapas */}
      <StepIndicator />

      {/* Container do formulário */}
      <div
        className={`
          rounded-xl px-4 py-4 sm:p-6
          ${theme.defaultSnippets.isCardShadow ? "shadow-lg" : "border border-gray-200/60"}
        `}
        style={{
          backgroundColor: theme.defaultColors.cardBackground,
        }}
      >
        {/* Renderiza o formulário baseado na etapa atual */}
        {step === 1 && <FormFirst />}
        {step === 2 && <FormSecond />}
      </div>
    </div>
  );
};

export { FormTwoSteps };
