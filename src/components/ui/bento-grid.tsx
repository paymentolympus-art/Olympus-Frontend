import { ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { SlideUp } from "@/components/animations/slide-up";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <SlideUp
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-transparent",
      // dark styles
      "transform-gpu dark:bg-zinc-900/40 dark:border-[1px] dark:border-gray-500/10 dark:[box-shadow:0_-20px_80px_-20px_#0000001f_inset]",
      className
    )}
    {...(props as any)}
  >
    <div>{background}</div>
    <div className={cn("p-4")}>
      <div className="z-20 relative flex flex-col items-center justify-center gap-1 pointer-events-none transform-gpu transition-all duration-300 lg:group-hover:-translate-y-10">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="max-w-lg text-gray-400">{description}</p>
      </div>

      <div
        className={cn(
          "lg:hidden pointer-events-none flex flex-row items-center w-full translate-y-0 transform-gpu transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "z-20 hidden lg:flex pointer-events-none absolute bottom-0 justify-center w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300  group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className="pointer-events-auto p-0"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div className="z-10 pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-950/50" />
  </SlideUp>
);

export { BentoCard, BentoGrid };
