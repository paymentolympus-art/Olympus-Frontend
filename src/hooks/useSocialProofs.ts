import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SocialProofService } from "@/api/social-proof";
import { toast } from "sonner";
import type {
  CreateSocialProofData,
  UpdateSocialProofData,
} from "@/types/social-proof";

interface UseSocialProofsProps {
  productId: string;
}

/**
 * Hook para gerenciar provas sociais de um produto
 */
export function useSocialProofs({ productId }: UseSocialProofsProps) {
  const queryClient = useQueryClient();

  // Query para buscar provas sociais
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["socialProofs", productId],
    queryFn: () => SocialProofService.getSocialProofs(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 1, // Tentar apenas 1 vez em caso de erro
  });

  // Garantir que socialProofs seja sempre um array
  const socialProofs = Array.isArray(data) ? data : [];

  // Mutation para criar prova social
  const createSocialProofMutation = useMutation({
    mutationFn: (data: CreateSocialProofData) =>
      SocialProofService.createSocialProof(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["socialProofs", productId],
      });
      toast.success("Prova social criada com sucesso!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar prova social";
      toast.error(errorMessage);
    },
  });

  // Mutation para atualizar prova social
  const updateSocialProofMutation = useMutation({
    mutationFn: ({
      proofId,
      data,
    }: {
      proofId: string;
      data: UpdateSocialProofData;
    }) => SocialProofService.updateSocialProof(productId, proofId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["socialProofs", productId],
      });
      toast.success("Prova social atualizada com sucesso!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao atualizar prova social";
      toast.error(errorMessage);
    },
  });

  // Mutation para deletar prova social
  const deleteSocialProofMutation = useMutation({
    mutationFn: (proofId: string) =>
      SocialProofService.deleteSocialProof(productId, proofId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["socialProofs", productId],
      });
      toast.success("Prova social removida com sucesso!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao remover prova social";
      toast.error(errorMessage);
    },
  });

  return {
    socialProofs,
    loading: isLoading,
    error: error?.message || null,
    refetch,
    createSocialProof: createSocialProofMutation.mutateAsync,
    updateSocialProof: updateSocialProofMutation.mutateAsync,
    deleteSocialProof: deleteSocialProofMutation.mutateAsync,
    isCreating: createSocialProofMutation.isPending,
    isUpdating: updateSocialProofMutation.isPending,
    isDeleting: deleteSocialProofMutation.isPending,
  };
}
