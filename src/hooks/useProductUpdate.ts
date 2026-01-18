import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/api/product";
import { toast } from "sonner";
import type { UpdateProductData } from "@/types/product";

export function useProductUpdate(productId: string) {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: (data: UpdateProductData) =>
      ProductService.updateProduct(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productDetails", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Produto atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao atualizar produto");
    },
  });

  const updateProduct = async (data: UpdateProductData) => {
    return await updateProductMutation.mutateAsync(data);
  };

  return {
    updateProduct,
    isUpdating: updateProductMutation.isPending,
  };
}
