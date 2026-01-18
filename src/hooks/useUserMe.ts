import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "@/api/user";
import type { UserMeData } from "@/types/user";
import { toast } from "sonner";

export const useUserMe = () => {
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery<UserMeData>({
    queryKey: ["user-me"],
    queryFn: async () => {
      try {
        return await getUserMe();
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao carregar dados do usuário";
        toast.error(errorMessage);
        throw err;
      }
    },
  });

  return {
    userData,
    isLoading,
    error,
    refetch,
  };
};
