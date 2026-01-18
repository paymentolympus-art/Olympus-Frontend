import { useCheckout } from "@checkout/hooks/useCheckout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@checkout-layout/ui/button";
import { cn } from "@/lib/utils";
import { OrderBumpCard } from "../../OrderBumpCard";

const FormThird: React.FC = () => {
  const {
    data,
    theme,
    productOrder,
    setPaymentData,
    prevStep,
    addOrderBumpSelected,
    removeOrderBumpSelected,
  } = useCheckout();
  const { orderBumps } = data;
  const { cart } = productOrder;

  const onSubmit = () => {
    setPaymentData({
      id: "pix",
      pixQrcode: "pix-qrcode",
      pixCode: "pix-code",
    });
  };

  return (
    <form>
      <div className="space-y-3">
        <p
          className="text-sm font-semibold"
          style={{ color: theme.defaultColors.cardText }}
        >
          Pagamento
        </p>

        {/* Método de Pagamento */}
        <div className="space-y-4">
          <div className="flex items-center justify-center sm:justify-start">
            <div
              className="flex items-center space-x-3 border-2 rounded-sm p-2"
              style={{ borderColor: theme.defaultColors.primary }}
            >
              <img src={"/pix.png"} alt="Pix" className="w-16" />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
            <p
              className="text-sm"
              style={{ color: theme.defaultColors.cardDescription }}
            >
              Ao selecionar o Pix, você será encaminhado para um ambiente seguro
              para finalizar seu pagamento.
            </p>
          </div>
        </div>

        {/* Resumo do Produto com Oferta */}
        <div className="space-y-4">
          <p
            className="font-medium text-sm flex items-center gap-1"
            style={{ color: theme.defaultColors.cardText }}
          >
            <span style={{ color: theme.defaultColors.orderBumpPrice }}>
              {orderBumps.length} Oferta Disponível
            </span>{" "}
            para você:
          </p>

          {orderBumps.map((bump) => (
            <OrderBumpCard
              key={bump.id}
              bump={bump}
              isSelected={cart.orderBumps.some((b) => b.id === bump.id)}
              priceColor={theme.defaultColors.orderBumpPrice}
              onSelect={() => addOrderBumpSelected({ ...bump, quantity: 1 })}
              onRemove={() => removeOrderBumpSelected(bump.id)}
            />
          ))}

          <p className="text-xs text-gray-500">
            Ofertas exclusivas para esta compra!
          </p>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-1 md:justify-between">
          <Button
            onClick={onSubmit}
            className={cn(
              "w-full sm:w-[200px] text-white font-bold py-5 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed",
              theme.defaultSnippets.isFinishButtonPulse &&
                "animate-scale-in-out",
              theme.defaultSnippets.isFinishButtonShadow &&
                "shadow-lg shadow-zinc-400"
            )}
            style={{
              backgroundColor: theme.defaultColors.finishButtonColor,
              color: theme.defaultColors.finishButtonTextColor,
            }}
          >
            GERAR PIX
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="w-full text-white sm:w-auto sm:shadow-none border-none font-bold py-5 hover:opacity-90"
            style={{
              backgroundColor: "transparent",
              color: theme.defaultColors.cardDescription,
            }}
          >
            <ArrowLeft className="w-4 h-4 hidden sm:block" />
            Voltar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormThird;
