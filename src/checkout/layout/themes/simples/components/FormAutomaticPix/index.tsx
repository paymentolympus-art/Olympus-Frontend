import { useCheckout } from "@checkout/hooks/useCheckout";
import { Button } from "@checkout-layout/ui/button";
import { cn } from "@/lib/utils";
import { OrderBumpCard } from "../OrderBumpCard";

/**
 * FormAutomaticPix - Formulário de checkout com PIX automático
 * Versão ilustrativa para o tema simples (sem API real)
 *
 * Este formulário não coleta dados do cliente, apenas exibe:
 * - Método de pagamento PIX
 * - Order bumps disponíveis
 * - Botão para gerar PIX
 */
const FormAutomaticPix: React.FC = () => {
  const {
    data,
    theme,
    productOrder,
    setPaymentData,
    addOrderBumpSelected,
    removeOrderBumpSelected,
  } = useCheckout();
  const { orderBumps } = data;
  const { cart } = productOrder;

  // Função ilustrativa de submit (sem API real)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simula a geração do PIX (apenas ilustrativo)
    setPaymentData({
      id: "pix-auto",
      pixQrcode: "pix-qrcode-auto",
      pixCode: "pix-code-auto",
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl sm:max-w-full mx-auto">
      <div
        className={`
          rounded-xl px-4 py-4 sm:p-6
          ${theme.defaultSnippets.isCardShadow ? "shadow-lg" : "border border-gray-200/60"}
        `}
        style={{
          backgroundColor: theme.defaultColors.cardBackground,
        }}
      >
        <form onSubmit={onSubmit}>
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
                  style={{
                    borderColor: theme.defaultColors.primary,
                  }}
                >
                  <img src={"/pix.png"} alt="Pix" className="w-16" />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                <p
                  className="text-sm"
                  style={{
                    color: theme.defaultColors.cardDescription,
                  }}
                >
                  Ao selecionar o Pix, você será encaminhado para um ambiente
                  seguro para finalizar seu pagamento.
                </p>
              </div>
            </div>

            {/* Order Bumps - Ofertas */}
            {orderBumps && orderBumps.length > 0 && (
              <div className="space-y-4">
                <p
                  className="font-medium text-sm flex items-center gap-1"
                  style={{ color: theme.defaultColors.cardText }}
                >
                  <span
                    style={{
                      color: theme.defaultColors.orderBumpPrice,
                    }}
                  >
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
                    onSelect={() =>
                      addOrderBumpSelected({ ...bump, quantity: 1 })
                    }
                    onRemove={() => removeOrderBumpSelected(bump.id)}
                  />
                ))}

                <p className="text-xs text-gray-500">
                  Ofertas exclusivas para esta compra!
                </p>
              </div>
            )}

            {/* Botão de Gerar PIX */}
            <div className="flex justify-center sm:justify-end">
              <Button
                type="submit"
                className={cn(
                  "w-full sm:w-[200px] text-white font-bold py-5 hover:opacity-90",
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { FormAutomaticPix };
