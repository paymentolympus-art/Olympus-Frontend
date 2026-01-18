import api from "@/lib/axios";
import type {
  FacebookPixel,
  GooglePixel,
  TikTokPixel,
  CreateFacebookPixelData,
  CreateGooglePixelData,
  CreateTikTokPixelData,
  UpdatePixelData,
  PixelListResponse,
} from "@/types/pixel";
import { getLocalSessionToken } from "@/lib/local-storage";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export class PixelService {
  static async getPixels(productId: string): Promise<PixelListResponse> {
    const response = await api.get(`/pixels/${productId}`);
    return response.data.data;
  }

  static async createFacebookPixel(
    productId: string,
    data: CreateFacebookPixelData
  ): Promise<FacebookPixel> {
    const response = await api.post(`/pixels/${productId}/facebook`, data);
    return response.data.data;
  }

  static async createGooglePixel(
    productId: string,
    data: CreateGooglePixelData
  ): Promise<GooglePixel> {
    const response = await api.post(`/pixels/${productId}/google`, data);
    return response.data.data;
  }

  static async createTikTokPixel(
    productId: string,
    data: CreateTikTokPixelData
  ): Promise<TikTokPixel> {
    const response = await api.post(`/pixels/${productId}/tiktok`, data);
    return response.data.data;
  }

  static async updateFacebookPixel(
    productId: string,
    pixelId: string,
    data: UpdatePixelData
  ): Promise<FacebookPixel> {
    const response = await api.put(
      `/pixels/${productId}/facebook/${pixelId}`,
      data
    );
    return response.data.data;
  }

  static async updateGooglePixel(
    productId: string,
    pixelId: string,
    data: UpdatePixelData
  ): Promise<GooglePixel> {
    const response = await api.put(
      `/pixels/${productId}/google/${pixelId}`,
      data
    );
    return response.data.data;
  }

  static async updateTikTokPixel(
    productId: string,
    pixelId: string,
    data: UpdatePixelData
  ): Promise<TikTokPixel> {
    const response = await api.put(
      `/pixels/${productId}/tiktok/${pixelId}`,
      data
    );
    return response.data.data;
  }

  static async deletePixel(productId: string, pixelId: string): Promise<void> {
    const response = await api.delete(`/pixels/${productId}/${pixelId}`);
    return response.data.data;
  }
}
