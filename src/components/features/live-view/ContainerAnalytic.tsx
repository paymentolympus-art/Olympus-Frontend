import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { formatNumberToRealWithoutCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useLiveViewPeaks,
  useLiveViewSeries,
  useLiveViewSummary,
} from "@/hooks/useLiveView";
import type { LiveViewSeriesParams } from "@/types/live-view";

const chartConfig = {
  sales: {
    label: "Vendas",
    color: "#F8009D",
  },
} satisfies ChartConfig;

const timePeriods = [
  { label: "24h", value: "24h" },
  { label: "18h", value: "18h" },
  { label: "12h", value: "12h" },
  { label: "6h", value: "6h" },
  { label: "Agora", value: "agora" },
] as const;

type UIPeriod = (typeof timePeriods)[number]["value"];

export function ContainerAnalytic() {
  const [selectedPeriod, setSelectedPeriod] = useState<UIPeriod>("agora");

  const apiPeriod: LiveViewSeriesParams["period"] =
    selectedPeriod === "agora" ? "now" : selectedPeriod;

  const { data: summary, isLoading: summaryLoading } = useLiveViewSummary();

  const {
    data: series,
    isLoading: seriesLoading,
    isFetching: seriesFetching,
  } = useLiveViewSeries({ period: apiPeriod });

  const {
    data: peaks,
    isLoading: peaksLoading,
    isFetching: peaksFetching,
  } = useLiveViewPeaks();

  const chartData = useMemo(
    () =>
      series?.points.map((point) => ({
        time: point.time,
        sales: point.salesValueCents / 100,
      })) ?? [],
    [series]
  );

  const currentValue = useMemo(
    () => (series?.points.at(-1)?.salesValueCents ?? 0) / 100,
    [series]
  );

  const peakValue = useMemo(
    () => (series?.peak?.salesValueCents ?? 0) / 100,
    [series]
  );

  const peakBuckets = peaks?.buckets ?? [];
  const insights = peaks?.insights ?? [];
  const todayVsYesterday =
    insights.find((item) => item.toLowerCase().includes("vs")) ??
    insights.at(0);

  const loadingCards = summaryLoading && !summary;
  const loadingChart = seriesLoading && !series;
  const loadingPeaks = peaksLoading && !peaks;

  return (
    <aside className="w-full sm:w-5/10 border-[#1a1a1a] gap-2 sm:max-h-[calc(100vh-150px)] overflow-y-auto  scrollbar-thin scrollbar-thumb-[#F8009D] scrollbar-track-transparent sm:pr-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="gap-2">
          <CardHeader>
            <p className="text-sm text-white">Visitantes</p>
          </CardHeader>
          <CardContent>
            {loadingCards ? (
              <Skeleton className="h-7 w-16 " />
            ) : (
              <h1 className="text-2xl font-bold">{summary?.visitors ?? 0}</h1>
            )}
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <p className="text-sm text-white">Vendas</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-end gap-2">
              <span className="text-sm font-medium">R$</span>
              {loadingCards ? (
                <Skeleton className="h-7 w-24 " />
              ) : (
                <h1 className="text-2xl font-bold">
                  {formatNumberToRealWithoutCurrency(
                    (summary?.salesValueCents ?? 0) / 100
                  )}
                </h1>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <p className="text-sm text-white">Pedidos</p>
          </CardHeader>
          <CardContent>
            {loadingCards ? (
              <Skeleton className="h-7 w-16 " />
            ) : (
              <h1 className="text-2xl font-bold">{summary?.orders ?? 0}</h1>
            )}
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <p className="text-sm text-white">Pedidos Pagos</p>
          </CardHeader>
          <CardContent>
            {loadingCards ? (
              <Skeleton className="h-7 w-16 " />
            ) : (
              <h1 className="text-2xl font-bold">{summary?.paidOrders ?? 0}</h1>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Card Histórico de Vendas */}
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <h2 className="text-base font-medium text-gray-200">
            Histórico de Vendas
          </h2>
          <div className="flex items-center gap-1 rounded-md bg-pink-900/30 px-2 py-1">
            <span className="text-xs font-medium text-pink-400">
              {seriesFetching ? "Atualizando..." : "Atualizado"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Valores */}
          <div className="flex items-end gap-6">
            <div>
              {loadingChart ? (
                <Skeleton className="h-7 w-28 " />
              ) : (
                <h3 className="text-2xl font-bold text-white">
                  R$ {formatNumberToRealWithoutCurrency(currentValue)}
                </h3>
              )}
              <p className="text-xs text-gray-300">Valor atual</p>
            </div>
            <div>
              {loadingChart ? (
                <Skeleton className="h-6 w-24 " />
              ) : (
                <h3 className="text-lg font-semibold text-white">
                  R$ {formatNumberToRealWithoutCurrency(peakValue)}
                </h3>
              )}
              <p className="text-xs text-gray-300">Pico do período</p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="h-[200px] w-full">
            {loadingChart ? (
              <Skeleton className="h-full w-full rounded-md " />
            ) : (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-sales)"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-sales)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  {/* Quero uma linha horizontal */}
                  <CartesianGrid
                    vertical={false}
                    stroke="#fff"
                    className="stroke-gray-800"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value: number) =>
                      `R$ ${formatNumberToRealWithoutCurrency(value)}`
                    }
                    tick={(props) => {
                      const { x, y, payload } = props;
                      return (
                        <text
                          x={x}
                          y={y}
                          stroke="white"
                          strokeWidth={0.4}
                          textAnchor="end"
                          fontSize={12}
                        >
                          R$ {formatNumberToRealWithoutCurrency(payload.value)}
                        </text>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-sales)"
                    strokeWidth={1}
                    fill="url(#fillSales)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </div>

          {/* Seletor de Período */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            {timePeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={cn(
                  "text-xs font-medium transition-colors",
                  selectedPeriod === period.value
                    ? "text-pink-500"
                    : "text-gray-300 dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-200"
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Card Horários de Pico */}
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <h2 className="text-base font-medium text-gray-200">
            Horários de Pico
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Hoje</span>
            <div className="flex items-center gap-1 rounded-full bg-pink-500/20 px-3 py-1">
              {peaksFetching ? (
                <Skeleton className="h-4 w-24 " />
              ) : (
                <span className="text-xs font-medium text-pink-400">
                  {todayVsYesterday ?? "Sem insights"}
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Lista de Intervalos */}
          <div className="space-y-3">
            {loadingPeaks
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full  rounded-full" />
                ))
              : peakBuckets.map((period, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20 shrink-0">
                      {period.start} - {period.end}
                    </span>
                    <div className="flex-1 relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-pink-500/40 transition-all duration-300"
                        style={{ width: `${period.share}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-pink-400 w-10 text-right">
                      {period.share}%
                    </span>
                  </div>
                ))}
          </div>

          {/* Seção Insights */}
          <div className="pt-4 border-t border-gray-800">
            <h3 className="text-sm font-medium text-pink-400 mb-3">Insights</h3>
            <ul className="space-y-2">
              {loadingPeaks ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-4 w-full " />
                  </li>
                ))
              ) : insights.length === 0 ? (
                <li className="text-xs text-gray-400">
                  Sem insights no momento
                </li>
              ) : (
                insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                    <span className="text-xs text-gray-300">{insight}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
