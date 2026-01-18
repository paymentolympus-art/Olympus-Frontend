import React from "react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface TermsSectionProps {
  checkoutTheme: CheckoutThemeType;
}

export const TermsSection: React.FC<TermsSectionProps> = ({
  checkoutTheme,
}) => {
  return (
    <div className="p-4 bg-gray-50/10">
      <p
        className="text-xs text-muted-foreground leading-relaxed"
        style={{ color: checkoutTheme.defaultColors.cardDescription }}
      >
        Ao fazer um pedido, você concorda com{" "}
        <a
          href="#"
          className="font-medium"
          style={{ color: checkoutTheme.defaultColors.cardText }}
        >
          Termos de uso e venda {checkoutTheme.defaultTexts.shopNameText}
        </a>{" "}
        e reconhece que leu e concordou com a{" "}
        <a
          href="#"
          className="font-medium"
          style={{ color: checkoutTheme.defaultColors.cardText }}
        >
          Política de privacidade {checkoutTheme.defaultTexts.shopNameText}
        </a>
        .
      </p>
    </div>
  );
};
