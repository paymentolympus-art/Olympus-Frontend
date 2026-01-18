import { cn } from "@/lib/utils";
export default function Container({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("w-full h-full", className)} style={style}>
      {children}
    </div>
  );
}
