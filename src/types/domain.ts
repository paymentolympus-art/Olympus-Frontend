export interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  cnames?: any;
  cnameType?: string;
  cnameName?: string;
  cnameValue?: string;
  createdAt: string;
  updatedAt?: string;
  userId: string;
  productDomain: ProductDomain[];
}

export type DomainStatus = "PENDING" | "VERIFIED" | "ERROR";

export interface ProductDomain {
  id: string;
  productId: string;
  domainId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface DomainFilters {
  search?: string;
  status?: DomainStatus;
  productId?: string;
  page?: number;
  limit?: number;
}

export interface DomainFormData {
  name: string;
  cnameType?: string;
  cnameName?: string;
  cnameValue?: string;
  productIds?: string[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage?: number;
  previousPage?: number;
}

export interface DomainListResponse {
  message: string;
  domains: Domain[];
  pagination: PaginationInfo;
}

export interface DomainVerificationResponse {
  message: string;
  dns?: any;
  isConfigured: boolean;
}
