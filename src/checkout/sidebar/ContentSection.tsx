import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Switch } from "@checkout/ui/switch";
import { Input } from "@checkout/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout/ui/select";

export const ContentSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label className="text-foreground">Cor de fundo do conteúdo</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.background}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  background: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.background}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  background: e.target.value,
                },
              })
            }
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Visual de inputs e botões</Label>
        <Select
          value={theme.radius}
          onValueChange={(value: "square" | "rounded") =>
            setTheme({
              ...theme,
              radius: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="rounded">Arredondado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Cor de fundo do card</Label>
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
        <Label className="text-foreground">Cor do texto do card</Label>
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
        <Label className="text-foreground">Texto secundário de cards</Label>
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

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="sombra-no-card-ativo"
            checked={theme.defaultSnippets.isCardShadow}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isCardShadow: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label className="text-foreground" htmlFor="sombra-no-card-ativo">
            Sombra no card ativo
          </Label>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Cor dos botão primário</Label>
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
                placeholder="#52c41a"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Texto do botão primário</Label>
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
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="sombra-no-botao-primario"
            checked={theme.defaultSnippets.isButtonShadow}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isButtonShadow: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label className="text-foreground" htmlFor="sombra-no-botao-primario">
            Sombra no botão primário
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="efeito-pulsar"
            checked={theme.defaultSnippets.isButtonPulse}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isButtonPulse: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label className="text-foreground" htmlFor="efeito-pulsar">
            Efeito pulsar
          </Label>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">
            Texto do botão de finalizar compra
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={theme.defaultColors.finishButtonTextColor}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    finishButtonTextColor: e.target.value,
                  },
                })
              }
              className="w-12 h-8 p-1 border rounded cursor-pointer"
            />

            <Input
              value={theme.defaultColors.finishButtonTextColor}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    finishButtonTextColor: e.target.value,
                  },
                })
              }
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">
            Fundo do botão de finalizar compra
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={theme.defaultColors.finishButtonColor}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    finishButtonColor: e.target.value,
                  },
                })
              }
              className="w-12 h-8 p-1 border rounded cursor-pointer"
            />

            <Input
              value={theme.defaultColors.finishButtonColor}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    finishButtonColor: e.target.value,
                  },
                })
              }
              placeholder="#35c06f"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="sombra-no-botao-finalizar"
            checked={theme.defaultSnippets.isFinishButtonShadow}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isFinishButtonShadow: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label className="text-foreground" htmlFor="sombra-no-botao-finalizar">
            Sombra no botão finalizar compra
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="efeito-pulsar-finalizar"
            checked={theme.defaultSnippets.isFinishButtonPulse}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isFinishButtonPulse: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label className="text-foreground" htmlFor="efeito-pulsar-finalizar">
            Efeito pulsar no botão finalizar compra
          </Label>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Fundo das etapas</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={theme.defaultColors.stepCircle}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    stepCircle: e.target.value,
                  },
                })
              }
              className="w-12 h-8 p-1 border rounded cursor-pointer"
            />
            <Input
              value={theme.defaultColors.stepCircle}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    stepCircle: e.target.value,
                  },
                })
              }
              placeholder="#283368"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Texto das etapas</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={theme.defaultColors.stepText}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    stepText: e.target.value,
                  },
                })
              }
              className="w-12 h-8 p-1 border rounded cursor-pointer"
            />
            <Input
              value={theme.defaultColors.stepText}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    stepText: e.target.value,
                  },
                })
              }
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="exibir-desconto-no-carrinho"
            checked={theme.defaultSnippets.isCartDiscount}
            onCheckedChange={(checked) =>
              setTheme({
                ...theme,
                defaultSnippets: {
                  ...theme.defaultSnippets,
                  isCartDiscount: checked,
                },
              })
            }
            className="border border-border"
          />
          <Label
            className="text-foreground"
            htmlFor="exibir-desconto-no-carrinho"
          >
            Exibir desconto no carrinho
          </Label>
        </div>
      </div>
    </div>
  );
};
