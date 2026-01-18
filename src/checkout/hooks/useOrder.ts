import { useCallback, useMemo, useReducer } from "react";
import { produce } from "immer";

import {
  type AddressType,
  type CartType,
  type ProductOrderType,
  type CustomerType,
  type OrderBumpType,
  type PaymentType,
  type ShippingOptionType,
} from "@checkout-layout/types/product-order";

enum Actions {
  SET_STEPS = "SET_STEPS",
  SET_CUSTOMER_DATA = "SET_CUSTOMER_DATA",
  SET_ADDRESS_DATA = "SET_ADDRESS_DATA",
  SET_PAYMENT_DATA = "SET_PAYMENT_DATA",
  SET_CART_DATA = "SET_CART_DATA",
  SET_CART_PRODUCT_QUANTITY = "SET_CART_PRODUCT_QUANTITY",
  SET_ORDER_BUMP_DATA = "SET_ORDER_BUMP_DATA",
  SET_SHIPPING_OPTION_DATA = "SET_SHIPPING_OPTION_DATA",
  SET_NEXT_STEP = "SET_NEXT_STEP",
  SET_PREV_STEP = "SET_PREV_STEP",
}

type State = {
  productOrder: ProductOrderType;
  steps: "three" | "single" | "automatic-api";
};

type InitProps = {
  productId?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productPriceFake?: number;
  productImage?: string;
  productType?: "DIGITAL" | "PHYSICAL";
  productUrlRedirect?: string;
  quantity?: number;
};

export const useOrder = (props?: InitProps) => {
  const initialAutomaticApi: CustomerType = {
    name: "Bryan Marcos Vinicius da Paz",
    cellphone: "11984562238",
    email: "bryanpazi1998@gmail.com",
    cpf: "25335818875",
  };

  const initialState: State = useMemo(
    () => ({
      productOrder: {
        step: 1,
        customer: {
          name: "",
          email: "",
          cellphone: "",
          cpf: "",
        },
        address: {
          cep: "",
          address: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          complement: "",
        },
        payment: {
          id: "",
          pixQrcode: "",
          pixCode: "",
        },
        cart: {
          id: props?.productId || "",
          name: props?.productName || "",
          image: props?.productImage || "",
          description: props?.productDescription || "",
          priceFake: Number(props?.productPriceFake) || 0,
          price: Number(props?.productPrice) || 0,
          quantity: Number(props?.quantity) || 1,
          total:
            (Number(props?.productPrice) || 0) * (Number(props?.quantity) || 1),
          type: props?.productType || "PHYSICAL",
          orderBumps: [],
          shippingOption: {
            id: "",
            name: "",
            price: 0,
          },
        },
      },
      steps: "three",
    }),
    [props]
  );

  const [{ productOrder, steps }, dispatch] = useReducer(
    produce((draft: State, action) => {
      switch (action.type) {
        case Actions.SET_STEPS:
          draft.productOrder = action.payload;
          break;
        case Actions.SET_CUSTOMER_DATA:
          draft.productOrder.customer = action.payload;
          sessionStorage.setItem("customer", JSON.stringify(action.payload));
          break;
        case Actions.SET_ADDRESS_DATA:
          draft.productOrder.address = action.payload;
          sessionStorage.setItem("address", JSON.stringify(action.payload));
          break;
        case Actions.SET_PAYMENT_DATA:
          draft.productOrder.payment = action.payload;
          sessionStorage.setItem("payment", JSON.stringify(action.payload));
          break;
        case Actions.SET_CART_DATA:
          draft.productOrder.cart = action.payload;
          sessionStorage.setItem("cart", JSON.stringify(action.payload));
          break;
        case Actions.SET_CART_PRODUCT_QUANTITY:
          draft.productOrder.cart.quantity = action.payload;
          sessionStorage.setItem(
            "cart",
            JSON.stringify(draft.productOrder.cart)
          );
          break;
        case Actions.SET_ORDER_BUMP_DATA:
          draft.productOrder.cart.orderBumps = [
            ...draft.productOrder.cart.orderBumps,
            action.payload,
          ];
          sessionStorage.setItem("orderBump", JSON.stringify(action.payload));
          break;
        case Actions.SET_SHIPPING_OPTION_DATA:
          draft.productOrder.cart.shippingOption = action.payload;
          sessionStorage.setItem(
            "shippingOption",
            JSON.stringify(action.payload)
          );
          break;
        case Actions.SET_NEXT_STEP:
          draft.productOrder.step = draft.productOrder.step + 1;
          break;
        case Actions.SET_PREV_STEP:
          draft.productOrder.step = draft.productOrder.step - 1;
          break;
      }
    }),
    initialState
  );

  const setSteps = useCallback(
    (steps: "three" | "single" | "automatic-api") => {
      dispatch({ type: Actions.SET_STEPS, payload: steps });
    },
    []
  );

  const setCustomerData = useCallback((customerData: CustomerType) => {
    dispatch({ type: Actions.SET_CUSTOMER_DATA, payload: customerData });
  }, []);

  const setAddressData = useCallback((addressData: AddressType) => {
    dispatch({ type: Actions.SET_ADDRESS_DATA, payload: addressData });
  }, []);

  const setPaymentData = useCallback((paymentData: PaymentType) => {
    dispatch({ type: Actions.SET_PAYMENT_DATA, payload: paymentData });
  }, []);

  const setCartData = useCallback((cartData: CartType) => {
    dispatch({ type: Actions.SET_CART_DATA, payload: cartData });
  }, []);

  const setCartProductQuantity = useCallback((quantity: number) => {
    dispatch({ type: Actions.SET_CART_PRODUCT_QUANTITY, payload: quantity });
  }, []);

  const setOrderBumpData = useCallback((orderBumpData: OrderBumpType) => {
    dispatch({ type: Actions.SET_ORDER_BUMP_DATA, payload: orderBumpData });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: Actions.SET_NEXT_STEP });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: Actions.SET_PREV_STEP });
  }, []);

  const setShippingOptionData = useCallback(
    (shippingOptionData: ShippingOptionType) => {
      dispatch({
        type: Actions.SET_SHIPPING_OPTION_DATA,
        payload: shippingOptionData,
      });
    },
    []
  );

  return {
    productOrder,
    steps,
    setSteps,
    setCustomerData,
    setAddressData,
    setPaymentData,
    setCartData,
    setCartProductQuantity,
    setOrderBumpData,
    setShippingOptionData,
    initialAutomaticApi,
    nextStep,
    prevStep,
  };
};
