import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OfferService } from "@/api/offer";
import type { CreateOfferData, UpdateOfferData } from "@/types/offer";
import { toast } from "sonner";

interface UseOffersProps {
  productId: string;
}

export function useOffers({ productId }: UseOffersProps) {
  const queryClient = useQueryClient();

  const {
    data: offersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["offers", productId],
    queryFn: () => OfferService.getOffersByProduct(productId),
    enabled: !!productId,
    staleTime: 3 * 60 * 1000, // 3 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const createOfferMutation = useMutation({
    mutationFn: (data: CreateOfferData) => OfferService.createOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers", productId],
      });
      toast.success("Oferta criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao criar oferta");
    },
  });

  const createDefaultOfferMutation = useMutation({
    mutationFn: () => OfferService.createDefaultOffer(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers", productId],
      });
      toast.success("Oferta padrão criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao criar oferta padrão"
      );
    },
  });

  const updateOfferMutation = useMutation({
    mutationFn: ({
      offerId,
      data,
    }: {
      offerId: string;
      data: UpdateOfferData;
    }) => OfferService.updateOffer(offerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers", productId],
      });
      toast.success("Oferta atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao atualizar oferta");
    },
  });

  const setDefaultOfferMutation = useMutation({
    mutationFn: (offerId: string) => OfferService.setDefaultOffer(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers", productId],
      });
      toast.success("Oferta definida como padrão!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao definir oferta padrão"
      );
    },
  });

  const deleteOfferMutation = useMutation({
    mutationFn: (offerId: string) => OfferService.deleteOffer(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers", productId],
      });
      toast.success("Oferta deletada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao deletar oferta");
    },
  });

  const createOffer = async (data: CreateOfferData) => {
    return await createOfferMutation.mutateAsync(data);
  };

  const createDefaultOffer = async () => {
    return await createDefaultOfferMutation.mutateAsync();
  };

  const updateOffer = async (offerId: string, data: UpdateOfferData) => {
    return await updateOfferMutation.mutateAsync({ offerId, data });
  };

  const setDefaultOffer = async (offerId: string) => {
    return await setDefaultOfferMutation.mutateAsync(offerId);
  };

  const deleteOffer = async (offerId: string) => {
    return await deleteOfferMutation.mutateAsync(offerId);
  };

  return {
    offers: offersData?.offers || [],
    loading: isLoading,
    error: error?.message || null,
    fetchOffers: refetch,
    createOffer,
    createDefaultOffer,
    updateOffer,
    setDefaultOffer,
    deleteOffer,
    // Estados específicos para cada operação
    isCreating: createOfferMutation.isPending,
    isCreatingDefault: createDefaultOfferMutation.isPending,
    isUpdating: updateOfferMutation.isPending,
    isSettingDefault: setDefaultOfferMutation.isPending,
    isDeleting: deleteOfferMutation.isPending,
  };
}
