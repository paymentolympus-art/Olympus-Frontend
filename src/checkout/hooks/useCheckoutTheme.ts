import { produce } from "immer";
import { useReducer, useCallback, useMemo, useEffect } from "react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

enum Actions {
  SET_CHECKOUT_THEME = "SET_CHECKOUT_THEME",
}

type State = {
  theme: CheckoutThemeType;
  isLoading: boolean;
};

export const useCheckoutTheme = (theme: CheckoutThemeType) => {
  const initialState: State = useMemo(
    () => ({
      theme: theme,
      isLoading: true,
    }),
    [theme]
  );

  const [data, dispatch] = useReducer(
    produce((draft: State, action) => {
      switch (action.type) {
        case Actions.SET_CHECKOUT_THEME:
          draft.theme = action.payload;
          break;
        default:
          break;
      }
    }),
    initialState
  );

  const setCheckoutTheme = useCallback((data: CheckoutThemeType) => {
    return dispatch({ type: Actions.SET_CHECKOUT_THEME, payload: data });
  }, []);

  // Sincroniza o tema quando a prop theme muda (ex: após refetch dos dados)
  useEffect(() => {
    setCheckoutTheme(theme);
  }, [theme, setCheckoutTheme]);

  return {
    checkoutTheme: data.theme,
    setCheckoutTheme,
    isLoading: data.isLoading,
  };
};
