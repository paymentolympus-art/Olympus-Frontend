// ==========================================
// TIPOS PARA MÉTRICAS DO DASHBOARD
// ==========================================

export interface MetricsBalance {
  available: number;
  pending: number;
}

export interface UserMetrics {
  balance: MetricsBalance;
  averageTicket: number;
  activeVisits: number;
  pixSalesPercentage: number;
  salesPerVisitor: number;
}

// ==========================================
// TIPOS PARA GRÁFICO DE VENDAS/VISITANTES
// ==========================================

export type ChartPeriod = "7_DAYS" | "30_DAYS" | "3_MONTHS";

export interface ChartDataPoint {
  date: string;
  sales: number;
  visitors: number;
}

export interface SalesVisitsChart {
  chartData: ChartDataPoint[];
  period: ChartPeriod;
  days: number;
  startDate: string;
  endDate: string;
}
