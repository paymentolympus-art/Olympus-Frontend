import { useState, useMemo, Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumberToReal } from "@/lib/format";
import type { Payment, SaleStatus, SaleItemType } from "@/types/sale";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SalesTableProps {
  payments: Payment[];
  loading?: boolean;
}

const STATUS_LABELS: Record<SaleStatus, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  REFUNDED: "Reembolsado",
  REFUSED: "Recusado",
  CANCELED: "Cancelado",
  MED: "MED",
};

const STATUS_COLORS: Record<SaleStatus, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-500",
  PAID: "bg-green-500/20 text-green-500",
  REFUNDED: "bg-red-500/20 text-red-500",
  REFUSED: "bg-red-500/20 text-red-500",
  CANCELED: "bg-gray-500/20 text-gray-500",
  MED: "bg-indigo-500/20 text-indigo-500",
};

const TYPE_LABELS: Record<SaleItemType, string> = {
  PRODUCT: "Produto",
  ORDER_BUMP: "Order Bump",
  SHIPPING_OPTION: "Frete",
};

const TYPE_COLORS: Record<SaleItemType, string> = {
  PRODUCT: "bg-blue-500/10 text-blue-500",
  ORDER_BUMP: "bg-yellow-400/10 text-yellow-400",
  SHIPPING_OPTION: "bg-orange-500/10 text-orange-500",
};

export function SalesTable({ payments, loading }: SalesTableProps) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [expandedPayments, setExpandedPayments] = useState<Set<string>>(
    new Set()
  );

  // Filtrar payments por tab ativa
  const filteredPayments = useMemo(() => {
    if (activeTab === "ALL") return payments;

    const statusMap: Record<string, SaleStatus[]> = {
      APPROVED: ["PAID"],
      REFUNDED: ["REFUNDED"],
      MED: ["MED"],
    };

    const statuses = statusMap[activeTab] || [];
    return payments.filter((payment) => statuses.includes(payment.status));
  }, [payments, activeTab]);

  // Toggle expansão de um payment
  const toggleExpand = (paymentId: string) => {
    setExpandedPayments((prev) => {
      const next = new Set(prev);
      if (next.has(paymentId)) {
        next.delete(paymentId);
      } else {
        next.add(paymentId);
      }
      return next;
    });
  };

  // Calcular valor líquido total do payment
  const getTotalValueNet = (payment: Payment) => {
    return payment.sales.reduce((acc, sale) => acc + sale.valueNet, 0);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="APPROVED">Aprovadas</TabsTrigger>
          <TabsTrigger value="REFUNDED">Reembolsadas</TabsTrigger>
          <TabsTrigger value="MED">MED</TabsTrigger>
          <TabsTrigger value="ALL">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow className="transition-all duration-200">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor Líquido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">Carregando...</div>
                    </TableCell>
                  </TableRow>
                ) : filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        Nenhum registro encontrado
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => {
                    const isExpanded = expandedPayments.has(payment.id);
                    const hasSales = payment.sales.length > 0;

                    return (
                      <Fragment key={payment.id}>
                        {/* Linha principal do Payment */}
                        <TableRow
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => hasSales && toggleExpand(payment.id)}
                        >
                          <TableCell className="w-[50px]">
                            {hasSales && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpand(payment.id);
                                }}
                              >
                                <motion.div
                                  animate={{ rotate: isExpanded ? 90 : 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </motion.div>
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(payment.createdAt)}</TableCell>
                          <TableCell className="font-medium">
                            {payment.productName}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{payment.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {payment.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={STATUS_COLORS[payment.status]}
                              variant="outline"
                            >
                              {STATUS_LABELS[payment.status]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatNumberToReal(getTotalValueNet(payment))}
                          </TableCell>
                        </TableRow>

                        {/* Linhas expandidas dos Sales */}
                        <AnimatePresence initial={false}>
                          {isExpanded &&
                            payment.sales.map((sale, index) => (
                              <motion.tr
                                key={sale.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  transition: {
                                    opacity: {
                                      duration: 0.2,
                                      delay: index * 0.05,
                                    },
                                    height: { duration: 0.25, ease: "easeOut" },
                                  },
                                }}
                                exit={{
                                  opacity: 0,
                                  height: 0,
                                  transition: {
                                    opacity: { duration: 0.15 },
                                    height: { duration: 0.2, ease: "easeIn" },
                                  },
                                }}
                                className="bg-muted/30 border-l-2 border-l-primary/30 border-b overflow-hidden"
                              >
                                <TableCell></TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                  {formatDate(sale.createdAt)}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2 pl-4">
                                    <span className="text-muted-foreground">
                                      └
                                    </span>
                                    <span>{sale.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={TYPE_COLORS[sale.type]}
                                  >
                                    {TYPE_LABELS[sale.type]}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={STATUS_COLORS[sale.status]}
                                    variant="outline"
                                  >
                                    {STATUS_LABELS[sale.status]}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                  {formatNumberToReal(sale.valueNet)}
                                </TableCell>
                              </motion.tr>
                            ))}
                        </AnimatePresence>
                      </Fragment>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
