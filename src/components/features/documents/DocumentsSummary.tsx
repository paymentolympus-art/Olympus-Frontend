import { Card } from "@/components/ui/card";

type Props = {
  sent: number;
  approved: number;
  pending: number;
  missing: number;
};

export function DocumentsSummary({ sent, approved, pending, missing }: Props) {
  // Check if browser supports OKLCH (for iPhone compatibility)
  const supportsOKLCH =
    typeof CSS !== "undefined" && CSS.supports("color", "oklch(0% 0 0)");

  // Helper to convert OKLCH to RGB fallback
  const getColorWithFallback = (oklchColor: string, rgbFallback: string) => {
    return supportsOKLCH ? oklchColor : rgbFallback;
  };

  const items = [
    {
      label: "Enviados",
      value: sent,
      oklchColor: "255 0 0",
      rgbFallback: "rgb(255, 0, 0)",
    },
    {
      label: "Aprovados",
      value: approved,
      oklchColor: "66.5% 0.177 163.223",
      rgbFallback: "rgb(34, 197, 94)", // Verde
    },
    {
      label: "Pendentes",
      value: pending,
      oklchColor: "70.5% 0.213 47.604",
      rgbFallback: "rgb(234, 179, 8)", // Amarelo
    },
    {
      label: "Faltantes",
      value: missing,
      oklchColor: "60.5% 0.213 27.518",
      rgbFallback: "rgb(239, 68, 68)", // Vermelho
    },
  ];

  return (
    <Card className="w-full">
      <div className="grid grid-cols-2 gap-2 px-4 sm:flex sm:flex-row items-center justify-around">
        {items.map((it) => {
          const borderColor = getColorWithFallback(
            `oklch(${it.oklchColor}/0.5)`,
            it.rgbFallback.replace("rgb", "rgba").replace(")", ", 0.5)")
          );
          const bgColor = getColorWithFallback(
            `oklch(${it.oklchColor}/0.1)`,
            it.rgbFallback.replace("rgb", "rgba").replace(")", ", 0.1)")
          );

          return (
            <div
              key={it.label}
              style={{
                border: `0.01px solid ${borderColor}`,
                borderRadius: "10px",
                padding: "2px 20px",
                backgroundColor: bgColor,
              }}
            >
              <header className="flex flex-row items-center justify-between px-4 py-2 gap-2">
                <span className="text-2xl font-semibold">{it.value}</span>
                <span className="text-xs text-white/70">{it.label}</span>
              </header>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
