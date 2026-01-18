import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { DomainFilters } from "@/types/domain";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DomainFiltersProps {
  filters: DomainFilters;
  onFiltersChange: (filters: Partial<DomainFilters>) => void;
  onClearFilters: () => void;
}

export function DomainFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: DomainFiltersProps) {
  const hasActiveFilters =
    filters.search || filters.status || filters.productId;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 flex flex-row gap-4">
        <div className="flex relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar domínios..."
            value={filters.search || ""}
            onChange={(e) =>
              onFiltersChange({ search: e.target.value, page: 1 })
            }
            className="pl-10"
          />
        </div>

        <Select
          value={filters.status || "ALL"}
          onValueChange={(value) => {
            const status = value === "ALL" ? undefined : value;
            onFiltersChange({ status: status as any, page: 1 });
          }}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="ALL">Todos os status</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="VERIFIED">Verificado</SelectItem>
            <SelectItem value="ERROR">Erro</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
}
