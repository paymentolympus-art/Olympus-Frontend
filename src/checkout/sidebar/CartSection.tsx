import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Input } from "@checkout/ui/input";
import { Switch } from "@checkout/ui/switch";

export const CartSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="cart-visible"
          checked={theme.cartVisible}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              cartVisible: checked,
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="cart-visible">
          Carrinho sempre aberto
        </Label>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Cor de texto do total</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.cardPriceTotal}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardPriceTotal: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.cardPriceTotal}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardPriceTotal: e.target.value,
                },
              })
            }
            placeholder="#ef4444"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="exibir-contador-de-produtos"
            checked={theme.defaultSnippets.isCountProduct}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isCountProduct: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label
            className="text-foreground"
            htmlFor="exibir-contador-de-produtos"
          >
            Exibir contador de produtos
          </Label>
        </div>
      </div>
    </div>
  );
};
