import { produce } from "immer";
import { useReducer, useCallback, useMemo } from "react";
import { type CheckoutItemsType } from "@checkout-layout/types/checkout";

enum Actions {
  SET_CHECKOUT_ITEMS = "SET_CHECKOUT_ITEMS",
}

type State = {
  checkoutItems: CheckoutItemsType;
  isLoading: boolean;
};

export const useCheckoutItems = (_checkoutItems: CheckoutItemsType) => {
  const initialState: State = useMemo(
    () => ({
      checkoutItems: _checkoutItems,
      isLoading: false,
    }),
    [_checkoutItems]
  );

  const [{ checkoutItems, isLoading }, dispatch] = useReducer(
    produce((draft: State, action) => {
      switch (action.type) {
        case Actions.SET_CHECKOUT_ITEMS:
          draft.checkoutItems = action.payload;
          break;
        default:
          break;
      }
    }),
    initialState
  );

  const setCheckoutItems = useCallback((data: CheckoutItemsType) => {
    return dispatch({ type: Actions.SET_CHECKOUT_ITEMS, payload: data });
  }, []);

  return {
    checkoutItems,
    setCheckoutItems,
    isLoading,
  };
};
