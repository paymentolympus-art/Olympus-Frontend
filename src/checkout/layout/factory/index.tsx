import { useMemo } from "react";
import { type LayoutFactoryType } from "@checkout-layout/types/checkout";
import {
  SimpleCheckout,
  ShopCheckout,
  SelectCheckout,
} from "@checkout-layout/themes";
import Loading from "@checkout-layout/assets/loading.gif";
import { useCheckout } from "@checkout/hooks/useCheckout";

const THEME_COMPONENTS = {
  simple: SimpleCheckout,
  shop: ShopCheckout,
  select: SelectCheckout,
};

const LayoutFactory = ({
  checkoutItems,
  checkoutTheme,
  order,
}: LayoutFactoryType) => {
  const { theme } = useCheckout();

  const renderComponent = useMemo(() => {
    if (!theme)
      return (
        <div className="w-full h-[calc(100vh-64px)] inset-0 flex items-center justify-center bg-black/10">
          <img src={Loading} alt="Loading" className="w-10 h-10" />
        </div>
      );

    // Converte o tema para minúsculas para corresponder às chaves do objeto
    const themeKey = theme.theme.toLowerCase() as keyof typeof THEME_COMPONENTS;
    const Component = THEME_COMPONENTS[themeKey];

    // Verifica se o componente existe antes de renderizar
    if (!Component) {
      console.error(`Tema não encontrado: ${theme.theme}`);
      return (
        <div className="w-full h-[calc(100vh-64px)] inset-0 flex items-center justify-center bg-red-100 text-red-600">
          <p>Erro: Tema "{theme.theme}" não encontrado</p>
        </div>
      );
    }

    return (
      <Component
        checkoutItems={checkoutItems}
        checkoutTheme={checkoutTheme}
        order={order}
      />
    );
  }, [checkoutItems, checkoutTheme, theme, order]);

  return <div>{renderComponent}</div>;
};

export default LayoutFactory;
