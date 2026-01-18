import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  CheckoutApiResponse,
  CheckoutThemeType,
} from "@checkout-layout/types/checkout";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Tipos de asset suportados pelo backend (snake_case)
 */
export type AssetTypeBackend =
  | "banner_desktop"
  | "banner_mobile"
  | "logo"
  | "favicon";

/**
 * Tipos de asset usados internamente no frontend (camelCase)
 */
export type AssetType = "BANNER_MOBILE" | "BANNER_DESKTOP" | "LOGO" | "FAVICON";

/**
 * Resposta do upload de asset
 */
export interface AssetUploadResponse {
  message: string;
  data: {
    assetType: AssetTypeBackend;
    url: string;
    specs: {
      maxWidth: number;
      maxHeight: number;
      maxSize: number;
      acceptedTypes: string[];
    };
    theme?: {
      theme: string;
      steps: string;
      font: string;
      radius: string;
      image_url: string;
    };
  };
}

/**
 * Resposta da remoção de asset
 */
export interface AssetRemoveResponse {
  message: string;
  data: {
    assetType: AssetTypeBackend;
    removed: boolean;
  };
}

export const isBase64Image = (value: string): boolean => {
  return value.startsWith("data:image/");
};

/**
 * Converte a chave do objeto defaultImages para o tipo AssetType interno
 */
export const getAssetTypeFromKey = (key: string): AssetType => {
  const mapping: Record<string, AssetType> = {
    logo: "LOGO",
    favicon: "FAVICON",
    bannerMobile: "BANNER_MOBILE",
    bannerDesktop: "BANNER_DESKTOP",
  };

  return mapping[key] || "LOGO";
};

/**
 * Converte o tipo AssetType interno para o formato esperado pelo backend (snake_case)
 */
export const convertAssetTypeToBackend = (
  assetType: AssetType
): AssetTypeBackend => {
  const mapping: Record<AssetType, AssetTypeBackend> = {
    LOGO: "logo",
    FAVICON: "favicon",
    BANNER_MOBILE: "banner_mobile",
    BANNER_DESKTOP: "banner_desktop",
  };

  return mapping[assetType];
};

export class CheckoutService {
  /**
   * Busca dados completos do checkout (produto + tema)
   */
  static async getCheckoutBuilder(
    productId: string
  ): Promise<CheckoutApiResponse> {
    const response = await api.get(`/theme/settings/${productId}`);
    const { data } = response.data.data;
    return data;
  }

  /**
   * Atualiza o tema do checkout
   */
  static async updateCheckoutTheme(
    productId: string,
    theme: Omit<CheckoutThemeType, "socialProofs" | "defaultImages">
  ): Promise<CheckoutThemeType> {
    const response = await api.put(`/theme/${productId}/theme`, theme);
    return response.data.data;
  }

  /**
   * Faz upload de um asset de imagem do tema
   * @param productId ID do produto
   * @param assetType Tipo do asset (formato interno)
   * @param file Arquivo de imagem
   * @returns Resposta com URL do asset enviado
   */
  static async uploadAsset(
    productId: string,
    assetType: AssetType,
    file: File
  ): Promise<AssetUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    // Converte o tipo para o formato esperado pelo backend (snake_case)
    const backendAssetType = convertAssetTypeToBackend(assetType);

    const response = await api.post(
      `/theme/${productId}/assets/${backendAssetType}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // Segue o padrão da API: response.data contém { message, data }
    return response.data;
  }

  /**
   * Remove um asset de imagem do tema
   * @param productId ID do produto
   * @param assetType Tipo do asset (formato interno)
   * @returns Resposta confirmando a remoção
   */
  static async removeAsset(
    productId: string,
    assetType: AssetType
  ): Promise<AssetRemoveResponse> {
    // Converte o tipo para o formato esperado pelo backend (snake_case)
    const backendAssetType = convertAssetTypeToBackend(assetType);

    const response = await api.delete(
      `/theme/${productId}/assets/${backendAssetType}`
    );
    // Segue o padrão da API: response.data contém { message, data }
    return response.data;
  }
}
