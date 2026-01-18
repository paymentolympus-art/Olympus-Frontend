import api from "@/lib/axios";
import type {
  ShippingOption,
  CreateShippingData,
  UpdateShippingData,
  ShippingFilters,
} from "@/validators/shipping";
import { getLocalSessionToken } from "@/lib/local-storage";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getShippingOptions(filters?: ShippingFilters): Promise<{
  shippingOptions: ShippingOption[];
  total: number;
  page: number;
  limit: number;
}> {
  const params = new URLSearchParams();
  if (filters?.search) params.append("search", filters.search);
  if (filters?.productId) params.append("productId", filters.productId);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const response = await api.get(`/shipping?${params}`);
  const { pagination, shippingOptions } = response.data.data;

  return {
    shippingOptions: shippingOptions,
    total: pagination.total,
    page: pagination.page,
    limit: pagination.limit,
  };
}

// Criar opção de frete
export async function createShippingOption(
  data: CreateShippingData
): Promise<ShippingOption> {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  formData.append("price", data.price.toString());
  if (data.productId) formData.append("productId", data.productId);
  if (data.image) formData.append("image", data.image);

  const response = await api.post("/shipping", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.shippingOption;
}

// Atualizar opção de frete
export async function updateShippingOption(
  id: string,
  data: UpdateShippingData
): Promise<ShippingOption> {
  const response = await api.put(`/shipping/${id}`, data);
  return response.data.data.shippingOption;
}

// Deletar opção de frete
export async function deleteShippingOption(id: string): Promise<void> {
  await api.delete(`/shipping/${id}`);
}

// Upload de imagem isolado
export async function uploadImage(
  id: string,
  image: File
): Promise<ShippingOption> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await api.post(`/shipping/${id}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.shippingOption;
}

// Remover imagem
export async function removeImage(id: string): Promise<void> {
  return await api.delete(`/shipping/${id}/image`);
}

// Buscar por produto
export async function getShippingOptionsByProduct(
  productId: string
): Promise<ShippingOption[]> {
  const response = await api.get(`/shipping/product/${productId}`);
  return response.data.data.shippingOptions;
}

// Listar produtos associados a um frete
export async function getShippingProducts(
  shippingId: string
): Promise<{ products: any[] }> {
  const response = await api.get(`/shipping/${shippingId}/products`);
  return response.data.data;
}

// Associar produto a um frete
export async function associateProductToShipping(
  shippingId: string,
  productId: string
): Promise<ShippingOption> {
  const response = await api.post(
    `/shipping/${shippingId}/product/${productId}`
  );
  return response.data.data.shippingOption;
}

// Desassociar produto de um frete
export async function disassociateProductFromShipping(
  shippingId: string,
  productId: string
): Promise<ShippingOption> {
  const response = await api.delete(
    `/shipping/${shippingId}/product/${productId}`
  );
  return response.data.data.shippingOption;
}
