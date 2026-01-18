import * as React from "react";

import { cn } from "@/lib/utils";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { IMaskInput, type IMaskInputProps } from "react-imask";

type InputMaskProps = Omit<
  IMaskInputProps<HTMLInputElement>,
  "ref" | "inputRef"
> & {
  mask: string | RegExp | Array<{ mask: string }>;
};

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, type, mask, ...props }, ref) => {
    const { theme } = useCheckout();

    return (
      <IMaskInput
        type={type}
        mask={mask as IMaskInputProps<HTMLInputElement>["mask"]}
        className={cn(
          "text-gray-950 flex w-full rounded-md border-gray-400/80 bg-transparent px-3 py-2 sm:py-3 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-muted-foreground",
          "focus-visible:border-blue-500 focus-visible:inset-shadow-blue-500/40 focus-visible:shadow-sm",
          "outline-none ring-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "autofill:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.9)] autofill:[-webkit-text-fill-color:black]",
          "[&:-webkit-autofill:focus]:!shadow-[inset_0_0_0px_1000px_transparent]",
          "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[600000s]",
          "transition-all duration-300",
          {
            "rounded-full": theme.radius === "rounded",
          },
          className
        )}
        style={{ borderWidth: "0.1px" }}
        inputRef={ref}
        {...(props as any)}
      />
    );
  }
);
InputMask.displayName = "InputMask";

export { InputMask };
