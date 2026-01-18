import React from "react";
import { Minus, Plus, ChevronRight, TicketCheck } from "lucide-react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import hexRgb from "hex-rgb";

interface ProductSectionProps {
  checkoutTheme: CheckoutThemeType;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  checkoutTheme,
}) => {
  const { data, productOrder, setCartProductQuantity } = useCheckout();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateDiscount = () => {
    if (!data.offer.priceFake) return 0;
    const originalPrice = data.offer.priceFake;
    const currentPrice = data.offer.price;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div
      className="p-4 border-b-8 border-gray-700/5"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-lg font-bold text-foreground"
          style={{ color: checkoutTheme.defaultColors.cardText }}
        >
          {checkoutTheme.defaultTexts.productTitleText}
        </span>
        <button className="flex items-center gap-1 text-muted-foreground">
          <span className="text-sm">Adicionar nota</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
        />

        <div className="flex-1">
          <h3
            className="text-sm font-medium text-foreground mb-1"
            style={{ color: checkoutTheme.defaultColors.cardText }}
          >
            {data.name}
          </h3>
          <p
            className="text-xs mb-1"
            style={{ color: checkoutTheme.defaultColors.cardDescription }}
          >
            {data.description}
          </p>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Devolução gratuita
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span
                  className="text-lg font-medium"
                  style={{ color: checkoutTheme.defaultColors.textDiscount }}
                >
                  {formatCurrency(
                    data.offer.price * productOrder.cart.quantity
                  )}
                </span>
                <TicketCheck
                  size={25}
                  color={checkoutTheme.defaultColors.textDiscount}
                />
              </div>
              <div className="flex items-center gap-1">
                {data.offer.priceFake && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(
                      data.offer.priceFake * productOrder.cart.quantity
                    )}
                  </span>
                )}
                {data.offer.priceFake && (
                  <span
                    className="text-xs font-medium px-1 rounded"
                    style={{
                      color: checkoutTheme.defaultColors.textDiscount,
                      backgroundColor: `rgba(${hexRgb(checkoutTheme.defaultColors.textDiscount).red}, ${hexRgb(checkoutTheme.defaultColors.textDiscount).green}, ${hexRgb(checkoutTheme.defaultColors.textDiscount).blue}, 0.1)`,
                    }}
                  >
                    -{calculateDiscount()}%
                  </span>
                )}
              </div>
            </div>

            <div
              className="flex items-center border border-border rounded-sm bg-gray-700/5"
              style={{
                color: checkoutTheme.defaultColors.cardText,
              }}
            >
              <button
                className="p-2 transition-colors"
                onClick={() =>
                  setCartProductQuantity(
                    Math.max(1, productOrder.cart.quantity - 1)
                  )
                }
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-2 text-sm font-medium border-x border-gray-300/50 w-[50px] text-center">
                {productOrder.cart.quantity}
              </span>
              <button
                className="p-2 transition-colors"
                onClick={() =>
                  setCartProductQuantity(productOrder.cart.quantity + 1)
                }
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
