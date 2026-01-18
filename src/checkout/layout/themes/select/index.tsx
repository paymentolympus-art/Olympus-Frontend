import React from "react";
import { type ThemeComponentType } from "@checkout-layout/types/checkout";
import { type ProductOrderType } from "@checkout-layout/types/product-order";

type SelectCheckoutProps = ThemeComponentType & {
  order: ProductOrderType;
};

export const SelectCheckout: React.FC<SelectCheckoutProps> = ({
  checkoutTheme,
}) => {
  return (
    <div
      style={{ backgroundColor: checkoutTheme.defaultColors.background }}
      className="w-full h-[calc(100vh-64px)] overflow-y-auto"
    ></div>
  );
};
