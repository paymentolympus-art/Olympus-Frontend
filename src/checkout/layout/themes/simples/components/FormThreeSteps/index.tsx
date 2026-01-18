import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { FormFirst, FormSecond, FormThird, StepIndicator } from "./steps";

// Componente principal
const FormThreeSteps: React.FC = () => {
  const { theme, productOrder } = useCheckout();
  const { step } = productOrder;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <StepIndicator />

      <div
        className={`
          rounded-xl px-4 py-4 sm:p-6
          ${theme.defaultSnippets.isCardShadow ? "shadow-lg" : "border border-gray-200/60"}
        `}
        style={{
          backgroundColor: theme.defaultColors.cardBackground,
        }}
      >
        {step === 1 && <FormFirst />}
        {step === 2 && <FormSecond />}
        {step === 3 && <FormThird />}
      </div>
    </div>
  );
};

export { FormThreeSteps };
