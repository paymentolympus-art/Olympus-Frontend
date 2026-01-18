import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/api/product";
import { toast } from "sonner";

export function useProductImage(productId: string) {
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: (imageFile: File) =>
      ProductService.uploadProductImage(productId, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productDetails", productId],
      });
      toast.success("Imagem atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao atualizar imagem");
    },
  });

  const removeImageMutation = useMutation({
    mutationFn: () => ProductService.removeProductImage(productId),
    onSuccess: () => {
      // Invalida as queries relacionadas ao produto
      queryClient.invalidateQueries({
        queryKey: ["productDetails", productId],
      });
      toast.success("Imagem removida com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao remover imagem");
    },
  });

  const uploadImage = async (imageFile: File) => {
    return await uploadImageMutation.mutateAsync(imageFile);
  };

  const removeImage = async () => {
    return await removeImageMutation.mutateAsync();
  };

  return {
    uploadImage,
    removeImage,
    isUploading: uploadImageMutation.isPending,
    isRemoving: removeImageMutation.isPending,
  };
}
