import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  Offer,
  CreateOfferData,
  UpdateOfferData,
  OfferListResponse,
} from "@/types/offer";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class OfferService {
  static async createOffer(data: CreateOfferData): Promise<Offer> {
    const response = await api.post("/api/offers", data);
    return response.data.data.offer;
  }

  static async createDefaultOffer(productId: string): Promise<Offer> {
    const response = await api.post(`/api/offers/default/${productId}`);
    return response.data.data.offer;
  }

  static async getOffersByProduct(
    productId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<OfferListResponse> {
    const response = await api.get(
      `/api/offers/product/${productId}?page=${page}&limit=${limit}`
    );
    return response.data.data;
  }

  static async getOfferById(offerId: string): Promise<Offer> {
    const response = await api.get(`/api/offers/${offerId}`);
    return response.data.data.offer;
  }

  static async updateOffer(
    offerId: string,
    data: UpdateOfferData
  ): Promise<Offer> {
    const response = await api.put(`/api/offers/${offerId}`, data);
    return response.data.data.offer;
  }

  static async setDefaultOffer(offerId: string): Promise<Offer> {
    const response = await api.patch(`/api/offers/${offerId}/default`);
    return response.data.data.offer;
  }

  static async deleteOffer(offerId: string): Promise<void> {
    await api.delete(`/api/offers/${offerId}`);
  }
}
