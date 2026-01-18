import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useCheckout } from "@checkout/hooks/useCheckout";

const labelVariants = cva(
  "text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
  const { theme } = useCheckout();
  const cardText = '"' + "text-[" + theme.defaultColors.cardText + '"]';
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), cardText, className)}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
