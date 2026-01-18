export enum ProductStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum ProductType {
  DIGITAL = "DIGITAL",
  PHYSICAL = "PHYSICAL",
}

export enum ProductPaymentFormat {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  type: "DIGITAL" | "PHYSICAL";
  paymentFormat: "ONE_TIME" | "RECURRING";
  price: string;
  status: ProductStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  description?: string;
  type: "DIGITAL" | "PHYSICAL";
  paymentFormat: "ONE_TIME" | "RECURRING";
  price: string;
  image?: string | null;
  status: ProductStatus;
  urlBack: string;
  urlRedirect: string;
  checkout?: string;
  configCheckout?: any | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  offers: Array<{
    id: string;
    name: string;
    description?: string;
    discount: number;
    slug: string;
    price: number;
    isDefault: boolean;
    createdAt: string;
  }>;
  integrations: any[];
  domains: Array<{
    id: string;
    name: string;
    status: string;
    cnameName: string;
  }>;
  productShippingOption: any[];
  salesCount: number;
  defaultOffer: {
    id: string;
    name: string;
    description?: string;
    slug: string;
    price: string;
    isDefault: boolean;
    createdAt: string;
  };
}

export interface CreateProductData {
  name: string;
  description?: string;
  type: "DIGITAL" | "PHYSICAL";
  paymentFormat: "ONE_TIME" | "RECURRING";
  price: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  type?: "DIGITAL" | "PHYSICAL";
  paymentFormat?: "ONE_TIME" | "RECURRING";
  price?: string;
  status?: ProductStatus;
  urlBack?: string;
  urlRedirect?: string;
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  search?: string;
  status?: ProductStatus;
  type?: "DIGITAL" | "PHYSICAL";
  paymentFormat?: "ONE_TIME" | "RECURRING";
}
