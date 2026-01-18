import { useQuery } from "@tanstack/react-query";
import { SaleService } from "@/api/sale";
import type { SaleQueryParams, SalesResponse } from "@/types/sale";

export const useSales = (params: SaleQueryParams = {}) => {
  return useQuery<SalesResponse>({
    queryKey: ["sales", params],
    queryFn: () => SaleService.querySales(params),
    staleTime: 30000, // 30 segundos
  });
};
