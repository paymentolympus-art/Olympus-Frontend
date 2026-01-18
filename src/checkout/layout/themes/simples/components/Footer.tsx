import React from "react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import { MdPix } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";

interface FooterProps {
  checkoutTheme: CheckoutThemeType;
}

export const Footer: React.FC<FooterProps> = ({ checkoutTheme }) => {
  return (
    <footer
      className={`mt-8 sm:mt-12 lg:mt-16 py-6 sm:py-8 pb-10 sm:pb-16`}
      style={{
        backgroundColor: checkoutTheme.defaultColors.footerBackground,
        color: checkoutTheme.defaultColors.footerText,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {checkoutTheme.defaultSnippets.isPayment && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p
              className="text-sm"
              style={{ color: checkoutTheme.defaultColors.footerText }}
            >
              Formas de pagamento
            </p>

            <div className="flex items-center justify-center bg-[#4AB7A8] rounded-sm px-3 py-1">
              <MdPix className="w-6 h-6  text-white" />
            </div>
          </div>
        )}

        {checkoutTheme.defaultSnippets.isSecurity && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <IoShieldCheckmark className="w-6 h-6 text-[#6ACD85]" />
            <p className="text-sm font-medium">Ambiente seguro</p>
          </div>
        )}

        <div className="flex flex-row justify-center gap-1 w-full mx-auto max-w-[1200px] mt-3 text-center">
          {checkoutTheme.defaultTexts.shopNameText && (
            <span className="text-xs uppercase">
              {checkoutTheme.defaultTexts.shopNameText}
            </span>
          )}
          {checkoutTheme.defaultTexts.shopNameText &&
            checkoutTheme.defaultSnippets.isCNPJ && (
              <span className="text-xs uppercase">-</span>
            )}
          {checkoutTheme.defaultSnippets.isCNPJ && (
            <p className="text-xs">CNPJ {checkoutTheme.defaultTexts.idText}</p>
          )}
        </div>

        <div className="flex flex-row justify-center gap-1 w-full mx-auto max-w-[1200px] mt-3 text-center">
          {checkoutTheme.defaultSnippets.isTerms && (
            <a
              className="sm:text-base hover:underline"
              target="_blank"
              href="#"
              style={{
                color: checkoutTheme.defaultColors.footerText,
                fontSize: "11px",
              }}
            >
              {checkoutTheme.defaultTexts.termsText}
            </a>
          )}

          {checkoutTheme.defaultSnippets.isPrivacyPolicy &&
            checkoutTheme.defaultSnippets.isTerms && (
              <span className="text-xs">|</span>
            )}

          {checkoutTheme.defaultSnippets.isPrivacyPolicy && (
            <a
              className="text-xs sm:text-base hover:underline"
              href="#"
              style={{
                color: checkoutTheme.defaultColors.footerText,
                fontSize: "11px",
              }}
            >
              {checkoutTheme.defaultTexts.privacyPolicyText}
            </a>
          )}

          {checkoutTheme.defaultSnippets.isPrivacyPolicy &&
            checkoutTheme.defaultSnippets.isExchangePolicy && (
              <span className="text-xs">|</span>
            )}

          {checkoutTheme.defaultSnippets.isExchangePolicy && (
            <a
              className="text-xs sm:text-base hover:underline"
              href="#"
              style={{
                color: checkoutTheme.defaultColors.footerText,
                fontSize: "11px",
              }}
            >
              {checkoutTheme.defaultTexts.exchangePolicyText}
            </a>
          )}
        </div>

        {checkoutTheme.defaultSnippets.isCopyRight && (
          <p
            className="text-xs text-center mt-3"
            style={{ color: checkoutTheme.defaultColors.footerText }}
          >
            {checkoutTheme.defaultTexts.copyRightText}
          </p>
        )}
      </div>
    </footer>
  );
};
