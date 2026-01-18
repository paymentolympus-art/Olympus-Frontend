import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/image-input";
import { useProductImage } from "@/hooks/useProductImage";
import { RiUploadCloud2Line } from "react-icons/ri";

interface ProductImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export function ProductImageModal({
  isOpen,
  onClose,
  productId,
  productName,
}: ProductImageModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadImage, isUploading } = useProductImage(productId);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadImage(selectedFile);
      handleClose();
      window.location.reload();
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Atualizar Imagem do Produto</DialogTitle>
          <DialogDescription>
            Selecione uma nova imagem para o produto "{productName}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input de imagem */}
          <ImageInput
            id="product-image"
            label="Imagem do Produto"
            description="Selecione uma nova imagem para o produto"
            accept="image/*"
            maxSize={5}
            onFileSelect={handleFileSelect}
            disabled={isUploading}
            required
          />

          {/* Botões de ação */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Atualizando...
                </>
              ) : (
                <>
                  <RiUploadCloud2Line className="h-4 w-4 mr-2" />
                  Atualizar Imagem
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
