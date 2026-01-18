import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InputWithIconProps extends React.ComponentProps<"input"> {
  icon: LucideIcon;
  iconClassName?: string;
}

export const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputWithIconProps
>(({ className, icon: Icon, iconClassName, ...props }, ref) => {
  return (
    <div className="relative">
      <Icon
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-50/40 pointer-events-none",
          iconClassName
        )}
      />
      <Input ref={ref} className={cn("pl-10", className)} {...props} />
    </div>
  );
});

InputWithIcon.displayName = "InputWithIcon";
