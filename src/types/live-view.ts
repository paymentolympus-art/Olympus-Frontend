export type LiveViewVisitParams = {
  since?: string;
  limit?: number;
};

export type LiveViewVisit = {
  latitude: number;
  longitude: number;
  label?: string;
  color?: string;
  count: number;
  lastAccessAt: string;
};

export type LiveViewVisitsResponse = {
  data: LiveViewVisit[];
  meta?: {
    window?: { since: string; until: string };
  };
};

export type LiveViewSummary = {
  visitors: number;
  salesValueCents: number;
  orders: number;
  paidOrders: number;
  updatedAt: string;
};

export type LiveViewSeriesParams = {
  period?: "24h" | "18h" | "12h" | "6h" | "now";
  interval?: string;
};

export type LiveViewSeriesPoint = {
  time: string;
  salesValueCents: number;
};

export type LiveViewSeriesResponse = {
  period: Required<LiveViewSeriesParams["period"]>;
  interval: string;
  points: LiveViewSeriesPoint[];
  peak?: {
    time: string;
    salesValueCents: number;
  };
};

export type LiveViewPeakBucket = {
  start: string;
  end: string;
  share: number;
};

export type LiveViewPeaksResponse = {
  buckets: LiveViewPeakBucket[];
  insights: string[];
  updatedAt?: string;
};
