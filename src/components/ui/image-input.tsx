import { useState, useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiX } from "react-icons/hi";
import { HiPhoto } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface ImageInputProps {
  id?: string;
  label?: string;
  description?: string;
  accept?: string;
  maxSize?: number; // em MB
  onFileSelect?: (file: File | null) => void;
  onPreviewChange?: (preview: string | null) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  initialPreview?: string | null;
}

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  (
    {
      id,
      label,
      description,
      accept = "image/*",
      maxSize = 5,
      onFileSelect,
      onPreviewChange,
      className,
      disabled = false,
      required = false,
      initialPreview = null,
    },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialPreview);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError(null);

      if (file) {
        // Validar tipo de arquivo
        if (!file.type.startsWith("image/")) {
          setError("Por favor, selecione apenas arquivos de imagem.");
          return;
        }

        // Validar tamanho
        if (file.size > maxSize * 1024 * 1024) {
          setError(`O arquivo deve ter no máximo ${maxSize}MB.`);
          return;
        }

        setSelectedFile(file);
        onFileSelect?.(file);

        // Criar preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = e.target?.result as string;
          setPreview(previewUrl);
          onPreviewChange?.(previewUrl);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleRemoveFile = () => {
      setSelectedFile(null);
      setPreview(null);
      setError(null);
      onFileSelect?.(null);
      onPreviewChange?.(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleClick = () => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    };

    return (
      <div className={cn("space-y-3", className)}>
        {/* Label */}
        {label && (
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {/* Input de arquivo oculto */}
        <Input
          ref={ref || fileInputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
          required={required}
        />

        {/* Área de upload */}
        {!preview && (
          <div
            onClick={handleClick}
            className={cn(
              "border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-muted-foreground/50",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-red-500"
            )}
          >
            <HiPhoto className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Clique para selecionar uma imagem
            </p>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: {maxSize}MB
            </p>
          </div>
        )}

        {/* Preview da imagem */}
        {preview && (
          <div className="relative">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-w-[300px] h-auto rounded-lg border shadow-sm"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={handleRemoveFile}
                disabled={disabled}
              >
                <HiX className="h-3 w-3" />
              </Button>
            </div>

            {preview !== initialPreview && (
              <div className="mt-2 text-xs text-muted-foreground">
                {selectedFile?.name} (
                {selectedFile
                  ? (selectedFile.size / 1024 / 1024).toFixed(2)
                  : "0"}{" "}
                MB)
              </div>
            )}
          </div>
        )}

        {/* Mensagem de erro */}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

ImageInput.displayName = "ImageInput";
