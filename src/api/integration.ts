import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  Integration,
  UpdateIntegrationData,
  IntegrationFilters,
  IntegrationListResponse,
  IntegrationVerificationResponse,
  ProductIntegration,
  CreateUtmifyIntegrationData,
  UpdateUtmifyIntegrationData,
  CreateWebhookIntegrationData,
  UpdateWebhookIntegrationData,
  IntegrationTestResponse,
  TestUtmifyData,
  TestWebhookData,
} from "@/types/integration";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export class IntegrationService {
  // Listar integrações com filtros e paginação
  static async getIntegrations(
    filters: IntegrationFilters = {}
  ): Promise<IntegrationListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.type) params.append("type", filters.type);
    if (filters.active !== undefined)
      params.append("active", filters.active.toString());
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await api.get(`/integrations?${params.toString()}`);
    return response.data.data;
  }

  // Buscar integração por ID
  static async getIntegrationById(
    id: string
  ): Promise<{ integration: Integration }> {
    const response = await api.get(`/integrations/${id}`);
    return response.data.data;
  }

  // Atualizar integração
  static async updateIntegration(
    id: string,
    data: UpdateIntegrationData
  ): Promise<{ message: string; integration: Integration }> {
    const response = await api.put(`/integrations/${id}`, data);
    return response.data.data;
  }

  // Deletar integração
  static async deleteIntegration(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/integrations/${id}`);
    return response.data.data;
  }

  // Verificar integração
  static async verifyIntegration(
    id: string
  ): Promise<IntegrationVerificationResponse> {
    const response = await api.post(`/integrations/${id}/verify`);
    return response.data.data;
  }

  // Listar integrações por produto
  static async getIntegrationsByProduct(productId: string): Promise<{
    integrations: Integration[];
    product: { id: string; name: string; slug: string };
  }> {
    const response = await api.get(`/api/integrations/products/${productId}`);
    return response.data.data;
  }

  // Listar integrações não associadas ao produto
  static async getUnassociatedIntegrations(productId: string): Promise<{
    integrations: Integration[];
  }> {
    const response = await api.get(`/api/integrations/unassociated/${productId}`);
    return { integrations: response.data.data.unassociatedIntegrations };
  }

  // Listar produtos de uma integração
  static async getProductsByIntegration(integrationId: string): Promise<{
    products: any[];
    integration: Integration;
  }> {
    const response = await api.get(`/integrations/${integrationId}/products`);
    return response.data.data;
  }

  // Associar integração a produto
  static async associateIntegrationToProduct(
    integrationId: string,
    productId: string
  ): Promise<{
    message: string;
    productIntegration: ProductIntegration;
  }> {
    const response = await api.post("/api/integrations/associate", {
      integrationId,
      productId,
    });
    return response.data.data;
  }

  // Remover associação de integração com produto
  static async removeIntegrationFromProduct(
    integrationId: string,
    productId: string
  ): Promise<{ message: string }> {
    const response = await api.delete(
      `/api/integrations/${integrationId}/product/${productId}`
    );
    return response.data.data;
  }

  // Associar produtos em massa
  static async associateProducts(
    integrationId: string,
    productIds: string[]
  ): Promise<{
    message: string;
    integration: Integration;
  }> {
    const response = await api.post(
      `/integrations/${integrationId}/associate-products`,
      {
        productIds,
      }
    );
    return response.data.data;
  }

  // Adicionar produto individual
  static async addProductToIntegration(
    integrationId: string,
    productId: string
  ): Promise<{
    message: string;
    integration: Integration;
  }> {
    const response = await api.post(
      `/integrations/${integrationId}/add-product`,
      {
        productId,
      }
    );
    return response.data.data;
  }

  // Remover produto individual
  static async removeProductFromIntegration(
    integrationId: string,
    productId: string
  ): Promise<{
    message: string;
    integration: Integration;
  }> {
    const response = await api.delete(
      `/integrations/${integrationId}/remove-product`,
      {
        data: { productId },
      }
    );
    return response.data.data;
  }

  static async createUtmifyIntegration(
    data: CreateUtmifyIntegrationData
  ): Promise<{ integration: Integration }> {
    const response = await api.post("/integrations/utmify", data);
    return response.data;
  }

  // Atualizar integração UTMify
  static async updateUtmifyIntegration(
    id: string,
    data: UpdateUtmifyIntegrationData
  ): Promise<{ integration: Integration }> {
    const response = await api.put(`/integrations/utmify/${id}`, data);
    return response.data;
  }

  // Criar integração Webhook
  static async createWebhookIntegration(
    data: CreateWebhookIntegrationData
  ): Promise<{ integration: Integration }> {
    const response = await api.post("/integrations/webhook", data);
    return response.data;
  }

  // Atualizar integração Webhook
  static async updateWebhookIntegration(
    id: string,
    data: UpdateWebhookIntegrationData
  ): Promise<{ integration: Integration }> {
    const response = await api.put(`/integrations/webhook/${id}`, data);
    return response.data;
  }

  // Testar integração UTMify
  static async testUtmifyIntegration(
    data: TestUtmifyData
  ): Promise<IntegrationTestResponse> {
    const response = await api.post("/integrations/utmify/test", data);
    return response.data.data;
  }

  // Testar integração Webhook
  static async testWebhookIntegration(
    data: TestWebhookData
  ): Promise<IntegrationTestResponse> {
    const response = await api.post("/integrations/webhook/test", data);
    return response.data;
  }
}
