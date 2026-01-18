import { useState, useMemo } from "react";
import { PageContainer } from "@/components/widgets/PageContainer";
import {
  SalesSummary,
  SalesFilters,
  SalesTable,
} from "@/components/features/sales";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import type {
  SalesFilters as SalesFiltersType,
  SaleQueryParams,
} from "@/types/sale";
import { SalesSearch } from "@/components/features/sales/SalesSearch";
import { useSales } from "@/hooks/useSales";
import { useDebounce } from "@/hooks/useDebounce";
import { PaginationWidget } from "@/components/widgets/Pagination";

// Função para mapear os filtros do componente para os parâmetros da API
const mapFiltersToQueryParams = (
  filters: SalesFiltersType
): SaleQueryParams => {
  const params: SaleQueryParams = {
    page: filters.page || 1,
    pageSize: filters.limit || 10,
  };

  // Mapear dateRange
  if (filters.creationDate) {
    const dateRangeMap: Record<string, SaleQueryParams["dateRange"]> = {
      TODAY: "TODAY",
      YESTERDAY: "YESTERDAY",
      WEEK: "LAST_WEEK",
      MONTH: "LAST_MONTH",
      YEAR: "ALL",
      ALWAYS: "ALL",
    };
    params.dateRange = dateRangeMap[filters.creationDate] || "ALL";
  } else {
    params.dateRange = "ALL";
  }

  // Mapear type (offerType)
  // O SalesFilters usa "PRODUCT" e "ORDER_BUMP" diretamente
  if (filters.offerType && filters.offerType !== "ALL") {
    if (filters.offerType === "PRODUCT") {
      params.type = "PRODUCT";
    } else if (filters.offerType === "ORDER_BUMP") {
      params.type = "ORDER_BUMP";
    } else {
      params.type = "ALL";
    }
  } else {
    params.type = "ALL";
  }

  // Mapear status
  // A API aceita apenas um status por vez, então pegamos o primeiro
  if (filters.statuses && filters.statuses.length > 0) {
    const status = filters.statuses[0];
    const statusMap: Record<string, SaleQueryParams["status"]> = {
      PENDING: "PENDING",
      PAID: "PAID",
      REFUNDED: "REFUNDED",
      CANCELED: "CANCELLED", // API usa CANCELLED (com LL), tipo usa CANCELED
      MED: "MED",
    };
    params.status = statusMap[status] || "ALL";
  } else {
    params.status = "ALL";
  }

  // Mapear method (paymentMethods)
  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    const hasPix = filters.paymentMethods.some(
      (m) => m === "PIX" || m === "PIX_AUTOMATIC"
    );
    params.method = hasPix ? "PIX" : "ALL";
  } else {
    params.method = "ALL";
  }

  // Mapear search
  if (filters.search) {
    params.search = filters.search;
  }

  // Mapear itemId (productId)
  if (filters.productId) {
    params.itemId = filters.productId;
  }

  // Mapear UTM params
  const utmParams: SaleQueryParams["UTM"] = {};
  if (filters.utmSource) utmParams.utmSource = filters.utmSource;
  if (filters.utmMedium) utmParams.utmMedium = filters.utmMedium;
  if (filters.utmCampaign) utmParams.utmCampaign = filters.utmCampaign;
  if (filters.utmTerm) utmParams.utmTerm = filters.utmTerm;
  if (filters.utmContent) utmParams.utmContent = filters.utmContent;

  if (Object.keys(utmParams).length > 0) {
    params.UTM = utmParams;
  }

  return params;
};

export function SalesPage() {
  const [filters, setFilters] = useState<SalesFiltersType>({
    page: 1,
    limit: 10,
  });
  const [appliedFilters, setAppliedFilters] = useState<SalesFiltersType>({
    page: 1,
    limit: 10,
  });

  // Debounce do search para evitar muitas requisições
  const debouncedSearch = useDebounce(filters.search || "", 500);

  // Mapear filtros para parâmetros da API
  const queryParams = useMemo(() => {
    return mapFiltersToQueryParams({
      ...appliedFilters,
      search: debouncedSearch || appliedFilters.search,
    });
  }, [appliedFilters, debouncedSearch]);

  // Buscar vendas usando o hook
  const { data, isLoading } = useSales(queryParams);

  const handleFiltersChange = (newFilters: Partial<SalesFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleApplyFilters = () => {
    // Resetar para página 1 ao aplicar novos filtros
    setFilters((prev) => ({ ...prev, page: 1 }));
    setAppliedFilters({ ...filters, page: 1 });
  };

  const handleClearFilters = () => {
    const clearedFilters = { page: 1, limit: 10 };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
    // Aplicar search imediatamente (já tem debounce)
    setAppliedFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    setAppliedFilters((prev) => ({ ...prev, page }));
  };

  const handleExport = (format: "CSV" | "XLSX") => {
    // Implementar exportação
    console.log(`Exportando como ${format}`);
  };

  return (
    <PageContainer title="Vendas">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Vendas</h1>
          <p className="text-muted-foreground">Acompanhe suas vendas</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2">
              <Download className="h-4 w-4" />
              Exportar
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport("CSV")}>
              Exportar como CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("XLSX")}>
              Exportar como XLSX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards de Resumo */}
      <SalesSummary
        summary={
          data?.summary || {
            totalPayments: 0,
            totalValueNet: 0,
            totalRefunded: 0,
            refundPercentage: 0,
            totalMed: 0,
            pixPercentage: 0,
          }
        }
      />

      {/* Tabela e Filtros */}
      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <SalesSearch onSearch={handleSearch} />
          <SalesFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
        <SalesTable payments={data?.payments || []} loading={isLoading} />

        {/* Paginação */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <PaginationWidget
              currentPage={appliedFilters.page || 1}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
              showBoundaries
            />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
