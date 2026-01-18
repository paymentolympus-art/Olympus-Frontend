import { Navbar } from "@/components/widgets/navigation/UserSiberbar/Navbar";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  title,
  children,
  className,
}: PageContainerProps) {
  return (
    <>
      <Navbar title={title} />
      <div
        className={cn(
          "flex flex-col flex-1 w-full px-4 py-6 space-y-6",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
