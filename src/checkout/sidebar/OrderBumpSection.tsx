import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Input } from "@checkout/ui/input";

export const OrderBumpSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label className="text-foreground">Fundo do order bump</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.orderBumpBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpBackground: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.orderBumpBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpBackground: e.target.value,
                },
              })
            }
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Texto do order bump</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.orderBumpText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpText: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.orderBumpText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpText: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Preço do order bump</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.orderBumpPrice}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpPrice: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.orderBumpPrice}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpPrice: e.target.value,
                },
              })
            }
            placeholder="#218ec4"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Borda do order bump</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.orderBumpBorder}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpBorder: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.orderBumpBorder}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpBorder: e.target.value,
                },
              })
            }
            placeholder="#D0D0D0"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Texto do botão</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.orderBumpButtonText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpButtonText: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.orderBumpButtonText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpButtonText: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Fundo do botão</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.orderBumpButton}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpButton: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.orderBumpButton}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  orderBumpButton: e.target.value,
                },
              })
            }
            placeholder="#218ec4"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
