import { useState } from "react";
import { toast } from "sonner";
import { CheckoutService, getAssetTypeFromKey } from "@/api/checkout";

interface UseAssetUploadOptions {
  onRefetch?: () => Promise<void>;
}

export const useAssetUpload = (
  productId: string,
  options?: UseAssetUploadOptions
) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { onRefetch } = options || {};

  const uploadAssetFile = async (
    file: File,
    assetKey: string,
    onSuccess: (url: string) => void
  ) => {
    if (!productId) {
      toast.error("ID do produto não encontrado");
      return;
    }

    setIsUploading(true);

    try {
      const assetType = getAssetTypeFromKey(assetKey);
      const response = await CheckoutService.uploadAsset(
        productId,
        assetType,
        file
      );

      const imageUrl = response.data.url;
      onSuccess(imageUrl);
      if (onRefetch) {
        await onRefetch();
      }

      toast.success(response.message || "Asset enviado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erro ao fazer upload do asset";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const removeAsset = async (
    assetKey: string,
    onSuccess: () => void
  ): Promise<void> => {
    if (!productId) {
      toast.error("ID do produto não encontrado");
      return;
    }

    setIsRemoving(true);

    try {
      const assetType = getAssetTypeFromKey(assetKey);
      await CheckoutService.removeAsset(productId, assetType);

      // Atualiza o estado local imediatamente para feedback visual
      onSuccess();

      // Recarrega os dados do servidor para sincronizar tudo
      if (onRefetch) {
        await onRefetch();
      }

      toast.success("Asset removido com sucesso!");
    } catch (error: any) {
      console.error("Erro ao remover asset:", error);
      const errorMessage =
        error.response?.data?.error || error.message || "Erro ao remover asset";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsRemoving(false);
    }
  };

  const handleImageChange = async (
    file: File,
    assetKey: string,
    onSuccess: (url: string) => void
  ) => {
    // Se é um arquivo local (base64), fazer upload
    if (file) {
      await uploadAssetFile(file, assetKey, onSuccess);
    }
  };

  return {
    uploadAssetFile,
    handleImageChange,
    removeAsset,
    isUploading,
    isRemoving,
  };
};
