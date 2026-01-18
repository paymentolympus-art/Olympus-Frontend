import type { CheckoutThemeType } from "@checkout-layout/types/checkout";
import { motion } from "framer-motion";
import hexRgb from "hex-rgb";
import { formatPrice } from "@checkout-layout/themes/simples/components/FormThreeSteps/mask";
import { Trash2 } from "lucide-react";
import { BsFillPatchCheckFill } from "react-icons/bs";

interface SelectedBump {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  priceFake: number;
}

interface CardSelectedBumpProps {
  bump: SelectedBump;
  removeOrderBumpSelected: (bumpId: string) => void;
  checkoutTheme: CheckoutThemeType;
}

/**
 * CardSelectedBump - Card de order bump selecionado no carrinho
 * Versão ilustrativa para o tema simples com animação
 */
export const CardSelectedBump: React.FC<CardSelectedBumpProps> = ({
  bump,
  removeOrderBumpSelected,
  checkoutTheme,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="border-2 border-dashed flex gap-2 sm:gap-4 rounded-sm px-2 py-1"
      style={{
        borderColor: checkoutTheme.defaultColors.orderBumpBorder,
        background: `rgba(${hexRgb(checkoutTheme.defaultColors.orderBumpBackground).red}, ${hexRgb(checkoutTheme.defaultColors.orderBumpBackground).green}, ${hexRgb(checkoutTheme.defaultColors.orderBumpBackground).blue}, 0.3)`,
      }}
    >
      {/* Imagem do produto */}
      <img
        src={bump.image}
        alt={bump.name}
        className="w-12 h-12 object-cover rounded-sm shrink-0"
      />

      {/* Informações do produto */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold line-clamp-2"
          style={{
            color: checkoutTheme.defaultColors.orderBumpText,
          }}
        >
          {bump.name}
        </p>
        <p
          className="text-xs line-clamp-1 -mt-0.5"
          style={{
            color: checkoutTheme.defaultColors.cardDescription,
          }}
        >
          {bump.description}
        </p>

        {/* Preço e desconto */}
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[12px]">1x de</span>
          <span
            className="text-[14px] font-semibold"
            style={{
              color: checkoutTheme.defaultColors.orderBumpText,
            }}
          >
            {formatPrice(bump.price)}
          </span>

          {/* Badge de desconto */}
          {bump.priceFake && (
            <span
              className="flex items-center gap-1 text-[10px] font-extrabold text-white px-1 py-0.5 rounded-xs"
              style={{
                background: `rgba(${hexRgb(checkoutTheme.defaultColors.orderBumpBorder).red}, ${hexRgb(checkoutTheme.defaultColors.orderBumpBorder).green}, ${hexRgb(checkoutTheme.defaultColors.orderBumpBorder).blue}, 0.9)`,
              }}
            >
              {formatPrice(bump.priceFake - bump.price)} OFF{" "}
              <BsFillPatchCheckFill className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </div>

      {/* Botão de remover */}
      <div className="flex items-center justify-center">
        <button
          className="text-sm font-semibold transition-colors duration-200 hover:opacity-70"
          onClick={() => removeOrderBumpSelected(bump.id)}
          style={{
            color: checkoutTheme.defaultColors.cardDescription,
          }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
