import React, { useEffect, useState } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { formatPrice } from "@checkout-layout/themes/simples/components/FormThreeSteps/mask";
import { AnimatePresence } from "framer-motion";
import { CardSelectedBump } from "./CardSelectedBump";

export const ProductCard: React.FC = () => {
  const {
    productOrder,
    setCartProductQuantity,
    theme,
    removeOrderBumpSelected,
  } = useCheckout();
  const { cart } = productOrder;
  const [isExpanded, setIsExpanded] = useState(theme.cartVisible);

  useEffect(() => {
    setIsExpanded(theme.cartVisible);
  }, [theme.cartVisible]);

  const calculateSubtotal = () => {
    const price = Number(cart.price) || 0;
    const quantity = Number(cart.quantity) || 0;
    return price * quantity;
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();

    // Adicionar orderbumps do cart
    if (cart.orderBumps && cart.orderBumps.length > 0) {
      cart.orderBumps.forEach((bump) => {
        total += Number(bump.price) * Number(bump.quantity);
      });
    }

    // Adicionar frete do cart
    if (cart.shippingOption && cart.shippingOption.price > 0) {
      total += Number(cart.shippingOption.price);
    }
    return total;
  };

  const getTotalItems = () => {
    const orderBumpsCount = cart.orderBumps?.length || 0;
    const quantity = Number(cart.quantity) || 0;
    return quantity + orderBumpsCount;
  };

  return (
    <div
      className={`
        rounded-xl px-4 py-4 sm:p-6
        ${theme.defaultSnippets.isCardShadow ? "shadow-lg" : "border border-gray-200/60"}
      `}
      style={{ backgroundColor: theme.defaultColors.cardBackground }}
    >
      {/* Header com toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3
            className="font-semibold sm:font-medium"
            style={{
              color: theme.defaultColors.cardText,
            }}
          >
            Seu carrinho
          </h3>
          <div
            className={`text-xs text-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
            }`}
            style={{ color: theme.defaultColors.cardDescription }}
          >
            Informações da sua compra
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`text-lg font-semibold transition-all duration-300 ease-in-out ${
              isExpanded ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            style={{ color: theme.defaultColors.cardText }}
          >
            {formatPrice(calculateTotal())}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: theme.defaultColors.primary }}
            >
              {getTotalItems()}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={
                isExpanded ? "Minimizar carrinho" : "Expandir carrinho"
              }
            >
              {isExpanded ? (
                <ChevronUp
                  className="w-4 h-4"
                  style={{ color: theme.defaultColors.cardText }}
                />
              ) : (
                <ChevronDown
                  className="w-4 h-4"
                  style={{ color: theme.defaultColors.cardText }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo expandível */}
      <div
        className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Produto principal */}
        <div className="flex gap-2 sm:gap-4">
          <img
            src={cart.image}
            alt={cart.name}
            className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-sm shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold sm:font-medium line-clamp-2"
              style={{ color: theme.defaultColors.cardText }}
            >
              {cart.name}
            </p>
            <p
              className="text-[11px] sm:text-sm line-clamp-1 mb-2"
              style={{ color: theme.defaultColors.cardDescription }}
            >
              {cart.description}
            </p>
          </div>

          {/* Quantity Selector */}
          {theme.defaultSnippets.isCountProduct && (
            <div className="flex items-center">
              <div className="flex items-center border border-gray-200/60 rounded-full">
                <button
                  onClick={() =>
                    setCartProductQuantity(Math.max(1, cart.quantity - 1))
                  }
                  className="bg-transparent p-1 hover:bg-transparent touch-manipulation"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3 h-3 text-red-600" />
                </button>
                <span
                  className="px-2 py-1 text-xs min-w-[30px] text-center"
                  style={{ color: theme.defaultColors.cardText }}
                >
                  {cart.quantity}
                </span>
                <button
                  onClick={() => setCartProductQuantity(cart.quantity + 1)}
                  className="bg-transparent p-1 hover:bg-transparent touch-manipulation"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3 h-3 text-green-500" />
                </button>
              </div>
            </div>
          )}
        </div>

        {cart.orderBumps && cart.orderBumps.length > 0 && (
          <div className="flex flex-col gap-2 sm:gap-4 pt-2">
            <h4
              className="text-sm font-semibold"
              style={{ color: theme.defaultColors.cardText }}
            >
              {cart.orderBumps.length} oferta adquirida
            </h4>
            <AnimatePresence mode="popLayout">
              {cart.orderBumps.map((bump) => (
                <CardSelectedBump
                  key={bump.id}
                  bump={{
                    id: bump.id,
                    name: bump.name,
                    description: bump.description,
                    image: bump.image,
                    price: bump.price,
                    priceFake: bump.priceFake,
                  }}
                  removeOrderBumpSelected={removeOrderBumpSelected}
                  checkoutTheme={theme}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Linha separadora */}
        <div className="border-b border-gray-200 py-1"></div>

        {/* Resumo de preços */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span
              className="text-sm"
              style={{ color: theme.defaultColors.cardDescription }}
            >
              Subtotal
            </span>
            <span
              className="text-sm"
              style={{ color: theme.defaultColors.cardDescription }}
            >
              {formatPrice(calculateSubtotal())}
            </span>
          </div>

          {cart.type === "PHYSICAL" && (
            <div className="flex justify-between items-center">
              <span
                className="text-sm"
                style={{ color: theme.defaultColors.cardDescription }}
              >
                Frete
              </span>
              <span
                className="text-sm"
                style={{
                  color: theme.defaultColors.cardDescription,
                  fontSize: "14px",
                }}
              >
                {cart.shippingOption.price > 0
                  ? formatPrice(cart.shippingOption.price)
                  : "-"}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 pt-3">
          <span
            className="text-base"
            style={{ color: theme.defaultColors.cardText }}
          >
            Total
          </span>
          <span
            className="text-base font-semibold"
            style={{ color: theme.defaultColors.cardPriceTotal }}
          >
            {formatPrice(calculateTotal())}
          </span>
        </div>
      </div>
    </div>
  );
};
