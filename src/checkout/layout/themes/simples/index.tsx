import React from "react";
import { type ThemeComponentType } from "@checkout-layout/types/checkout";
import {
  Header,
  NoticeBar,
  Banner,
  ProductCard,
  SocialProof,
  Footer,
  FormOneStep,
  FormThreeSteps,
  FormTwoSteps,
  FormAutomaticPix,
} from "./components";
import { type ProductOrderType } from "@checkout/layout/types/product-order";
import { ProductType } from "@/types/product";

type SimpleCheckoutProps = ThemeComponentType & {
  order: ProductOrderType;
};

export const SimpleCheckout: React.FC<SimpleCheckoutProps> = ({
  checkoutTheme,
  order,
}) => {
  const formRender = () => {
    if (checkoutTheme.steps === "automatic-api") return <FormAutomaticPix />;
    if (checkoutTheme.steps === "single") return <FormOneStep />;
    if (order.cart.type === ProductType.PHYSICAL) return <FormThreeSteps />;
    if (order.cart.type === ProductType.DIGITAL) return <FormTwoSteps />;

    return (
      <div className="flex flex-col gap-4 max-w-2xl sm:max-w-full mx-auto">
        <div
          className="w-full h-10  rounded-md animate-pulse"
          style={{
            backgroundColor: checkoutTheme.defaultColors.cardBackground,
          }}
        />
        <div
          className="w-full h-10 rounded-md animate-pulse"
          style={{
            backgroundColor: checkoutTheme.defaultColors.cardBackground,
          }}
        />
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: checkoutTheme.defaultColors.background,
        fontFamily: `'${checkoutTheme.font}', sans-serif`,
      }}
    >
      <Header checkoutTheme={checkoutTheme} />
      <NoticeBar checkoutTheme={checkoutTheme} />
      <Banner checkoutTheme={checkoutTheme} />

      <div className="container max-w-5xl sm:max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 overflow-hidden grow">
        <div className="grid lg:hidden grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="col-span-3 lg:col-span-2 space-y-4 sm:space-y-6">
            <ProductCard />
            {formRender()}
            <SocialProof
              checkoutTheme={checkoutTheme}
              productId={order.cart.id}
            />
          </div>
        </div>
        <div className="hidden lg:flex flex-row justify-center gap-20 w-full mx-auto">
          <div className="w-3/3">{formRender()}</div>
          <div className="w-[600px] flex flex-col gap-4 ">
            <ProductCard />
            <SocialProof
              checkoutTheme={checkoutTheme}
              productId={order.cart.id}
            />
          </div>
        </div>
      </div>

      <Footer checkoutTheme={checkoutTheme} />
    </div>
  );
};
