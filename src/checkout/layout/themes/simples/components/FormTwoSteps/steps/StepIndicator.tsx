import { useCheckout } from "@checkout/hooks/useCheckout";
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * Indicador de progresso para FormTwoSteps
 * Mostra 2 etapas: Identificação e Pagamento
 */
export const StepIndicator = () => {
  const {
    theme,
    productOrder: { step },
  } = useCheckout();

  const stepLabels: Record<number, string> = {
    1: "Identificação",
    2: "Pagamento",
  };

  return (
    <div
      className={`
    rounded-lg p-3 sm:p-3
    ${theme.defaultSnippets.isCardShadow ? "shadow-lg" : "border border-gray-200/60"}
  `}
      style={{
        backgroundColor: theme.defaultColors.cardBackground,
      }}
    >
      <div className="flex items-center justify-between">
        {[1, 2].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  `w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold`,
                  stepNumber <= step && `text-white`
                )}
                style={{
                  color:
                    stepNumber === step
                      ? `white`
                      : stepNumber < step
                        ? `white`
                        : theme.defaultColors.cardText,
                  backgroundColor:
                    stepNumber === step
                      ? theme.defaultColors.primary
                      : stepNumber < step
                        ? theme.defaultColors.primary
                        : theme.defaultColors.background,
                }}
              >
                {stepNumber < step ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <span
                className={`text-sm font-semibold sm:font-bold`}
                style={{
                  color:
                    stepNumber === step
                      ? theme.defaultColors.cardText
                      : theme.defaultColors.cardDescription,
                }}
              >
                {stepLabels[stepNumber]}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
