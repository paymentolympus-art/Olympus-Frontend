import { useEffect } from "react";
import { CheckoutContext } from "@checkout/hooks/useCheckout";
import {
  type CheckoutItemsType,
  type CheckoutThemeType,
} from "@checkout-layout/types/checkout";
import { useCheckoutTheme } from "@checkout/hooks/useCheckoutTheme";
import { useCheckoutItems } from "@checkout/hooks/useCheckoutItems";
import { useOrder } from "@checkout/hooks/useOrder";
import { type OrderBumpType } from "@checkout/layout/types/product-order";
import { CheckoutService } from "@/api/checkout";
import { toast } from "sonner";

interface CheckoutProviderProps {
  children: React.ReactNode;
  data: CheckoutItemsType;
  theme: CheckoutThemeType;
  onThemeUpdate?: () => Promise<void>;
}

export const CheckoutProvider = ({
  children,
  data,
  theme,
  onThemeUpdate,
}: CheckoutProviderProps) => {
  const { checkoutTheme, setCheckoutTheme } = useCheckoutTheme(theme);
  const { checkoutItems } = useCheckoutItems(data);
  const {
    productOrder,
    setCartData,
    setCartProductQuantity,
    setAddressData,
    setPaymentData,
    setOrderBumpData,
    setShippingOptionData,
    setCustomerData,
    nextStep,
    prevStep,
  } = useOrder({
    productId: checkoutItems.id,
    productName: checkoutItems.name,
    productDescription: checkoutItems.description,
    productPrice: checkoutItems.offer.price,
    productPriceFake: checkoutItems.offer.priceFake,
    productImage: checkoutItems.image,
    productType: checkoutItems.type,
    productUrlRedirect: checkoutItems.urlRedirect,
  });

  const saveTheme = async () => {
    if (!checkoutItems.id) return;

    try {
      await CheckoutService.updateCheckoutTheme(checkoutItems.id, {
        theme: checkoutTheme.theme,
        steps: checkoutTheme.steps,
        font: checkoutTheme.font,
        radius: checkoutTheme.radius,
        cartVisible: checkoutTheme.cartVisible,
        defaultTexts: checkoutTheme.defaultTexts,
        defaultSnippets: checkoutTheme.defaultSnippets,
        defaultColors: checkoutTheme.defaultColors,
        defaultMargins: checkoutTheme.defaultMargins,
        defaultSizes: checkoutTheme.defaultSizes,
      });
      toast.success("Tema do checkout salvo com sucesso!");
    } catch (error) {
      toast.error(`Erro ao salvar tema do checkout: ${error}`);
    }
  };

  // Sincroniza o tema quando a prop theme muda (ex: após refetch)
  useEffect(() => {
    setCheckoutTheme(theme);
  }, [theme, setCheckoutTheme]);

  const setTheme = (_theme: CheckoutThemeType) => {
    setCheckoutTheme(_theme);
  };

  const removeOrderBumpSelected = (bumpId: string) => {
    const updatedBumps = productOrder.cart.orderBumps.filter(
      (bump) => bump.id !== bumpId
    );
    setCartData({
      ...productOrder.cart,
      orderBumps: updatedBumps,
    });
  };

  const addOrderBumpSelected = (bump: OrderBumpType) => {
    setCartData({
      ...productOrder.cart,
      orderBumps: [...productOrder.cart.orderBumps, bump],
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        data: checkoutItems,
        theme: checkoutTheme,
        saveTheme,
        setTheme,
        refetchTheme: onThemeUpdate,
        productOrder,
        setCartData,
        setCartProductQuantity,
        setAddressData,
        setPaymentData,
        setOrderBumpData,
        setShippingOptionData,
        addOrderBumpSelected,
        removeOrderBumpSelected,
        setCustomerData,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
