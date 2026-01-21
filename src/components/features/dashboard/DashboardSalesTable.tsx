import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumberToReal } from "@/lib/format";
import type { Payment, SaleStatus } from "@/types/sale";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardSalesTableProps {
  payments: Payment[];
  loading?: boolean;
}

const STATUS_LABELS: Record<SaleStatus, string> = {
  PENDING: "Pendente",
  PAID: "Concluído",
  REFUNDED: "Reembolsado",
  REFUSED: "Recusado",
  CANCELED: "Cancelado",
  MED: "MED",
};

const STATUS_COLORS: Record<SaleStatus, { bg: string; text: string; dot: string }> = {
  PENDING: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-500",
    dot: "bg-yellow-500",
  },
  PAID: {
    bg: "bg-green-500/20",
    text: "text-green-500",
    dot: "bg-green-500",
  },
  REFUNDED: {
    bg: "bg-red-500/20",
    text: "text-red-500",
    dot: "bg-red-500",
  },
  REFUSED: {
    bg: "bg-red-500/20",
    text: "text-red-500",
    dot: "bg-red-500",
  },
  CANCELED: {
    bg: "bg-gray-500/20",
    text: "text-gray-500",
    dot: "bg-gray-500",
  },
  MED: {
    bg: "bg-indigo-500/20",
    text: "text-indigo-500",
    dot: "bg-indigo-500",
  },
};

export function DashboardSalesTable({
  payments,
  loading,
}: DashboardSalesTableProps) {
  // Calcular valor líquido total do payment (comissão)
  const getTotalValueNet = (payment: Payment) => {
    return payment.sales.reduce((acc, sale) => acc + sale.valueNet, 0);
  };

  // Calcular valor bruto total do payment
  const getTotalValue = (payment: Payment) => {
    return payment.sales.reduce((acc, sale) => acc + sale.value, 0);
  };

  // Formatar ID para exibição (primeiros 8 caracteres)
  const formatId = (id: string) => {
    return id.slice(0, 8) + "...";
  };

  // Formatar data com hora (formato: YY/MM/DD, HH:MM)
  const formatDateWithTime = (date: string | Date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day}, ${hours}:${minutes}`;
  };

  return (
    <Card className="p-4 mt-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Vendas</h2>
        <p className="text-sm text-muted-foreground">
          Histórico das últimas vendas
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">VALOR</TableHead>
              <TableHead className="text-muted-foreground">
                SUA COMISSÃO
              </TableHead>
              <TableHead className="text-muted-foreground">MÉTODO</TableHead>
              <TableHead className="text-muted-foreground">STATUS</TableHead>
              <TableHead className="text-muted-foreground">DATA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
              ))
            ) : payments.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-muted-foreground text-sm">
                      Nenhuma venda foi encontrada
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Quando você tiver vendas, elas aparecerão aqui
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Sales data
              payments.map((payment) => {
                const statusConfig = STATUS_COLORS[payment.status];
                const totalValue = getTotalValue(payment);
                const totalValueNet = getTotalValueNet(payment);

                return (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatId(payment.id)}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {formatNumberToReal(totalValue)}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {formatNumberToReal(totalValueNet)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      PIX
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${statusConfig.bg} ${statusConfig.text} border-0`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-2 inline-block`}
                        />
                        {STATUS_LABELS[payment.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDateWithTime(payment.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

