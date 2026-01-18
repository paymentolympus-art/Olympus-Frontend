import { useQuery } from "@tanstack/react-query";
import { AwardService } from "@/api/award";
import type { AwardsFilters, AwardsListResponse } from "@/types/award";
import { toast } from "sonner";

export const useAwards = (filters: AwardsFilters = {}) => {
  const { data, isLoading, error, refetch } = useQuery<AwardsListResponse>({
    queryKey: ["awards", filters],
    queryFn: async () => {
      try {
        return await AwardService.getAwards(filters);
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao carregar premiações";
        toast.error(errorMessage);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    awards: data?.awards || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
};
