export interface CrossSellOffer {
  offerId: string;
  offerName: string;
  offerPrice: number;
  offerPriceFake: number;
  offerDiscount: number;
  offerSlug: string;
  displayName: string;
}

export interface OrderbumpAvailable {
  idProduct: string;
  idOffer: string;
  title: string;
  image: string;
  price: number;
}

export interface OrderbumpAvailableResponse {
  message: string;
  orderBumps: OrderbumpAvailable[];
}

export interface Orderbump {
  id: string;
  productId: string;
  offerId: string;
  name: string;
  price: number;
  priceFake: number;
  callToAction: string;
  description: string;
  status: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderbumpResponse {
  message: string;
}

export interface UpdateOrderbumpResponse {
  message: string;
  orderBump: Orderbump;
}

export interface CreateOrderbumpData {
  offerId: string;
  productId: string;
  name: string;
  callToAction: string;
  description: string;
}

export interface UpdateOrderbumpData {
  name?: string;
  price?: number;
  priceFake?: number;
  callToAction?: string;
  description?: string;
  status?: string;
}
