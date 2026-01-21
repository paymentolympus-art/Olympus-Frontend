import { useState } from "react";
import { AwardCard } from "./AwardCard";
import { useAwards } from "@/hooks/useAwards";
import { HiTrophy } from "react-icons/hi2";
import { Spinner } from "@/components/ui/spinner";

export function AwardList() {
  const [page, _] = useState(1);
  const limit = 10;

  const { awards, isLoading, error } = useAwards({
    page,
    limit,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Erro ao carregar premiações</p>
          <p className="text-sm text-muted-foreground">
            Tente novamente mais tarde
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      {/* Lista de Premiações */}
      {isLoading && awards.length === 0 ? (
        <div className="flex w-full h-full min-h-[400px] items-center justify-center">
          <Spinner className="size-10" color="#D4AF37" />
        </div>
      ) : awards.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <HiTrophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">
            Nenhuma premiação encontrada
          </h3>
          <p className="text-muted-foreground">
            Não há premiações disponíveis no momento.
          </p>
        </div>
      ) : (
        <>
          {/* Grid de Premiações */}
          <div className="relative bg-card border border-gray-300/10 px-5 pt-5 rounded-lg">
            {/* Primeira linha: 4 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-10">
              {awards.slice(0, 3).map((award, index) => (
                <AwardCard
                  key={award.id}
                  award={award}
                  index={index}
                  totalAwards={awards.length}
                  isLastInRow={
                    index === 3 || index === awards.slice(0, 3).length - 1
                  }
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  space-y-10">
              {awards
                .slice(3)
                .reverse()
                .map((award, index) => (
                  <AwardCard
                    key={award.id}
                    award={award}
                    index={index}
                    totalAwards={awards.length}
                    isLastInRow={index === awards.slice(3).length - 1}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
