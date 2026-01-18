import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { cn } from "@/lib/utils";
import LayoutFactory from "@checkout-layout/factory";
import { CheckoutFrame } from "./CheckoutFrame";

interface CheckoutPreviewProps {
  mode: "desktop" | "mobile";
}

export const CheckoutPreview: React.FC<CheckoutPreviewProps> = ({ mode }) => {
  const { data, theme, productOrder } = useCheckout();

  return (
    <div
      className={cn(
        "transition-all duration-300 overflow-y-auto",
        mode === "mobile"
          ? "max-w-sm mx-auto w-[375px] h-[712px] pb-safe border mt-2"
          : "w-full mx-auto h-[calc(100vh-64px)]"
      )}
    >
      <CheckoutFrame mode={mode}>
        <LayoutFactory
          checkoutItems={data}
          checkoutTheme={theme}
          order={productOrder}
        />
      </CheckoutFrame>
    </div>
  );
};
