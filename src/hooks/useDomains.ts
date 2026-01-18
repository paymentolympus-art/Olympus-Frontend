// src/hooks/useDomains.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DomainService } from "@/api/domain";
import type { DomainFilters, DomainFormData } from "@/types/domain";

// Query Keys
export const domainKeys = {
  all: ["domains"] as const,
  lists: () => [...domainKeys.all, "list"] as const,
  list: (filters: DomainFilters) => [...domainKeys.lists(), filters] as const,
  details: () => [...domainKeys.all, "detail"] as const,
  detail: (id: string) => [...domainKeys.details(), id] as const,
  byProduct: (productId: string) =>
    [...domainKeys.all, "product", productId] as const,
};

// Hook para listar domínios
export function useDomains(filters: DomainFilters = {}) {
  return useQuery({
    queryKey: domainKeys.list(filters),
    queryFn: () => DomainService.getDomains(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}

// Hook para buscar domínio específico
export function useDomain(id: string) {
  return useQuery({
    queryKey: domainKeys.detail(id),
    queryFn: () => DomainService.getDomainById(id),
    enabled: !!id,
  });
}

// Hook para domínios por produto
export function useDomainsByProduct(productId: string) {
  return useQuery({
    queryKey: domainKeys.byProduct(productId),
    queryFn: () => DomainService.getDomainsByProduct(productId),
    enabled: !!productId,
  });
}

// Hook para criar domínio
export function useCreateDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DomainFormData) => DomainService.createDomain(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      toast.success("Domínio criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar domínio");
    },
  });
}

// Hook para atualizar domínio
export function useUpdateDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DomainFormData> }) =>
      DomainService.updateDomain(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      queryClient.invalidateQueries({ queryKey: domainKeys.detail(id) });
      toast.success("Domínio atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar domínio");
    },
  });
}

// Hook para deletar domínio
export function useDeleteDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DomainService.deleteDomain(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      toast.success("Domínio deletado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao deletar domínio");
    },
  });
}

// Hook para verificar domínio
export function useVerifyDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DomainService.verifyDomain(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      queryClient.invalidateQueries({ queryKey: domainKeys.detail(id) });

      if (data.isConfigured) {
        toast.success("Domínio verificado com sucesso!");
      } else {
        toast.warning("Domínio precisa de configuração DNS");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao verificar domínio");
    },
  });
}

// Hook para associar produtos
export function useAssociateProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      domainId,
      productIds,
    }: {
      domainId: string;
      productIds: string[];
    }) => DomainService.associateProducts(domainId, productIds),
    onSuccess: (_, { domainId }) => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      queryClient.invalidateQueries({ queryKey: domainKeys.detail(domainId) });
      toast.success("Produtos associados com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao associar produtos");
    },
  });
}

// Hook para adicionar produto
export function useAddProductToDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      domainId,
      productId,
    }: {
      domainId: string;
      productId: string;
    }) => DomainService.addProductToDomain(domainId, productId),
    onSuccess: (_, { domainId, productId }) => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: domainKeys.byProduct(productId),
      });
      queryClient.invalidateQueries({ queryKey: domainKeys.detail(domainId) });
      queryClient.invalidateQueries({
        queryKey: ["productDetails", productId],
      });
      toast.success("Vínculo adicionado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response.data.error || "Erro ao adicionar vínculo");
    },
  });
}

// Hook para remover produto
export function useRemoveProductFromDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      domainId,
      productId,
    }: {
      domainId: string;
      productId: string;
    }) => DomainService.removeProductFromDomain(domainId, productId),
    onSuccess: (_, { domainId, productId }) => {
      queryClient.invalidateQueries({ queryKey: domainKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: domainKeys.byProduct(productId),
      });
      queryClient.invalidateQueries({ queryKey: domainKeys.detail(domainId) });
      queryClient.invalidateQueries({
        queryKey: ["productDetails", productId],
      });
      toast.success("Vínculo removido com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao remover vínculo");
    },
  });
}
