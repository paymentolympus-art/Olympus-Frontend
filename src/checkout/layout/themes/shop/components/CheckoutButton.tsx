import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import { LiaGrinBeam } from "react-icons/lia";
import hexRgb from "hex-rgb";

interface CheckoutButtonProps {
  checkoutTheme: CheckoutThemeType;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  checkoutTheme,
}) => {
  const { theme, data, productOrder } = useCheckout();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateSavings = () => {
    if (!data.offer.priceFake) return 0;
    return (
      (data.offer.priceFake - data.offer.price) * productOrder.cart.quantity
    );
  };

  const subtotal = productOrder.cart.price * productOrder.cart.quantity;
  const total = subtotal;

  return (
    <div
      className="border-t border-border/10 sticky bottom-0"
      style={{ backgroundColor: theme.defaultColors.cardBackground }}
    >
      {calculateSavings() > 0 && (
        <div
          className="flex items-center gap-2  p-2"
          style={{
            backgroundColor: `rgba(${hexRgb(theme.defaultColors.textDiscount).red}, ${hexRgb(theme.defaultColors.textDiscount).green}, ${hexRgb(theme.defaultColors.textDiscount).blue}, 0.1)`,
          }}
        >
          <span style={{ color: theme.defaultColors.textDiscount }}>
            <LiaGrinBeam />
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: theme.defaultColors.textDiscount }}
          >
            Você está economizando {formatCurrency(calculateSavings())} nesse
            pedido.
          </span>
        </div>
      )}

      <div className="flex items-center justify-between p-4">
        <span
          className="text-lg font-bold"
          style={{ color: checkoutTheme.defaultColors.cardText }}
        >
          Total{" "}
          <span className="font-normal">
            ({productOrder.cart.quantity} item)
          </span>
        </span>
        <span
          className="text-lg font-bold"
          style={{ color: checkoutTheme.defaultColors.textDiscount }}
        >
          {formatCurrency(total)}
        </span>
      </div>

      <div className="px-4 pb-4">
        <button
          className="w-full  text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          style={{
            backgroundColor: theme.defaultColors.buttonColor,
            color: theme.defaultColors.buttonTextColor,
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-lg leading-none">
              {theme.defaultTexts.buttonText || "Fazer pedido"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
