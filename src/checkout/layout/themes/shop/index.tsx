import React, { useState } from "react";
import { type ThemeComponentType } from "@checkout-layout/types/checkout";
import { type ProductOrderType } from "@checkout-layout/types/product-order";
import {
  Header,
  DeliverySection,
  CpfSection,
  ProductSection,
  DiscountSection,
  OrderSummary,
  PaymentMethods,
  TermsSection,
  CheckoutButton,
  AddressModal,
  CpfModal,
} from "./components";

type ShopCheckoutProps = ThemeComponentType & {
  order: ProductOrderType;
};

export const ShopCheckout: React.FC<ShopCheckoutProps> = ({
  checkoutTheme,
  checkoutItems,
}) => {
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [cpfOpen, setCpfOpen] = useState(false);

  return (
    <div
      className="min-h-screen min-w-screen"
      style={{
        backgroundColor: checkoutTheme.defaultColors.cardBackground,
        fontFamily: `'${checkoutTheme.font}', sans-serif`,
      }}
    >
      {!deliveryOpen && (
        <>
          <Header
            checkoutTheme={checkoutTheme}
            urlBack={checkoutItems.urlBack}
          />
          <DeliverySection
            checkoutTheme={checkoutTheme}
            onDeliveryOpen={setDeliveryOpen}
          />
          <CpfSection checkoutTheme={checkoutTheme} onCpfOpen={setCpfOpen} />
          <ProductSection checkoutTheme={checkoutTheme} />
          <DiscountSection checkoutTheme={checkoutTheme} />
          <OrderSummary checkoutTheme={checkoutTheme} />
          <PaymentMethods checkoutTheme={checkoutTheme} />
          <TermsSection checkoutTheme={checkoutTheme} />
          <CheckoutButton checkoutTheme={checkoutTheme} />
        </>
      )}

      <AddressModal open={deliveryOpen} onOpenChange={setDeliveryOpen} />
      <CpfModal
        open={cpfOpen}
        onOpenChange={setCpfOpen}
        checkoutTheme={checkoutTheme}
      />
    </div>
  );
};
