import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiKeyService } from "@/api/api-key";
import type {
  CreateApiKeyData,
  UpdateApiKeyData,
  ApiKeyListResponse,
  CreateApiKeyResponse,
} from "@/types/api-key";
import { toast } from "sonner";

const API_KEYS_QUERY_KEY = ["api-keys"];

export const useApiKeys = () => {
  const queryClient = useQueryClient();

  // Query para listar API Keys
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<ApiKeyListResponse>({
    queryKey: API_KEYS_QUERY_KEY,
    queryFn: ApiKeyService.getApiKeys,
  });

  // Mutation para criar API Key
  const createMutation = useMutation<CreateApiKeyResponse, Error, CreateApiKeyData>({
    mutationFn: ApiKeyService.createApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
      toast.success("API Key criada com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar API Key");
    },
  });

  // Mutation para atualizar API Key
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApiKeyData }) =>
      ApiKeyService.updateApiKey(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
      toast.success("API Key atualizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar API Key");
    },
  });

  // Mutation para deletar API Key
  const deleteMutation = useMutation({
    mutationFn: ApiKeyService.deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
      toast.success("API Key deletada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao deletar API Key");
    },
  });

  return {
    apiKeys: data?.apiKeys || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    createApiKey: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateApiKey: (id: string, data: UpdateApiKeyData) =>
      updateMutation.mutateAsync({ id, data }),
    isUpdating: updateMutation.isPending,
    deleteApiKey: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};

