import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  OrderbumpAvailableResponse,
  CreateOrderbumpResponse,
  Orderbump,
  CreateOrderbumpData,
  UpdateOrderbumpData,
} from "@/types/orderbump";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class OrderbumpService {
  static async getOrderbumpAvailable(
    productId: string
  ): Promise<OrderbumpAvailableResponse> {
    try {
      const response = await api.get(`/api/products/${productId}/order-bumps`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  static async createOrderbump(
    data: CreateOrderbumpData
  ): Promise<CreateOrderbumpResponse> {
    const response = await api.post(`/api/orderbumps`, data);
    return response.data.data;
  }

  static async getOrderbumps(productId: string): Promise<Orderbump[]> {
    try {
      const response = await api.get(`/api/orderbumps/product/${productId}`);
      return response.data.data.orderBumps || [];
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderbump(
    orderbumpId: string,
    data: UpdateOrderbumpData
  ): Promise<Orderbump> {
    const response = await api.put(`/api/orderbumps/${orderbumpId}`, data);
    return response.data.data;
  }

  static async deleteOrderbump(orderbumpId: string): Promise<void> {
    const response = await api.delete(`/api/orderbumps/${orderbumpId}`);
    return response.data.data;
  }

  static async uploadOrderbumpImage(
    orderbumpId: string,
    imageFile: File
  ): Promise<Orderbump> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post(
      `/api/orderbumps/${orderbumpId}/image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  }

  static async removeOrderbumpImage(orderbumpId: string): Promise<void> {
    const response = await api.delete(`/api/orderbumps/${orderbumpId}/image`);
    return response.data.data;
  }
}
