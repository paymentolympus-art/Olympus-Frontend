import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnOverlayClick = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "max-w-sm max-h-[95vh] overflow-y-auto my-auto",
    md: "max-w-md max-h-[95vh] overflow-y-auto my-auto",
    lg: "max-w-[95vw] max-h-[95vh] overflow-y-auto my-auto",
    xl: "max-w-xl max-h-[100vh] overflow-y-auto my-auto",
    full: "max-w-[100vw]",
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeOnOverlayClick ? onClose : undefined}
    >
      <DialogContent
        className={`${sizeClasses[size]} ${className}`}
        onPointerDownOutside={
          closeOnOverlayClick ? undefined : (e) => e.preventDefault()
        }
        onEscapeKeyDown={
          closeOnOverlayClick ? undefined : (e) => e.preventDefault()
        }
      >
        <DialogHeader className="text-start">
          <DialogTitle className="text-lg font-semibold pr-8">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
