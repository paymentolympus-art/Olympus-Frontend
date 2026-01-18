import React from "react";
import { ChevronUp } from "lucide-react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface OrderSummaryProps {
  checkoutTheme: CheckoutThemeType;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  checkoutTheme,
}) => {
  const { data, productOrder } = useCheckout();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const subtotal = data.offer.price * productOrder.cart.quantity;
  const originalPrice = data.offer.priceFake * productOrder.cart.quantity;
  const discount = originalPrice - subtotal;

  return (
    <div
      className="p-4 border-b-8 border-gray-700/5"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <h3
        className="text-lg font-medium text-foreground mb-4"
        style={{ color: checkoutTheme.defaultColors.cardText }}
      >
        Resumo do Pedido
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="font-medium"
              style={{ color: checkoutTheme.defaultColors.cardText }}
            >
              Subtotal do produto
            </span>
            <ChevronUp
              size={16}
              style={{ color: checkoutTheme.defaultColors.cardText }}
            />
          </div>
          <span
            className="text-sm font-medium"
            style={{ color: checkoutTheme.defaultColors.cardText }}
          >
            {formatCurrency(subtotal)}
          </span>
        </div>

        {data.offer.priceFake && (
          <>
            <div className="flex justify-between">
              <span
                className="text-sm"
                style={{ color: checkoutTheme.defaultColors.cardDescription }}
              >
                Preço original
              </span>
              <span
                className="text-sm"
                style={{ color: checkoutTheme.defaultColors.cardDescription }}
              >
                {formatCurrency(originalPrice)}
              </span>
            </div>

            <div className="flex justify-between">
              <span
                className="text-sm"
                style={{ color: checkoutTheme.defaultColors.cardDescription }}
              >
                Desconto no produto
              </span>
              <span
                className="text-sm"
                style={{ color: checkoutTheme.defaultColors.textDiscount }}
              >
                - {formatCurrency(discount)}
              </span>
            </div>
          </>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-start">
            <span
              className="text-lg font-bold"
              style={{ color: checkoutTheme.defaultColors.cardText }}
            >
              Total ({productOrder.cart.quantity} item)
            </span>
            <div className="flex flex-col items-end">
              <span
                className="text-lg font-bold"
                style={{ color: checkoutTheme.defaultColors.cardText }}
              >
                {formatCurrency(subtotal)}
              </span>

              <p
                className="text-xs"
                style={{ color: checkoutTheme.defaultColors.cardDescription }}
              >
                Impostos inclusos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
