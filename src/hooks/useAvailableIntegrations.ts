import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IntegrationService } from "@/api/integration";
import { toast } from "sonner";

export function useAvailableIntegrations(productId: string) {
  const queryClient = useQueryClient();

  const {
    data: availableIntegrationsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["availableIntegrations", productId],
    queryFn: () => IntegrationService.getUnassociatedIntegrations(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });

  const associateIntegrationMutation = useMutation({
    mutationFn: (integrationId: string) =>
      IntegrationService.associateIntegrationToProduct(
        integrationId,
        productId
      ),
    onSuccess: () => {
      // Invalida ambas as queries relacionadas
      queryClient.invalidateQueries({
        queryKey: ["availableIntegrations", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["productIntegrations", productId],
      });
      toast.success("Integração associada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao associar integração"
      );
    },
  });

  const associateIntegration = async (integrationId: string) => {
    await associateIntegrationMutation.mutateAsync(integrationId);
  };

  return {
    availableIntegrations: availableIntegrationsData?.integrations || [],
    loading: isLoading,
    error: error?.message || null,
    fetchAvailableIntegrations: refetch,
    associateIntegration,
    isAssociating: associateIntegrationMutation.isPending,
  };
}
