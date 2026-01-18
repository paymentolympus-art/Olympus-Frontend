import { useContext, createContext } from "react";
import {
  type CheckoutItemsType,
  type CheckoutThemeType,
} from "@checkout-layout/types/checkout";
import {
  type CartType,
  type AddressType,
  type PaymentType,
  type OrderBumpType,
  type ProductOrderType,
  type ShippingOptionType,
  type CustomerType,
} from "@checkout-layout/types/product-order";

type CheckoutContextType = {
  data: CheckoutItemsType;
  theme: CheckoutThemeType;
  productOrder: ProductOrderType;
  setTheme: (theme: CheckoutThemeType) => void;
  saveTheme: () => Promise<void>;
  refetchTheme?: () => Promise<void>;
  setCustomerData: (customerData: CustomerType) => void;
  setCartData: (cartData: CartType) => void;
  setCartProductQuantity: (quantity: number) => void;
  setAddressData: (addressData: AddressType) => void;
  setPaymentData: (paymentData: PaymentType) => void;
  setOrderBumpData: (orderBumpData: OrderBumpType) => void;
  setShippingOptionData: (shippingOptionData: ShippingOptionType) => void;
  removeOrderBumpSelected: (bumpId: string) => void;
  addOrderBumpSelected: (bump: OrderBumpType) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
