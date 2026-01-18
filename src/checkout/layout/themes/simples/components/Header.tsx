import React from "react";
import { MdShield } from "react-icons/md";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import { cn } from "@/lib/utils";

interface HeaderProps {
  checkoutTheme: CheckoutThemeType;
}

export const Header: React.FC<HeaderProps> = ({ checkoutTheme }) => {
  return (
    <header
      className={cn("shadow-sm relative sm:shadow-none top-0 z-40 py-2", {
        relative: checkoutTheme.defaultSnippets.isMenuFixedTop,
      })}
      style={{ backgroundColor: checkoutTheme.defaultColors.headerBackground }}
    >
      <div className="container max-w-5xl sm:max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className={cn("flex flex-row items-center py-3 sm:py-4", {
            "justify-between": checkoutTheme.defaultSnippets.isSealSecurity,
          })}
        >
          {/* Logo */}
          {checkoutTheme.defaultSnippets.isLogo &&
            !checkoutTheme.defaultSnippets.isSealSecurity && (
              <div
                className={`flex-shrink-0 ${
                  checkoutTheme.defaultImages.logoPosition === "center"
                    ? "mx-auto"
                    : checkoutTheme.defaultImages.logoPosition === "right"
                      ? "ml-auto"
                      : ""
                }`}
              >
                <img
                  src={checkoutTheme.defaultImages.logo}
                  alt={checkoutTheme.defaultTexts.shopNameText}
                  className="h-8 sm:h-10 md:h-12 object-contain"
                />
              </div>
            )}

          {checkoutTheme.defaultSnippets.isLogo &&
            checkoutTheme.defaultSnippets.isSealSecurity && (
              <div className={`flex-shrink-0`}>
                <img
                  src={checkoutTheme.defaultImages.logo}
                  alt={checkoutTheme.defaultTexts.shopNameText}
                  className="h-8 sm:h-10 md:h-12 object-contain"
                />
              </div>
            )}

          {checkoutTheme.defaultSnippets.isSealSecurity && (
            <div
              className="flex items-center justify-end gap-1"
              style={{ color: checkoutTheme.defaultColors.sealSecurityColor }}
            >
              <MdShield className="w-6 h-6" />
              <aside className="flex flex-col items-center">
                <span className="text-[12px] leading-[16px] sm:text-sm font-semibold uppercase">
                  Pagamento
                </span>
                <span className="text-[11px] leading-[14px] sm:text-sm uppercase">
                  100% Seguro
                </span>
              </aside>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
