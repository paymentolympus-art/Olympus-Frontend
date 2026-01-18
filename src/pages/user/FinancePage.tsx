import { useState, useEffect } from "react";
import { PageContainer } from "@/components/widgets/PageContainer";
import { BalanceCards } from "@/components/features/finance/BalanceCards";
import { WithdrawalTable } from "@/components/features/finance/WithdrawalTable";
import { WithdrawalModal } from "@/components/features/finance/WithdrawalModal";
import { PixKeyManagement } from "@/components/features/finance/PixKeyManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useWithdrawals } from "@/hooks/useWithdrawal";
import { usePagination } from "@/hooks/usePagination";
import { useAuth } from "@/hooks/useAuth";
import { PaginationWidget } from "@/components/widgets/Pagination";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PRIVATE } from "@/constants/routes";

export function FinancePage() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("extrato");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { pagination, setCurrentPage, setListSize } = usePagination({
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      listSize: 0,
    },
  });

  const {
    withdrawals,
    pagination: withdrawalsPagination,
    isLoading: isLoadingWithdrawals,
  } = useWithdrawals(pagination.currentPage, pagination.itemsPerPage);

  // Atualizar tamanho da lista quando dados mudarem
  useEffect(() => {
    if (withdrawalsPagination) {
      setListSize(withdrawalsPagination.total);
    }
  }, [withdrawalsPagination, setListSize]);

  return (
    <PageContainer title="Financeiro">
      {/* Cards de Saldo */}
      <div className="flex flex-col gap-4">
        <BalanceCards />
        <div className="w-full flex justify-end">
          <Button
            onClick={() => setIsWithdrawalModalOpen(true)}
            className="w-full md:w-auto"
          >
            Efetuar Saque
          </Button>
        </div>
      </div>

      {["PENDING", "REJECTED", "NOT_SEND"].includes(user?.status || "") && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-md bg-orange-500/10 border border-orange-500/20">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-orange-200">
              Você precisa verificar sua identidade antes de alterar os dados
              bancários
            </p>
          </div>
          <Button
            onClick={() => navigate(ROUTES_PRIVATE.MY_ACCOUNT)}
            variant="outline"
            className="w-full md:w-auto"
          >
            Verificar Identidade
          </Button>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
          <TabsTrigger value="dados-bancarios">Chaves PIXs</TabsTrigger>
        </TabsList>

        {/* Tab Extrato */}
        <TabsContent value="extrato" className="space-y-4 mt-6">
          <WithdrawalTable
            withdrawals={withdrawals}
            isLoading={isLoadingWithdrawals}
          />

          {/* Paginação */}
          {withdrawalsPagination && withdrawalsPagination.totalPages > 1 && (
            <div className="flex justify-center">
              <PaginationWidget
                currentPage={pagination.currentPage}
                totalPages={withdrawalsPagination.totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={5}
                showBoundaries={true}
              />
            </div>
          )}
        </TabsContent>

        {/* Tab Dados Bancários */}
        <TabsContent value="dados-bancarios" className="space-y-4 mt-6">
          <PixKeyManagement />
        </TabsContent>
      </Tabs>

      {/* Modal de Saque */}
      <WithdrawalModal
        open={isWithdrawalModalOpen}
        onOpenChange={setIsWithdrawalModalOpen}
      />
    </PageContainer>
  );
}
