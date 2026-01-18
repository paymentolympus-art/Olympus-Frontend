import React from "react";
import { ArrowLeft } from "lucide-react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface HeaderProps {
  checkoutTheme: CheckoutThemeType;
  urlBack: string;
}

export const Header: React.FC<HeaderProps> = ({ checkoutTheme, urlBack }) => {
  return (
    <header
      className="top-0 z-40 border-b border-gray-200/50"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <div className="flex items-center justify-between p-4">
        <button
          className="transition-colors"
          onClick={() => {
            window.location.href = urlBack;
          }}
          style={{ color: checkoutTheme.defaultColors.cardText }}
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1
            className="text-lg font-semibold text-foreground"
            style={{ color: checkoutTheme.defaultColors.cardText }}
          >
            Resumo do Pedido
          </h1>
        </div>
        <div className="w-6"></div> {/* Spacer for centering */}
      </div>
    </header>
  );
};
