import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowTrendingDown,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationTriangle,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { formatNumberToReal } from "@/lib/format";
import type { SalesSummary as SalesSummaryType } from "@/types/sale";

interface SalesSummaryProps {
  summary: SalesSummaryType;
}

export function SalesSummary({ summary }: SalesSummaryProps) {
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleVisibility = (index: number) => {
    setVisibleCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const cards = [
    {
      label: "Total de pagamentos",
      value: summary.totalPayments.toString(),
      icon: HiOutlineEye,
      iconBg: "bg-[#D50491]/10",
      iconColor: "#D50491",
      valueColor: "text-white",
    },
    {
      label: "Valor líquido",
      value: formatNumberToReal(summary.totalValueNet),
      icon: HiOutlineCurrencyDollar,
      iconBg: "bg-[#D50491]/10",
      iconColor: "#D50491",
      valueColor: "text-white",
    },
    {
      label: "Total reembolsado",
      value: formatNumberToReal(summary.totalRefunded),
      icon: HiOutlineArrowTrendingDown,
      iconBg: "bg-[#D50491]/10",
      iconColor: "#D50491",
      valueColor: "text-white",
    },
    {
      label: "Porcentagem de pix",
      value: `${summary.pixPercentage.toFixed(1)}%`,
      icon: HiOutlineCreditCard,
      iconBg: "bg-[#D50491]/10",
      iconColor: "#D50491",
      valueColor: "text-white",
    },
    {
      label: "Porcentagem de reembolso",
      value: `${summary.refundPercentage.toFixed(1)}%`,
      icon: HiOutlineExclamationTriangle,
      iconBg: "bg-[#D50491]/10",
      iconColor: "#D50491",
      valueColor: "text-white",
    },
    {
      label: "Total MED",
      value: formatNumberToReal(summary.totalMed),
      icon: HiOutlineExclamationTriangle,
      iconBg: "bg-[#D50491]/10",
      iconColor: "#D50491",
      valueColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const isVisible = visibleCards[index];

        const colSpan = index < 2 ? "lg:col-span-2" : "";

        return (
          <Card key={index} className={colSpan}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-400 font-normal">
                    {card.label}
                  </p>
                  <p
                    className={`text-2xl font-bold ${card.valueColor} transition-all duration-300 ${
                      !isVisible ? "blur-md select-none" : "blur-0"
                    }`}
                  >
                    {card.value}
                  </p>
                </div>
                <button
                  onClick={() => toggleVisibility(index)}
                  className={`p-3 rounded-lg ${card.iconBg} hover:opacity-80 transition-opacity cursor-pointer`}
                  aria-label={isVisible ? "Ocultar valor" : "Mostrar valor"}
                >
                  {isVisible ? (
                    <HiOutlineEye
                      className="h-6 w-6"
                      style={{ color: card.iconColor }}
                    />
                  ) : (
                    <HiOutlineEyeSlash
                      className="h-6 w-6"
                      style={{ color: card.iconColor }}
                    />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
