import { PageContainer } from "@/components/widgets/PageContainer";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import {
  HiCheck,
  HiOutlineArrowTrendingUp,
  HiOutlineEye,
  HiOutlineFire,
} from "react-icons/hi2";

import { AreaSalesVisitors } from "@features/dashboard/AreaSalesVisitors";
import { formatNumberToReal } from "@/lib/format";
import { FaMoneyBillWave } from "react-icons/fa";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserAwards } from "@/hooks/useUserAwards";

export function DashboardPage() {
  const { user } = useAuth();
  const { metrics, isLoading: isLoadingMetrics } = useDashboardMetrics();
  const { awardsData, isLoading: isLoadingAwards } = useUserAwards();

  return (
    <PageContainer title="Resumo" className="py-4">
      <div className="flex flex-col w-full pb-4">
        <p className="text-gray-300 text-sm">
          Seja bem-vindo,
          <span className="font-bold bg-gradient-to-b from-purple-500 to-pink-500 text-transparent bg-clip-text">
            {" "}
            {user?.name}
          </span>
        </p>
      </div>
      {/* Banner com propaganda */}
      <Card className="w-full p-0">
        <img
          src="/icons/banner.jpg"
          alt="Dashboard"
          className="w-full h-[150px] sm:h-[250px] rounded-lg object-cover"
        />
      </Card>

      {/* Card com informações */}
      <div className="flex flex-col sm:flex-row w-full h-auto gap-4 pt-4 pb-2">
        <Card className="w-full h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-purple-400" />
          <div className="flex flex-row items-center gap-3 px-4">
            <aside className="p-2.5 bg-emerald-500/15 rounded-lg">
              <HiCheck className="w-4 h-4 text-emerald-400" />
            </aside>
            <div className="flex flex-col flex-1">
              <p className="text-xs text-description font-semibold">
                Liquidado
              </p>
              {isLoadingMetrics ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <p className="text-lg sm:text-xl font-bold text-white">
                  {formatNumberToReal(metrics?.balance.available ?? 0)}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="w-full h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-purple-400" />
          <div className="flex flex-row items-center gap-3 px-4">
            <aside className="p-2.5 bg-yellow-500/15 rounded-lg">
              <HiOutlineArrowTrendingUp className="w-4 h-4 text-yellow-500" />
            </aside>
            <div className="flex flex-col flex-1">
              <p className="text-xs text-description font-semibold">Pendente</p>
              {isLoadingMetrics ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <p className="text-lg sm:text-xl font-bold text-white">
                  {formatNumberToReal(metrics?.balance.pending ?? 0)}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="w-full h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-purple-400" />
          <div className="flex flex-row items-center gap-3 px-4">
            <aside className="p-2.5 bg-cyan-500/15 rounded-lg">
              <FaMoneyBillWave className="w-4 h-4 text-cyan-500" />
            </aside>
            <div className="flex flex-col flex-1">
              <p className="text-xs text-description font-semibold">
                Ticket médio
              </p>
              {isLoadingMetrics ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <p className="text-lg sm:text-xl font-bold text-white">
                  {formatNumberToReal(metrics?.averageTicket ?? 0)}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="w-full h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-purple-400" />
          <div className="flex flex-row items-center gap-3 px-4">
            <aside className="p-2.5 bg-purple-500/15 rounded-lg">
              <HiOutlineEye className="w-4 h-4 text-purple-300" />
            </aside>
            <div className="flex flex-col flex-1">
              <p className="text-xs text-description font-semibold">
                Visitas ativas
              </p>
              {isLoadingMetrics ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <p className="text-lg sm:text-xl font-bold text-white">
                  {metrics?.activeVisits ?? 0}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="w-full h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-purple-400" />
          <div className="flex flex-row items-center gap-3 px-4">
            <aside className="p-2.5 bg-rose-500/15 rounded-lg">
              <HiOutlineFire className="w-4 h-4 text-rose-500" />
            </aside>
            <div className="flex flex-col flex-1">
              <p className="text-xs text-description font-semibold">PIX</p>
              {isLoadingMetrics ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <p className="text-lg sm:text-xl font-bold text-white">
                  {metrics?.pixSalesPercentage?.toFixed(1) ?? 0}%
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Card com gráfico */}
      <aside className="flex flex-col sm:flex-row w-full gap-4 sm:h-[450px]">
        <Card className="flex-2/3 w-full h-full">
          <AreaSalesVisitors className="w-full h-full" />
        </Card>
        <Card className="flex-1/3 h-full">
          <div className="flex flex-col gap-4">
            <header className="flex flex-col justify-center items-center">
              <span className="text-sm text-description font-semibold">
                Sua próxima premiação {user?.name.split(" ")[0]}
              </span>
              {isLoadingAwards ? (
                <Skeleton className="h-7 w-32 mt-1" />
              ) : (
                <p className="text-xl text-white font-bold">
                  {awardsData?.nextAward?.title ?? "Nenhuma premiação"}
                </p>
              )}
            </header>
            <div className="flex flex-row justify-center items-center">
              {isLoadingAwards ? (
                <Skeleton className="h-[300px] w-[200px] rounded-sm" />
              ) : awardsData?.nextAward?.image ? (
                <img
                  src={awardsData.nextAward.image}
                  alt={awardsData.nextAward.title}
                  className="h-[300px] rounded-sm object-cover"
                />
              ) : (
                <div className="h-[300px] w-[200px] flex items-center justify-center bg-tertiary rounded-sm">
                  <p className="text-description text-sm text-center px-4">
                    Sem imagem disponível
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </aside>
    </PageContainer>
  );
}
