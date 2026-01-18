import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe3D } from "./Globe3D";
import { useLiveViewVisits } from "@/hooks/useLiveView";
import { Clock } from "lucide-react";

type PeriodOption = "12h" | "24h" | "2d" | "4d" | "1w";

const PERIOD_OPTIONS: { value: PeriodOption; label: string; hours: number }[] =
  [
    { value: "12h", label: "12 horas", hours: 12 },
    { value: "24h", label: "24 horas", hours: 24 },
    { value: "2d", label: "2 dias", hours: 48 },
    { value: "4d", label: "4 dias", hours: 96 },
    { value: "1w", label: "1 semana", hours: 168 },
  ];

function calculateSinceDate(period: PeriodOption): string {
  const option = PERIOD_OPTIONS.find((opt) => opt.value === period);
  const hours = option?.hours ?? 24;

  const date = new Date();
  date.setHours(date.getHours() - hours);

  return date.toISOString();
}

export function ContainerGlobe() {
  const [period, setPeriod] = useState<PeriodOption>("24h");

  const sinceDate = useMemo(() => calculateSinceDate(period), [period]);

  const { data, isLoading } = useLiveViewVisits({
    since: sinceDate,
  });

  const points = useMemo(
    () =>
      data?.data.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        label: point.label,
        color: point.color,
      })) ?? [],
    [data]
  );

  return (
    <Card className="w-full sm:w-5/10 h-[600px] lg:h-[calc(100vh-200px)] bg-transparent border-0 border-transparent p-0">
      <CardContent className="h-full p-0 flex flex-col">
        <div className="flex justify-end p-2">
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as PeriodOption)}
          >
            <SelectTrigger className="w-[140px] text-white">
              <Clock className="size-4 text-[#F8009D]" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className="bg-[#120412] border-[#F8009D]/40">
              {PERIOD_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white hover:bg-[#F8009D]/20 focus:bg-pink-500/20"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex-1 hover:cursor-pointer">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-xl" />
          ) : (
            <Globe3D points={points} autoRotate={true} rotationSpeed={0.5} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
