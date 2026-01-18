import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Withdrawal } from "@/types/withdrawal";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface WithdrawalTableProps {
  withdrawals: Withdrawal[];
  isLoading?: boolean;
}

const statusConfig = {
  PENDING: { label: "Pendente", variant: "tertiary" as const },
  TRANSFERRED: { label: "Transferido", variant: "tertiary" as const },
  CANCELLED: { label: "Cancelado", variant: "destructive" as const },
};

export function WithdrawalTable({
  withdrawals,
  isLoading,
}: WithdrawalTableProps) {
  if (isLoading) {
    return (
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor Recebido</TableHead>
              <TableHead>Taxa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  if (withdrawals.length === 0) {
    return (
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor Recebido</TableHead>
              <TableHead>Taxa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum registro encontrado
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor Recebido</TableHead>
            <TableHead>Taxa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => {
            const status = statusConfig[withdrawal.statusWithdrawal];
            return (
              <TableRow key={withdrawal.id}>
                <TableCell className="font-mono text-xs">
                  {withdrawal.id.slice(0, 8)}...
                </TableCell>
                <TableCell>{formatDate(withdrawal.createdAt)}</TableCell>
                <TableCell>{formatCurrency(withdrawal.valueNet)}</TableCell>
                <TableCell>
                  {formatCurrency(withdrawal.withdrawalTax)}
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>{withdrawal.typeWithdrawal}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
