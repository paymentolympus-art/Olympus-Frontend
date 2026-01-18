import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IntegrationService } from "@/api/integration";
import { toast } from "sonner";

export function useProductIntegrations(productId: string) {
  const queryClient = useQueryClient();

  const {
    data: integrationsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productIntegrations", productId],
    queryFn: () => IntegrationService.getIntegrationsByProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const removeIntegrationMutation = useMutation({
    mutationFn: (integrationId: string) =>
      IntegrationService.removeIntegrationFromProduct(integrationId, productId),
    onSuccess: () => {
      // Invalida e refaz a query automaticamente
      queryClient.invalidateQueries({
        queryKey: ["productIntegrations", productId],
      });
      toast.success("Integração removida com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao remover integração"
      );
    },
  });

  const removeIntegration = async (integrationId: string) => {
    await removeIntegrationMutation.mutateAsync(integrationId);
  };

  return {
    integrations: integrationsData?.integrations || [],
    loading: isLoading,
    error: error?.message || null,
    fetchIntegrations: refetch,
    removeIntegration,
    isRemoving: removeIntegrationMutation.isPending,
  };
}

export function useAddIntegration(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (integrationId: string) =>
      IntegrationService.associateIntegrationToProduct(
        integrationId,
        productId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productIntegrations", productId],
      });
      toast.success("Integração adicionada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao adicionar integração"
      );
    },
  });
}
