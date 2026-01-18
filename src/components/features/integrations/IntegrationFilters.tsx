import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import type { IntegrationFilters } from "@/types/integration";

interface IntegrationFiltersProps {
  filters: IntegrationFilters;
  onFiltersChange: (filters: Partial<IntegrationFilters>) => void;
  onClearFilters: () => void;
}

export function IntegrationFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: IntegrationFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearch = () => {
    onFiltersChange({ search: searchValue });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const hasActiveFilters =
    filters.search || filters.type || filters.active !== undefined;

  return (
    <Card className="py-4 px-4">
      <CardContent className="px-0">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Buscar integrações..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-5 pr-20 w-[300px]"
                />

                <Button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2  gap-0 h-full w-[80px] rounded-sm rounded-l-none"
                >
                  Buscar
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              <Select
                value={filters.type || "ALL"}
                onValueChange={(value) =>
                  onFiltersChange({
                    type:
                      value === "ALL"
                        ? undefined
                        : (value as "UTMIFY" | "WEBHOOK"),
                  })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos os tipos</SelectItem>
                  <SelectItem value="UTMIFY">UTMify</SelectItem>
                  <SelectItem value="WEBHOOK">Webhook</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.active?.toString() || "all"}
                onValueChange={(value) => {
                  const active = value === "all" ? undefined : value === "true";
                  onFiltersChange({ active });
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="true">Ativas</SelectItem>
                  <SelectItem value="false">Inativas</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </div>

          {/* Filtros Ativos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center space-x-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">
                Filtros ativos:
              </span>

              {filters.search && (
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>Busca: {filters.search}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => onFiltersChange({ search: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.type && (
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>Tipo: {filters.type}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => onFiltersChange({ type: undefined })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.active !== undefined && (
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>Status: {filters.active ? "Ativas" : "Inativas"}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => onFiltersChange({ active: undefined })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
