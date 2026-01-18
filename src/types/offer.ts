export interface Offer {
  id: string;
  name: string;
  description?: string;
  slug: string;
  price: number;
  priceFake?: number;
  discount: number;
  isDefault: boolean;
  productId: string;
  createdAt: string;
  updateAt?: string;
}

export interface CreateOfferData {
  name: string;
  description?: string;
  price: number;
  priceFake: number;
  discount: number;
  productId: string;
}

export interface UpdateOfferData {
  name?: string;
  description?: string;
  price?: number;
  priceFake?: number;
  discount?: number;
}

export interface OfferListResponse {
  offers: Offer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
