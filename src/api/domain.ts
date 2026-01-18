import api from "@/lib/axios";
import type {
  Domain,
  DomainFormData,
  DomainFilters,
  DomainListResponse,
  DomainVerificationResponse,
} from "@/types/domain";

import { getLocalSessionToken } from "@/lib/local-storage";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class DomainService {
  // Listar domínios com filtros e paginação
  static async getDomains(
    filters: DomainFilters = {}
  ): Promise<DomainListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.productId) params.append("productId", filters.productId);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await api.get(`/api/domains?${params.toString()}`);
    return response.data.data;
  }

  // Buscar domínio por ID
  static async getDomainById(id: string): Promise<{ domain: Domain }> {
    const response = await api.get(`/api/domains/${id}`);
    return response.data.data;
  }

  // Criar domínio
  static async createDomain(
    data: DomainFormData
  ): Promise<{ message: string; domain: Domain }> {
    const response = await api.post("/api/domains", data);
    return response.data.data;
  }

  // Atualizar domínio
  static async updateDomain(
    id: string,
    data: Partial<DomainFormData>
  ): Promise<{ message: string; domain: Domain }> {
    const response = await api.put(`/api/domains/${id}`, data);
    return response.data.data;
  }

  // Deletar domínio
  static async deleteDomain(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/api/domains/${id}`);
    return response.data.data;
  }

  // Verificar domínio
  static async verifyDomain(id: string): Promise<DomainVerificationResponse> {
    const response = await api.post(`/api/domains/${id}/verify`);
    return response.data.data;
  }

  // Listar domínios por produto
  static async getDomainsByProduct(productId: string): Promise<{
    domains: Domain[];
    product: { id: string; name: string; slug: string };
  }> {
    const response = await api.get(`/api/domains/product/${productId}`);
    return response.data.data;
  }

  // Associar produtos em massa
  static async associateProducts(
    domainId: string,
    productIds: string[]
  ): Promise<{
    message: string;
    domain: Domain;
  }> {
    const response = await api.post(`/api/domains/${domainId}/associate-products`, {
      productIds,
    });
    return response.data.data;
  }

  // Adicionar produto individual
  static async addProductToDomain(
    domainId: string,
    productId: string
  ): Promise<{
    message: string;
    domain: Domain;
  }> {
    const response = await api.post(`/api/domains/${domainId}/add-product`, {
      productId,
    });
    return response.data.data;
  }

  // Remover produto individual
  static async removeProductFromDomain(
    domainId: string,
    productId: string
  ): Promise<{
    message: string;
    domain: Domain;
  }> {
    // Usar query param para DELETE (padrão HTTP)
    const response = await api.delete(`/api/domains/${domainId}/remove-product?productId=${productId}`);
    return response.data.data;
  }
}
