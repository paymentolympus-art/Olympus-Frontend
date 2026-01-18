import { useState, useEffect, useCallback } from "react";
import { IntegrationService } from "@/api/integration";
import type {
  Integration,
  UpdateIntegrationData,
  IntegrationFilters,
  IntegrationListResponse,
  CreateUtmifyIntegrationData,
  CreateWebhookIntegrationData,
} from "@/types/integration";

export const useIntegrations = (initialFilters: IntegrationFilters = {}) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IntegrationFilters>(initialFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchIntegrations = useCallback(
    async (currentFilters: IntegrationFilters) => {
      setLoading(true);
      setError(null);
      try {
        const response: IntegrationListResponse =
          await IntegrationService.getIntegrations(currentFilters);

        setIntegrations(response.integrations);
        setPagination({
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        });
      } catch (err: any) {
        setError(err.message || "Erro ao carregar integrações");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createUtmifyIntegration = useCallback(
    async (data: CreateUtmifyIntegrationData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await IntegrationService.createUtmifyIntegration(data);
        await fetchIntegrations(filters); // Recarregar lista
        return result;
      } catch (err: any) {
        setError(err.message || "Erro ao criar integração UTMify");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchIntegrations, filters]
  );

  const createWebhookIntegration = useCallback(
    async (data: CreateWebhookIntegrationData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await IntegrationService.createWebhookIntegration(data);
        await fetchIntegrations(filters); // Recarregar lista
        return result;
      } catch (err: any) {
        setError(err.message || "Erro ao criar integração Webhook");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchIntegrations, filters]
  );

  const updateIntegration = useCallback(
    async (id: string, data: UpdateIntegrationData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await IntegrationService.updateIntegration(id, data);
        await fetchIntegrations(filters); // Recarregar lista
        return result;
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar integração");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchIntegrations, filters]
  );

  const deleteIntegration = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await IntegrationService.deleteIntegration(id);
        await fetchIntegrations(filters); // Recarregar lista
        return result;
      } catch (err: any) {
        setError(err.message || "Erro ao deletar integração");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchIntegrations, filters]
  );

  const verifyIntegration = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await IntegrationService.verifyIntegration(id);
      return result;
    } catch (err: any) {
      setError(err.message || "Erro ao verificar integração");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback(
    (newFilters: Partial<IntegrationFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 })); // Reset para primeira página
    },
    []
  );

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const refetch = useCallback(() => {
    fetchIntegrations(filters);
  }, [fetchIntegrations, filters]);

  useEffect(() => {
    fetchIntegrations(filters);
  }, [fetchIntegrations, filters]);

  return {
    integrations,
    loading,
    error,
    filters,
    pagination,
    createUtmifyIntegration,
    createWebhookIntegration,
    updateIntegration,
    deleteIntegration,
    verifyIntegration,
    updateFilters,
    goToPage,
    refetch,
  };
};
