import React, { useState } from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { useAssetUpload } from "@checkout/hooks/useAssetUpload";
import { Label } from "@checkout/ui/label";
import { Switch } from "@checkout/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout/ui/select";
import { Input } from "@checkout/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { validateAsset } from "@checkout/utils/assetValidation";

export const HeaderSection: React.FC = () => {
  const { theme, setTheme, data, refetchTheme } = useCheckout();
  const [logoErrors, setLogoErrors] = useState<string[]>([]);
  const [faviconErrors, setFaviconErrors] = useState<string[]>([]);
  const { handleImageChange } = useAssetUpload(data.id || "", {
    onRefetch: refetchTheme,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-foreground">Título da página</Label>
        <Input
          value={theme.defaultTexts.titlePageText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                titlePageText: e.target.value,
              },
            })
          }
          placeholder="Checkout de pagamento"
        />
      </div>

      <div>
        <Label className="text-foreground">Logo</Label>
        <Card className="mt-2 border-2 border-dashed border-checkout-info/30 bg-checkout-info/5 hover:border-checkout-info/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="hidden"
              id="logo-upload"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLogoErrors([]);

                  const validation = await validateAsset(file, "logo");

                  if (validation.isValid) {
                    // Fazer upload do arquivo para a API
                    await handleImageChange(file, "logo", (url) => {
                      setTheme({
                        ...theme,
                        defaultImages: {
                          ...theme.defaultImages,
                          logo: url,
                        },
                      });
                    });
                  } else {
                    setLogoErrors(validation.errors);
                  }
                }
              }}
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              {theme.defaultImages.logo ? (
                <img
                  src={theme.defaultImages.logo}
                  alt="Logo"
                  className="max-h-20 mx-auto rounded"
                />
              ) : (
                <p className="text-sm text-checkout-info">
                  Arraste e solte ou clique aqui para adicionar imagens
                </p>
              )}
            </label>
          </CardContent>
        </Card>
        {logoErrors.length > 0 && (
          <div className="mt-2 p-2 bg-red-300/20 border border-red-200 rounded-lg text-xs">
            <ul className="text-red-500 mt-1 list-disc list-inside">
              {logoErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          Dimensões: 200x200px (1:1) • Máximo: 1MB • Formatos: JPEG, PNG, WebP,
          SVG
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Alinhamento da logo</Label>
        <Select
          value={theme.defaultImages.logoPosition}
          onValueChange={(value: "center" | "left" | "right") =>
            setTheme({
              ...theme,
              defaultImages: { ...theme.defaultImages, logoPosition: value },
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="fixar-logo-topo"
          checked={theme.defaultSnippets.isLogo}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: { ...theme.defaultSnippets, isLogo: checked },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="fixar-logo-topo">
          Ocultar logo
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="fixar-menu-topo"
          checked={theme.defaultSnippets.isMenuFixedTop}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isMenuFixedTop: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="fixar-menu-topo">
          Fixar menu no topo
        </Label>
      </div>

      <div>
        <Label className="text-foreground">Favicon</Label>
        <Card className="mt-2 border-2 border-dashed border-checkout-info/30 bg-checkout-info/5 hover:border-checkout-info/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <input
              type="file"
              accept="image/png,image/x-icon"
              className="hidden"
              id="favicon-upload"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFaviconErrors([]);

                  const validation = await validateAsset(file, "favicon");

                  if (validation.isValid) {
                    // Fazer upload do arquivo para a API
                    await handleImageChange(file, "favicon", (url) => {
                      setTheme({
                        ...theme,
                        defaultImages: {
                          ...theme.defaultImages,
                          favicon: url,
                        },
                      });
                    });
                  } else {
                    setFaviconErrors(validation.errors);
                  }
                }
              }}
            />
            <label htmlFor="favicon-upload" className="cursor-pointer">
              {theme.defaultImages.favicon ? (
                <img
                  src={theme.defaultImages.favicon}
                  alt="Favicon"
                  className="max-h-16 mx-auto rounded"
                />
              ) : (
                <p className="text-sm text-checkout-info">
                  Arraste e solte ou clique aqui para adicionar imagens
                </p>
              )}
            </label>
          </CardContent>
        </Card>
        {faviconErrors.length > 0 && (
          <div className="mt-2 p-2 bg-red-300/20 border border-red-200 rounded-lg text-xs">
            <ul className="text-red-500 mt-1 list-disc list-inside">
              {faviconErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          Dimensões: 32x32px (1:1) • Máximo: 100KB • Formatos: PNG, ICO
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Fundo do cabeçalho</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.headerBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  headerBackground: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.headerBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  headerBackground: e.target.value,
                },
              })
            }
            placeholder="f2f2f2"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-selo-de-seguranca"
          checked={theme.defaultSnippets.isSealSecurity}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isSealSecurity: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-selo-de-seguranca">
          Exibir selo de segurança
        </Label>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Selo de segurança</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.sealSecurityColor}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  sealSecurityColor: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.sealSecurityColor}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  sealSecurityColor: e.target.value,
                },
              })
            }
            placeholder="f2f2f2"
          />
        </div>
      </div>
    </div>
  );
};
