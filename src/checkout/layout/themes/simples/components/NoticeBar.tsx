import React from "react";
import DOMPurify from "dompurify";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface NoticeBarProps {
  checkoutTheme: CheckoutThemeType;
}

export const NoticeBar: React.FC<NoticeBarProps> = ({ checkoutTheme }) => {
  if (!checkoutTheme.defaultSnippets.isNoticeBar) {
    return null;
  }

  return (
    <div
      className={`
        py-2 px-3 sm:px-4 text-center text-white  
        text-${checkoutTheme.defaultSizes.sizeNoticeBar} py-${checkoutTheme.defaultMargins.marginNoticeBar}

      `}
      style={{ backgroundColor: checkoutTheme.defaultColors.noticeBar }}
    >
      <span
        className="inline-block"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            checkoutTheme.defaultTexts.noticeBarText ?? "",
            {
              ALLOWED_TAGS: [
                "b",
                "i",
                "u",
                "s",
                "strong",
                "em",
                "span",
                "br",
                "p",
                "a",
              ],
              ALLOWED_ATTR: ["href", "title", "class"],
            }
          ),
        }}
      />
    </div>
  );
};
