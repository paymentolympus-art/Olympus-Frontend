import { Card, CardContent } from "@checkout-layout/ui/card";
import { Trash2, Square } from "lucide-react";
import { formatPrice } from "@checkout-layout/themes/simples/components/FormThreeSteps/mask";
import { cn } from "@/lib/utils";
import { BsFillPatchCheckFill } from "react-icons/bs";

interface OrderBump {
  id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  priceFake?: number;
}

interface OrderBumpCardProps {
  bump: OrderBump;
  isSelected: boolean;
  priceColor: string;
  onSelect: () => void;
  onRemove: () => void;
}

/**
 * OrderBumpCard - Card de oferta adicional (order bump)
 * Versão ilustrativa para o tema simples
 */
export const OrderBumpCard: React.FC<OrderBumpCardProps> = ({
  bump,
  isSelected,
  priceColor,
  onSelect,
  onRemove,
}) => {
  return (
    <Card
      className={cn(
        "rounded-sm border-2 border-dashed relative overflow-visible transition-all duration-300 ease-in-out",
        isSelected ? "border-green-500" : "border-orange-500"
      )}
    >
      {/* Badge de oferta adquirida */}
      <div
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ease-in-out",
          isSelected
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        )}
      >
        <span className="flex items-center gap-1 bg-green-500 text-white text-[9px] font-extrabold! px-3 py-1 rounded-sm whitespace-nowrap">
          OFERTA ADQUIRIDA
          <BsFillPatchCheckFill className="w-3 h-3" />
        </span>
      </div>

      {/* Botão de remover */}
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          "absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10 transition-all duration-300 ease-in-out",
          isSelected
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Imagem do produto */}
          <div className="shrink-0">
            <img
              src={bump.image}
              alt={bump.name}
              className="w-16 h-16 object-cover rounded transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Informações do produto */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              {bump.name}
            </h3>
            <p className="text-xs text-gray-500 -mt-0.5">{bump.description}</p>

            <div className="flex flex-col items-start mt-1">
              {bump.priceFake && (
                <span className="text-red-500 line-through text-xs">
                  {formatPrice(bump.priceFake)}
                </span>
              )}
              <span
                className="font-bold text-lg -mt-1"
                style={{ color: priceColor }}
              >
                {formatPrice(bump.price)}
              </span>
            </div>
          </div>

          {/* Botão de pegar oferta */}
          <div
            className={cn(
              "shrink-0 transition-all duration-300 ease-in-out",
              isSelected
                ? "opacity-0 scale-75 pointer-events-none w-0"
                : "opacity-100 scale-100"
            )}
          >
            <button
              type="button"
              onClick={onSelect}
              className="whitespace-nowrap w-auto h-auto rounded-sm absolute top-9 -right-1 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-semibold px-1.5 py-1.5 flex items-center gap-2 transition-transform duration-200 hover:scale-105 shadow-none border-none"
            >
              <Square className="w-3 h-3 bg-orange-50 rounded-xs" />
              PEGAR OFERTA
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
