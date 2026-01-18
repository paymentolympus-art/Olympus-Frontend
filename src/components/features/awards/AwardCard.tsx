import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumberToReal } from "@/lib/format";
import type { Award } from "@/types/award";
import { cn } from "@/lib/utils";

interface AwardCardProps {
  award: Award;
  index: number;
  totalAwards: number;
  isLastInRow?: boolean;
}

export function AwardCard({ award, index }: AwardCardProps) {
  // Formata o valor mínimo para exibir de forma compacta
  const formatMinValue = (value: number): string => {
    if (value >= 10000000) {
      return "10M +";
    }
    if (value >= 1000000) {
      const millions = value / 1000000;
      if (millions >= 5 && millions < 10) {
        return "5M - 10M";
      }
      if (millions >= 1 && millions < 5) {
        return "500K - 1M";
      }
      return `${millions.toFixed(0)}M`;
    }
    if (value == 500000) {
      return "300K - 500K";
    }
    if (value == 300000) {
      return "100K - 300K";
    }
    if (value == 100000) {
      return "50K - 100K";
    }
    if (value === 50000) {
      return "10K - 50K";
    }
    if (value == 10000) {
      return "0 - 10K";
    }
    return formatNumberToReal(value);
  };

  const minValueDisplay = formatMinValue(award.minValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <Card className="border sm:border-transparent transition-all duration-300 overflow-hidden group backdrop-blur-sm">
        <CardContent className="p-2">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Ícone do Prêmio com efeito glow */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#d50491]/15 rounded-full blur-2xl group-hover:bg-[#d50491]/25 transition-all duration-500"></div>
              <motion.img
                src={award.icon}
                alt={award.title}
                className="relative w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300 z-10"
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Nome do Prêmio */}
            <div className="space-y-1.5">
              <h3 className="text-[15px] font-bold text-white tracking-wider leading-tight">
                {award.title.toUpperCase()}
              </h3>
              <p className="text-xl font-extrabold text-[#d50491] tracking-wide drop-shadow-[0_0_8px_rgba(213,4,145,0.5)]">
                {minValueDisplay}
              </p>
            </div>

            {/* Descrição */}
            <p className="text-sm text-gray-300/90 leading-relaxed min-h-[3.5rem] max-w-[220px]">
              {award.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <div
        className={cn(
          "absolute top-1/2 -right-5 z-20 items-center",
          [5, 6].includes(award.order) ? "hidden xl:flex" : "hidden"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-left w-7 h-7"
          style={{ color: "#d50491", marginLeft: "-15px" }}
        >
          <path d="m24 18-6-6 6-6"></path>
        </svg>
        <hr className="w-[48px] -ml-1.5 h-1 bg-gradient-to-r from-[#d50491] to-transparent" />
      </div>

      <div
        className={cn(
          "absolute top-1/2 -right-5 z-20 items-center",
          [1, 2].includes(award.order) ? "hidden xl:flex" : "hidden"
        )}
      >
        <hr className="w-[48px] h-1 bg-gradient-to-r from-transparent to-[#d50491]" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-right w-7 h-7"
          style={{ color: "#d50491", marginLeft: "-15px" }}
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
    </motion.div>
  );
}
