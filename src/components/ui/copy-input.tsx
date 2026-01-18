import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check, Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyInputProps {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  onCopy?: (value: string) => void;
  showSuccessMessage?: boolean;
  isLink?: boolean;
}

export function CopyInput({
  value,
  placeholder = "Valor para copiar",
  readOnly = true,
  className,
  inputClassName,
  buttonClassName,
  onCopy,
  showSuccessMessage = true,
  isLink = false,
}: CopyInputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);

      if (showSuccessMessage) {
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      onCopy?.(value);

      if (showSuccessMessage) {
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };
  const navigateToLink = () => {
    window.open(value, "_blank");
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Input
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn("flex-1", inputClassName)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className={cn(
          "shrink-0 transition-all duration-200",
          copied && "bg-green-50 border-green-200 text-green-700",
          buttonClassName
        )}
        title={copied ? "Copiado!" : "Copiar"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      {isLink && (
        <Button variant="outline" size="sm" onClick={navigateToLink}>
          <Link className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
