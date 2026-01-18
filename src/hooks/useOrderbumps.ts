import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderbumpService } from "@/api/orderbump";
import type {
  CreateOrderbumpData,
  UpdateOrderbumpData,
} from "@/types/orderbump";
import { toast } from "sonner";

interface UseOrderbumpsProps {
  productId: string;
}

export function useOrderbumps({ productId }: UseOrderbumpsProps) {
  const queryClient = useQueryClient();

  const {
    data: orderbumpsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orderbumps", productId],
    queryFn: () => {
      return OrderbumpService.getOrderbumps(productId);
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    // gcTime: 5 * 60 * 1000, // 5 minutos
    // retry: 3,
    // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const createOrderbumpMutation = useMutation({
    mutationFn: (data: CreateOrderbumpData) =>
      OrderbumpService.createOrderbump(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderbumps"] });
      toast.success("Orderbump criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao criar orderbump");
    },
  });

  const updateOrderbumpMutation = useMutation({
    mutationFn: ({
      data,
      orderbumpId,
    }: {
      data: UpdateOrderbumpData;
      orderbumpId: string;
    }) => OrderbumpService.updateOrderbump(orderbumpId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderbumps"] });
      toast.success("Orderbump atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar orderbump"
      );
    },
  });

  const toggleOrderbumpMutation = useMutation({
    mutationFn: ({
      orderbumpId,
      status,
    }: {
      orderbumpId: string;
      status: string;
    }) =>
      OrderbumpService.updateOrderbump(orderbumpId, {
        status: status === "ACTIVE" ? "DISABLED" : "ACTIVE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderbumps"] });
      toast.success("Orderbump ativado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao ativar/desativar orderbump"
      );
    },
  });

  const deleteOrderbumpMutation = useMutation({
    mutationFn: (orderbumpId: string) =>
      OrderbumpService.deleteOrderbump(orderbumpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderbumps"] });
      toast.success("Orderbump deletado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao deletar orderbump");
    },
  });
  const updateOrderbumpImageMutation = useMutation({
    mutationFn: ({
      orderbumpId,
      imageFile,
    }: {
      orderbumpId: string;
      imageFile: File;
    }) => OrderbumpService.uploadOrderbumpImage(orderbumpId, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderbumps"] });
      toast.success("Imagem do orderbump atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar imagem do orderbump"
      );
    },
  });
  const removeOrderbumpImageMutation = useMutation({
    mutationFn: (orderbumpId: string) =>
      OrderbumpService.removeOrderbumpImage(orderbumpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderbumps"] });
      toast.success("Imagem do orderbump removida com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao remover imagem do orderbump"
      );
    },
  });

  // Mutations Functions
  const createOrderbump = async (data: CreateOrderbumpData) => {
    return await createOrderbumpMutation.mutateAsync(data);
  };

  const updateOrderbump = async (
    data: UpdateOrderbumpData,
    orderbumpId: string
  ) => {
    return await updateOrderbumpMutation.mutateAsync({ data, orderbumpId });
  };

  const toggleOrderbump = async (orderbumpId: string, status: string) => {
    return await toggleOrderbumpMutation.mutateAsync({ orderbumpId, status });
  };

  const deleteOrderbump = async (orderbumpId: string) => {
    return await deleteOrderbumpMutation.mutateAsync(orderbumpId);
  };

  const updateOrderbumpImage = async (orderbumpId: string, imageFile: File) => {
    return await updateOrderbumpImageMutation.mutateAsync({
      orderbumpId,
      imageFile,
    });
  };

  const removeOrderbumpImage = async (orderbumpId: string) => {
    return await removeOrderbumpImageMutation.mutateAsync(orderbumpId);
  };

  return {
    orderbumps: orderbumpsData || [],
    loading: isLoading,
    error: error?.message || null,
    fetchOrderbumps: refetch,
    createOrderbump,
    updateOrderbump,
    toggleOrderbump,
    deleteOrderbump,
    updateOrderbumpImage,
    removeOrderbumpImage,
    isDeleting: deleteOrderbumpMutation.isPending,
    isToggling: toggleOrderbumpMutation.isPending,
    isCreating: createOrderbumpMutation.isPending,
    isUpdating: updateOrderbumpMutation.isPending,
    isUpdatingImage: updateOrderbumpImageMutation.isPending,
    isRemovingImage: removeOrderbumpImageMutation.isPending,
  };
}

export function useOrderbumpAvailable(productId: string) {
  const query = useQuery({
    queryKey: ["orderbumpAvailable", productId],
    queryFn: () => {
      return OrderbumpService.getOrderbumpAvailable(productId);
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: true, // Não tentar novamente em caso de erro 404
    throwOnError: false, // Não lançar erro, apenas retornar undefined
  });

  return query;
}
