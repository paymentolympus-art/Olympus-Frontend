import React from "react";
import { Label } from "@checkout/ui/label";
import { Input } from "@checkout/ui/input";
import { useCheckout } from "@checkout/hooks/useCheckout";

export const ShopSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();
  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label className="text-foreground">Background do shop</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.cardBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardBackground: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.cardBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardBackground: e.target.value,
                },
              })
            }
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Títulos do shop</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.cardText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardText: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.cardText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardText: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Texto secundários</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.cardDescription}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardDescription: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.cardDescription}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  cardDescription: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Texto desconto</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.textDiscount}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  textDiscount: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.textDiscount}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  textDiscount: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Fundo de botão</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.buttonColor}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  buttonColor: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.buttonColor}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  buttonColor: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Texto do botão</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.buttonTextColor}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  buttonTextColor: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.buttonTextColor}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  buttonTextColor: e.target.value,
                },
              })
            }
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
