import { useState, useEffect } from "react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";

interface UseCountdownTimerProps {
  checkoutTheme: CheckoutThemeType;
}

export const useCountdownTimer = ({
  checkoutTheme,
}: UseCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });

  useEffect(() => {
    if (!checkoutTheme.defaultSnippets.isCountdown) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          return { minutes: 15, seconds: 0 };
        }
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [checkoutTheme.defaultSnippets.isCountdown]);

  return timeLeft;
};
