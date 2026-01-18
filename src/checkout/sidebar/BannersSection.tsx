import React, { useState } from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Switch } from "@checkout/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { validateAsset } from "@checkout/utils/assetValidation";
import { useAssetUpload } from "@checkout/hooks/useAssetUpload";

export const BannersSection: React.FC = () => {
  const { theme, setTheme, data, refetchTheme } = useCheckout();
  const [bannerMobileErrors, setBannerMobileErrors] = useState<string[]>([]);
  const [bannerDesktopErrors, setBannerDesktopErrors] = useState<string[]>([]);
  const { handleImageChange } = useAssetUpload(data.id || "", {
    onRefetch: refetchTheme,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="mostrar-banner"
          checked={theme.defaultSnippets.isBanner}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: { ...theme.defaultSnippets, isBanner: checked },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="mostrar-banner">
          Mostrar banner
        </Label>
      </div>

      <div>
        <Label className="text-foreground">Banner Mobile</Label>
        <Card className="mt-2 border-2 border-dashed border-checkout-info/30 bg-checkout-info/5 hover:border-checkout-info/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              id="banner-mobile-upload"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setBannerMobileErrors([]);

                  const validation = await validateAsset(file, "bannerMobile");

                  if (validation.isValid) {
                    await handleImageChange(file, "bannerMobile", (url) => {
                      setTheme({
                        ...theme,
                        defaultImages: {
                          ...theme.defaultImages,
                          bannerMobile: url,
                        },
                      });
                    });
                  } else {
                    setBannerMobileErrors(validation.errors);
                  }
                }
              }}
            />
            <label htmlFor="banner-mobile-upload" className="cursor-pointer">
              {theme.defaultImages.bannerMobile ? (
                <img
                  src={theme.defaultImages.bannerMobile}
                  alt="Banner Mobile"
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
        {bannerMobileErrors.length > 0 && (
          <div className="mt-2 p-2 bg-red-300/20 border border-red-200 rounded-lg text-xs">
            <ul className="text-red-500 mt-1 list-disc list-inside">
              {bannerMobileErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          Dimensões: 375x200px (1.875:1) • Máximo: 2MB • Formatos: JPEG, PNG,
          WebP
        </p>
      </div>

      <div>
        <Label className="text-foreground">Banner Desktop</Label>
        <Card className="mt-2 border-2 border-dashed border-checkout-info/30 bg-checkout-info/5 hover:border-checkout-info/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              id="banner-desktop-upload"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setBannerDesktopErrors([]);

                  const validation = await validateAsset(file, "bannerDesktop");

                  if (validation.isValid) {
                    await handleImageChange(file, "bannerDesktop", (url) => {
                      setTheme({
                        ...theme,
                        defaultImages: {
                          ...theme.defaultImages,
                          bannerDesktop: url,
                        },
                      });
                    });
                  } else {
                    setBannerDesktopErrors(validation.errors);
                  }
                }
              }}
            />
            <label htmlFor="banner-desktop-upload" className="cursor-pointer">
              {theme.defaultImages.bannerDesktop ? (
                <img
                  src={theme.defaultImages.bannerDesktop}
                  alt="Banner Desktop"
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
        {bannerDesktopErrors.length > 0 && (
          <div className="mt-2 p-2 bg-red-300/20 border border-red-200 rounded-lg text-xs">
            <ul className="text-red-500 mt-1 list-disc list-inside">
              {bannerDesktopErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          Dimensões: 1200x400px (3:1) • Máximo: 3MB • Formatos: JPEG, PNG, WebP
        </p>
      </div>
    </div>
  );
};
