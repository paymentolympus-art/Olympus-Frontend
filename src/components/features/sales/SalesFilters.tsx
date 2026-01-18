import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, RefreshCw, Filter } from "lucide-react";
import type { SalesFilters as SalesFiltersType } from "@/types/sale";
import { type SaleStatus, type PaymentMethod } from "@/types/sale";

interface SalesFiltersProps {
  filters: SalesFiltersType;
  onFiltersChange: (filters: Partial<SalesFiltersType>) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const STATUS_OPTIONS: { value: SaleStatus; label: string }[] = [
  { value: "PENDING", label: "Pendente" },
  { value: "PAID", label: "Pago" },
  { value: "REFUNDED", label: "Reembolsado" },
  { value: "CANCELED", label: "Cancelado" },
  { value: "MED", label: "MED" },
];

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "PIX", label: "Pix" },
  { value: "PIX_AUTOMATIC", label: "PIX Automático" },
];

// const SUBSCRIPTION_STATUSES: { value: SubscriptionStatus; label: string }[] = [
//   { value: "RENEWAL", label: "Renovação" },
//   { value: "NEW", label: "Novo" },
// ];

export function SalesFilters({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}: SalesFiltersProps) {
  const [isUrlParamsOpen, setIsUrlParamsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (status: SaleStatus, checked: boolean) => {
    const currentStatuses = filters.statuses || [];
    if (checked) {
      onFiltersChange({
        statuses: [...currentStatuses, status],
      });
    } else {
      onFiltersChange({
        statuses: currentStatuses.filter((s) => s !== status),
      });
    }
  };

  const handlePaymentMethodChange = (
    method: PaymentMethod,
    checked: boolean
  ) => {
    const currentMethods = filters.paymentMethods || [];
    if (checked) {
      onFiltersChange({
        paymentMethods: [...currentMethods, method],
      });
    } else {
      onFiltersChange({
        paymentMethods: currentMethods.filter((m) => m !== method),
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent
        icon
        side="right"
        className="w-[90vw] sm:w-[400px] sm:max-w-md"
      >
        <SheetHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <SheetTitle>Filtros</SheetTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClearFilters();
                  setIsOpen(false);
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onApplyFilters();
                  setIsOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-0 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-2 px-4">
          {/* Data de criação */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Data de criação</label>
            <Select
              value={filters.creationDate || "ALWAYS"}
              onValueChange={(value) =>
                onFiltersChange({
                  creationDate: value === "ALWAYS" ? undefined : value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sempre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALWAYS">Sempre</SelectItem>
                <SelectItem value="TODAY">Hoje</SelectItem>
                <SelectItem value="WEEK">Esta semana</SelectItem>
                <SelectItem value="MONTH">Este mês</SelectItem>
                <SelectItem value="YEAR">Este ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Tipo</label>
            <Select
              value={filters.type || "ALL"}
              onValueChange={(value) =>
                onFiltersChange({
                  type: value === "ALL" ? undefined : (value as any),
                })
              }
            >
              <SelectTrigger className="w-full bg-[#2A2A2A] border-gray-700 text-white">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="ONE_TIME">Única</SelectItem>
                <SelectItem value="SUBSCRIPTION">Assinatura</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de oferta */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Tipo de oferta</label>
            <Select
              value={filters.offerType || "ALL"}
              onValueChange={(value) =>
                onFiltersChange({
                  offerType: value === "ALL" ? undefined : (value as any),
                })
              }
            >
              <SelectTrigger className="w-full bg-[#2A2A2A] border-gray-700 text-white">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="PRODUCT">Principal</SelectItem>
                <SelectItem value="ORDER_BUMP">Order Bump</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Parâmetros De URL */}
          <Collapsible open={isUrlParamsOpen} onOpenChange={setIsUrlParamsOpen}>
            <CollapsibleTrigger asChild className="mt-2">
              <Button
                variant="ghost"
                className="rounded-sm w-full justify-between bg-purple-600/10 border border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <span>Parâmetros De URL</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isUrlParamsOpen ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 data-[state=open]:animate-in data-[state=closed]:animate-out">
              <Input
                placeholder="UTM Source"
                value={filters.utmSource || ""}
                onChange={(e) =>
                  onFiltersChange({ utmSource: e.target.value || undefined })
                }
              />
              <Input
                placeholder="UTM Medium"
                value={filters.utmMedium || ""}
                onChange={(e) =>
                  onFiltersChange({ utmMedium: e.target.value || undefined })
                }
              />
              <Input
                placeholder="UTM Campaign"
                value={filters.utmCampaign || ""}
                onChange={(e) =>
                  onFiltersChange({ utmCampaign: e.target.value || undefined })
                }
              />
              <Input
                placeholder="UTM Content"
                value={filters.utmContent || ""}
                onChange={(e) =>
                  onFiltersChange({ utmContent: e.target.value || undefined })
                }
              />
              <Input
                placeholder="UTM Term"
                value={filters.utmTerm || ""}
                onChange={(e) =>
                  onFiltersChange({ utmTerm: e.target.value || undefined })
                }
              />
              <Input
                placeholder="SCK"
                value={filters.sck || ""}
                onChange={(e) =>
                  onFiltersChange({ sck: e.target.value || undefined })
                }
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Métodos de pagamento */}
          <div className="space-y-3">
            <label className="text-sm text-gray-400 font-medium">
              Métodos de pagamento
            </label>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <div key={method.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`payment-${method.value}`}
                    checked={filters.paymentMethods?.includes(method.value)}
                    onCheckedChange={(checked) =>
                      handlePaymentMethodChange(
                        method.value,
                        checked as boolean
                      )
                    }
                  />
                  <label
                    htmlFor={`payment-${method.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {method.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-gray-400 font-medium">Status</label>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status.value}`}
                    checked={filters.statuses?.includes(status.value)}
                    onCheckedChange={(checked) =>
                      handleStatusChange(status.value, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`status-${status.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Produtos */}
          {/* <div className="space-y-2">
            <label className="text-sm text-gray-400">Produtos</label>
            <Select
              value={filters.productId || ""}
              onValueChange={(value) =>
                onFiltersChange({
                  productId: value || undefined,
                })
              }
            >
              <SelectTrigger className="w-auto  border-gray-700 text-white">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Status */}

          {/* Situação de assinatura */}
          {/* <div className="space-y-3">
            <label className="text-sm text-gray-400 font-medium">
              Situação de assinatura
            </label>
            <div className="space-y-2">
              {SUBSCRIPTION_STATUSES.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subscription-${status.value}`}
                    checked={filters.subscriptionStatuses?.includes(
                      status.value
                    )}
                    onCheckedChange={(checked) =>
                      handleSubscriptionStatusChange(
                        status.value,
                        checked as boolean
                      )
                    }
                  />
                  <label
                    htmlFor={`subscription-${status.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
