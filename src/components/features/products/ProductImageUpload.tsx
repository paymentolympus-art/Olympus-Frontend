import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Product } from "@/types/product";

interface ProductImageUploadProps {
  product: Product;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
  loading?: boolean;
}

export function ProductImageUpload({
  product,
  onUpload,
  onRemove,
  loading = false,
}: ProductImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Validação do arquivo
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (file.size > maxSize) {
      toast.error("Arquivo muito grande. Máximo 5MB permitido.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.");
      return;
    }

    try {
      setUploadProgress(0);
      await onUpload(file);
      setUploadProgress(100);
      toast.success("Imagem enviada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar imagem");
    } finally {
      setUploadProgress(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = async () => {
    try {
      await onRemove();
      toast.success("Imagem removida com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover imagem");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Imagem atual */}
          {product.imageUrl && (
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={product.imageUrl} alt={product.name} />
                <AvatarFallback>
                  <Image className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Imagem atual do produto
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveImage}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Área de upload */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className="space-y-3">
              {uploadProgress !== null ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">
                      Enviando imagem...
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">
                      {product.imageUrl ? "Alterar imagem" : "Adicionar imagem"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Arraste uma imagem aqui ou clique para selecionar
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar arquivo
                    </Button>
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      JPEG, PNG, WebP
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Máx. 5MB
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-500 mb-1">
                  Dicas para uma boa imagem:
                </p>
                <ul className="text-muted-foreground space-y-1">
                  <li>
                    • Use imagens quadradas (1:1) para melhor visualização
                  </li>
                  <li>• Resolução mínima recomendada: 400x400 pixels</li>
                  <li>• Evite textos pequenos ou detalhes muito finos</li>
                  <li>• Use fundos simples para destacar o produto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
