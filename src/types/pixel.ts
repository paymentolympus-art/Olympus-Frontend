export enum PixelType {
  FACEBOOK_ADS = "FACEBOOK_ADS",
  GOOGLE_ADS = "GOOGLE_ADS",
  TIKTOK_ADS = "TIKTOK_ADS",
}

export interface PixelActions {
  initiateCheckout: boolean;
  purchase: boolean;
}

export interface PixelConditionalActions {
  pixGenerate: boolean;
  purchase: boolean;
}

export interface BasePixel {
  id: string;
  name: string;
  type: PixelType;
  idPixel: string;
  ambientAction: PixelActions;
  conditionalAction: PixelConditionalActions;
  createdAt: string;
  updatedAt: string;
}

export interface FacebookPixel extends BasePixel {
  type: PixelType.FACEBOOK_ADS;
  tokenConversion: string;
}

export interface GooglePixel extends BasePixel {
  type: PixelType.GOOGLE_ADS;
  labelConversion: string;
}

export interface TikTokPixel extends BasePixel {
  type: PixelType.TIKTOK_ADS;
  tokenConversion: string;
}

export type Pixel = FacebookPixel | GooglePixel | TikTokPixel;

export interface CreateFacebookPixelData {
  name: string;
  idPixel: string;
  tokenConversion: string;
  ambientAction: PixelActions;
  conditionalAction: PixelConditionalActions;
}

export interface CreateGooglePixelData {
  name: string;
  idPixel: string;
  labelConversion: string;
  ambientAction: PixelActions;
  conditionalAction: PixelConditionalActions;
}

export interface CreateTikTokPixelData {
  name: string;
  idPixel: string;
  tokenConversion: string;
  ambientAction: PixelActions;
  conditionalAction: PixelConditionalActions;
}

export interface UpdatePixelData {
  name?: string;
  idPixel?: string;
  tokenConversion?: string;
  ambientAction?: Partial<PixelActions>;
  conditionalAction?: Partial<PixelConditionalActions>;
}

export interface PixelListResponse {
  pixels: {
    FACEBOOK_ADS: FacebookPixel[];
    GOOGLE_ADS: GooglePixel[];
    TIKTOK_ADS: TikTokPixel[];
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
