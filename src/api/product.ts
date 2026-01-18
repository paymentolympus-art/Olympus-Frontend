import api from "@/lib/axios";
import type {
  Product,
  ProductDetails,
  CreateProductData,
  UpdateProductData,
  ProductListResponse,
  ProductFilters,
} from "@/types/product";
import { getLocalSessionToken } from "@/lib/local-storage";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export class ProductService {
  static async createProduct(data: CreateProductData): Promise<Product> {
    const response = await api.post("/api/products", data);
    return response.data.data;
  }

  static async getProducts(
    filters: ProductFilters = {}
  ): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.type) params.append("type", filters.type);
    if (filters.paymentFormat)
      params.append("paymentFormat", filters.paymentFormat);

    const response = await api.get(`/api/products?${params}`);
    return response.data.data;
  }

  static async getProductById(productId: string): Promise<Product> {
    const response = await api.get(`/api/products/${productId}`);
    return response.data.data.product;
  }

  static async getProductDetailsById(
    productId: string
  ): Promise<ProductDetails> {
    const response = await api.get(`/api/products/${productId}`);
    return response.data.data.product;
  }

  static async updateProduct(
    productId: string,
    data: UpdateProductData
  ): Promise<Product> {
    const response = await api.put(`/api/products/${productId}`, data);
    return response.data.data;
  }

  static async deleteProduct(productId: string): Promise<void> {
    const response = await api.delete(`/api/products/${productId}`);
    return response.data.data;
  }

  static async uploadProductImage(
    productId: string,
    imageFile: File
  ): Promise<Product> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post(`/api/products/${productId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  }

  static async removeProductImage(productId: string): Promise<Product> {
    const response = await api.delete(`/api/products/${productId}/image`);
    return response.data.data;
  }
}
