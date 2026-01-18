import React from "react";
// import { Clock } from "lucide-react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
// import { useCountdownTimer } from "./hooks";

interface BannerProps {
  checkoutTheme: CheckoutThemeType;
}

export const Banner: React.FC<BannerProps> = ({ checkoutTheme }) => {
  // const timeLeft = useCountdownTimer({ checkoutTheme });
  if (!checkoutTheme.defaultSnippets.isBanner) {
    return null;
  }

  return (
    <div className="relative w-full h-32 sm:h-48 overflow-hidden">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={checkoutTheme.defaultImages.bannerMobile}
        />
        <img
          src={checkoutTheme.defaultImages.bannerDesktop}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </picture>

      {/* {checkoutTheme.defaultSnippets.isCountdown && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Clock className="w-3 sm:w-5 h-3 sm:h-5" />
            <span className="font-bold text-sm sm:text-lg">
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs hidden sm:block">Oferta termina em breve!</p>
        </div>
      )} */}
    </div>
  );
};
