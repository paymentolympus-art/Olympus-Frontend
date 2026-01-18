import { useQuery } from "@tanstack/react-query";
import { getUserAwards } from "@/api/user";
import type { UserAwardsData } from "@/types/user";
import { toast } from "sonner";

export const useUserAwards = () => {
  const {
    data: awardsData,
    isLoading,
    error,
    refetch,
  } = useQuery<UserAwardsData>({
    queryKey: ["user-awards"],
    queryFn: async () => {
      try {
        return await getUserAwards();
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao carregar dados de awards";
        toast.error(errorMessage);
        throw err;
      }
    },
  });

  return {
    awardsData,
    isLoading,
    error,
    refetch,
  };
};
