"use client";

import * as React from "react";
import { Area, AreaChart, XAxis } from "recharts";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useDashboardChart } from "@/hooks/useDashboardMetrics";
import type { ChartPeriod } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { HiOutlineChartBar } from "react-icons/hi2";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitantes",
    color: "var(--chart-2)",
  },
  sales: {
    label: "Vendas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AreaSalesVisitors({ className }: { className?: string }) {
  const [timeRange, setTimeRange] = React.useState<ChartPeriod>("30_DAYS");

  const { chartData, isLoading } = useDashboardChart(timeRange);

  if (isLoading) {
    return (
      <div className={cn("py-0", className)}>
        <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="hidden h-10 w-[160px] sm:flex" />
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </div>
    );
  }

  const data = chartData?.chartData || [];

  return (
    <div className={cn("py-0", className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl text-primary bg-primary/10 rounded-lg p-2.5">
            <HiOutlineChartBar />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle>Vendas por visitantes</CardTitle>
            <CardDescription>
              Acompanhe as vendas por visitantes
            </CardDescription>
          </div>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as ChartPeriod)}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Últimos 30 dias" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="3_MONTHS" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30_DAYS" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7_DAYS" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="visitors"
              type="natural"
              fill="url(#fillVisitors)"
              stroke="var(--color-visitors)"
              stackId="a"
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
