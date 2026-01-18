import { ProductService } from "@/api/product";
import { useQuery } from "@tanstack/react-query";

export const useProductDetails = (productId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => ProductService.getProductDetailsById(productId),
    enabled: !!productId,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
