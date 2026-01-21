import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { useWithdrawalBalance } from "@/hooks/useWithdrawal";
import { Skeleton } from "@/components/ui/skeleton";

export function BalanceCards() {
  const { balance, isLoading } = useWithdrawalBalance();
  const [showAvailable, setShowAvailable] = useState(true);
  const [showPending, setShowPending] = useState(true);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Skeleton className="h-42 w-full" />
        <Skeleton className="h-42 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Saldo Disponível */}
      <Card className="relative border-b-1 sm:border-b-green-500/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400 font-normal">
                Saldo Disponível
              </span>
              <span className="text-2xl font-bold">
                {showAvailable
                  ? formatCurrency(balance?.availableBalance || 0)
                  : "••••••"}
              </span>
            </div>
            <button
              onClick={() => setShowAvailable(!showAvailable)}
              className="p-3 rounded-lg bg-yellow-400/10 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={showAvailable ? "Ocultar valor" : "Mostrar valor"}
            >
              {showAvailable ? (
                <HiOutlineEye
                  className="h-6 w-6"
                  style={{ color: "#D4AF37" }}
                />
              ) : (
                <HiOutlineEyeSlash
                  className="h-6 w-6"
                  style={{ color: "#D4AF37" }}
                />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Saldo Pendente */}
      <Card className="relative border-b-1 sm:border-b-yellow-500/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400 font-normal">
                Saldo Pendente
              </span>
              <span className="text-2xl font-bold">
                {showPending
                  ? formatCurrency(balance?.pendingBalance || 0)
                  : "••••••"}
              </span>
            </div>
            <button
              onClick={() => setShowPending(!showPending)}
              className="p-3 rounded-lg bg-yellow-400/10 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={showPending ? "Ocultar valor" : "Mostrar valor"}
            >
              {showPending ? (
                <HiOutlineEye
                  className="h-6 w-6"
                  style={{ color: "#D4AF37" }}
                />
              ) : (
                <HiOutlineEyeSlash
                  className="h-6 w-6"
                  style={{ color: "#D4AF37" }}
                />
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
