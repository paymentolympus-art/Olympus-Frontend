import * as React from "react";

import { cn } from "@/lib/utils";
import { useCheckout } from "@checkout/hooks/useCheckout";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const { theme } = useCheckout();

    return (
      <input
        type={type}
        className={cn(
          "text-gray-950 flex w-full rounded-md border-gray-400/80 bg-transparent px-3 py-2 sm:py-3 text-base",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-muted-foreground",
          "focus-visible:border-blue-500 focus-visible:shadow-sm",
          "outline-none ring-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill]:[-webkit-text-fill-color:black]",
          "[&:-webkit-autofill:focus]:!shadow-[inset_0_0_0px_1000px_transparent]",
          "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[600000s]",
          "transition-all duration-300",
          {
            "rounded-full": theme.radius === "rounded",
          },
          className
        )}
        style={{ borderWidth: "0.1px" }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
