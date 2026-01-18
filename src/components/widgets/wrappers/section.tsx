import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
  ariaLabelledby,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  ariaLabelledby?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("container max-w-[76rem] mx-auto px-4", className)}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </section>
  );
}
