import React from "react";
import { Plus } from "lucide-react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface CpfSectionProps {
  checkoutTheme: CheckoutThemeType;
  onCpfOpen: (open: boolean) => void;
}

export const CpfSection: React.FC<CpfSectionProps> = ({
  checkoutTheme,
  onCpfOpen,
}) => {
  return (
    <div
      className="p-4 border-b border-gray-200/50"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <button
        onClick={() => onCpfOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/5 rounded-lg text-foreground hover:bg-gray-700/20 transition-colors"
        style={{ color: checkoutTheme.defaultColors.cardText }}
      >
        <Plus size={20} />
        <span className="font-medium">Adicionar CPF</span>
      </button>
    </div>
  );
};
