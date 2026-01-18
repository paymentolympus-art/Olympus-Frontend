import React from "react";
import { TicketCheck } from "lucide-react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import hexRgb from "hex-rgb";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

interface DiscountSectionProps {
  checkoutTheme: CheckoutThemeType;
}

export const DiscountSection: React.FC<DiscountSectionProps> = ({
  checkoutTheme,
}) => {
  const { data, productOrder } = useCheckout();

  const calculateSavings = () => {
    if (!data.offer.priceFake) return 0;
    return (
      (data.offer.priceFake - data.offer.price) * productOrder.cart.quantity
    );
  };

  return (
    <div
      className="py-2 border-b-8 border-gray-700/5"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <div className="flex items-center justify-between p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <TicketCheck
            size={25}
            color={checkoutTheme.defaultColors.textDiscount}
          />
          <span
            className=" font-medium text-foreground"
            style={{ color: checkoutTheme.defaultColors.cardText }}
          >
            Desconto {checkoutTheme.defaultTexts.shopNameText}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="font-medium text-xs px-2 py-1 rounded"
            style={{
              color: checkoutTheme.defaultColors.textDiscount,
              backgroundColor: `rgba(${hexRgb(checkoutTheme.defaultColors.textDiscount).red}, ${hexRgb(checkoutTheme.defaultColors.textDiscount).green}, ${hexRgb(checkoutTheme.defaultColors.textDiscount).blue}, 0.1)`,
            }}
          >
            - {formatPrice(calculateSavings())}
          </span>
        </div>
      </div>
    </div>
  );
};
