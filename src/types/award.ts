export interface Award {
  id: string;
  title: string;
  icon: string;
  description: string;
  order: number;
  image: string | null;
  minValue: number;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AwardsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AwardsListResponse {
  awards: Award[];
  pagination: AwardsPagination;
}

export interface AwardsApiResponse {
  success: boolean;
  data: AwardsListResponse;
  timestamp: string;
}

export interface AwardsFilters {
  limit?: number;
  page?: number;
}
