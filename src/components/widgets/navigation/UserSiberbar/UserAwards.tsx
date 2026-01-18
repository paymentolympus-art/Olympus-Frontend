import { Card, CardContent } from "@/components/ui/card";
import { useSidebar } from "@/hooks/useSidebar";
import { useUserAwards } from "@/hooks/useUserAwards";
import { formatNumberToReal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ROUTES_PRIVATE } from "@/constants/routes";
import { Skeleton } from "@/components/ui/skeleton";

export function UserAwards() {
  const { open } = useSidebar();
  const { awardsData, isLoading } = useUserAwards();
  const navigate = useNavigate();
  // Formata o valor para exibir de forma compacta (ex: R$ 10K)
  const formatTarget = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 0)}K`;
    }
    return formatNumberToReal(value);
  };

  // Se estiver carregando ou não houver dados, não renderiza nada
  if (isLoading || !awardsData) {
    return <Skeleton className="w-full h-17" />;
  }

  const currentSales = parseFloat(awardsData.sales) || 0;
  const targetValue = awardsData.nextAward
    ? parseFloat(awardsData.nextAward.minValue)
    : 0;

  const percentage =
    targetValue > 0
      ? Math.min(Math.round((currentSales / targetValue) * 100), 100)
      : 0;

  const targetDisplayCompact = formatTarget(targetValue);

  return (
    <Card
      className={cn(
        "rounded-lg border-0 ring-[1px] ring-[#d50491]/10  bg-gradient-to-r from-[#530462] to-[#d50491]  hover:ring-white/90 transition-all duration-300 py-2 pl-2 pr-4 hover:cursor-pointer",
        !open && "hidden"
      )}
      onClick={() => navigate(ROUTES_PRIVATE.AWARDS)}
    >
      <CardContent className="p-0 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <img
            src={awardsData.nextAward?.icon}
            alt="Award Icon"
            fetchPriority="high"
            className="flex-shrink-0 w-10 h-10"
          />
        </div>
        <div className="w-full flex flex-col gap-0.5">
          {/* Header com ícone e título */}
          <div className="flex items-center">
            {/* Ícone de Cactus dourado */}
            <h3 className="text-white font-semibold">Faturamento</h3>
          </div>

          {/* Valor atual / Meta */}
          <div className="flex items-center justify-between">
            <p className="text-white text-sm font-bold">
              {formatTarget(currentSales)} / {targetDisplayCompact}
            </p>
            <p className="text-white text-sm font-bold">{percentage}%</p>
          </div>

          {/* Barra de progresso */}
          <div className="relative w-full h-2 bg-gray-800/80 rounded-full overflow-hidden border">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#530462] to-[#d50491] transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
