export type SaleStatus =
  | "PENDING"
  | "PAID"
  | "REFUNDED"
  | "REFUSED"
  | "CANCELED"
  | "MED";

export type PaymentMethod = "PIX" | "PIX_AUTOMATIC";

export type SubscriptionStatus = "RENEWAL" | "NEW";

export type SaleType = "ONE_TIME" | "SUBSCRIPTION";

export type OfferType =
  | "ALL"
  | "STANDARD"
  | "SPECIAL"
  | "PRODUCT"
  | "ORDER_BUMP";

export type QueryStatus =
  | "ALL"
  | "PENDING"
  | "PAID"
  | "REFUNDED"
  | "CANCELLED"
  | "MED";
export type QueryType = "ALL" | "ORDER_BUMP" | "PRODUCT";
export type DateRange =
  | "TODAY"
  | "YESTERDAY"
  | "LAST_WEEK"
  | "LAST_MONTH"
  | "ALL";
export type PaymentMethodQuery = "PIX" | "ALL";

export interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface SaleQueryParams {
  page?: number;
  pageSize?: number;
  status?: QueryStatus;
  type?: QueryType;
  search?: string;
  dateRange?: DateRange;
  itemId?: string;
  method?: PaymentMethodQuery;
  UTM?: UTMParams;
}

// Tipos para a estrutura real da API
export type SaleItemType = "ORDER_BUMP" | "PRODUCT" | "SHIPPING_OPTION";

export interface SaleItem {
  id: string;
  name: string;
  status: SaleStatus;
  type: SaleItemType;
  value: number;
  valueNet: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  txid: string;
  name: string;
  email: string;
  status: SaleStatus;
  productName: string;
  createdAt: string;
  sales: SaleItem[];
}

// Mantido para compatibilidade com componentes existentes
export interface Sale {
  id: string;
  date: string;
  product: {
    id: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
    email?: string;
  };
  status: SaleStatus;
  netValue: number;
  paymentMethod: PaymentMethod;
  subscriptionStatus?: SubscriptionStatus;
}

export interface SalesSummary {
  totalPayments: number;
  totalValueNet: number;
  totalRefunded: number;
  refundPercentage: number;
  pixPercentage: number;
  totalMed: number;
}

export interface SalesFilters {
  creationDate?: string;
  type?: SaleType;
  offerType?: OfferType;
  productId?: string;
  affiliateId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  sck?: string;
  paymentMethods?: PaymentMethod[];
  statuses?: SaleStatus[];
  subscriptionStatuses?: SubscriptionStatus[];
  search?: string;
  page?: number;
  limit?: number;
}

export interface SalesPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SalesResponse {
  summary: SalesSummary;
  payments: Payment[];
  pagination: SalesPagination;
}
