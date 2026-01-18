import React from "react";
import { Plus } from "lucide-react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface DeliverySectionProps {
  checkoutTheme: CheckoutThemeType;
  onDeliveryOpen: (open: boolean) => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  checkoutTheme,
  onDeliveryOpen,
}) => {
  return (
    <div
      className="p-4 border-b border-gray-200/50"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <button
        onClick={() => onDeliveryOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/5 rounded-lg hover:bg-gray-700/20 transition-colors"
        style={{ color: checkoutTheme.defaultColors.cardText }}
      >
        <Plus size={20} />
        <span className="font-medium">Adicionar endereço de entrega</span>
      </button>
    </div>
  );
};
