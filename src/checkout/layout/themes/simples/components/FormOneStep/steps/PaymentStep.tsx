import { useCheckout } from "@checkout/hooks/useCheckout";
import { Button } from "@checkout-layout/ui/button";
import { cn } from "@/lib/utils";
import { OrderBumpCard } from "../../OrderBumpCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";

const PaymentStep: React.FC = () => {
  const {
    data,
    theme,
    productOrder,
    setPaymentData,
    addOrderBumpSelected,
    removeOrderBumpSelected,
  } = useCheckout();
  const { orderBumps } = data;
  const { step, cart, address } = productOrder;

  const [paymentCardVisible, setPaymentCardVisible] = useState(false);

  useEffect(() => {
    const setPaymentSectionComplete = () => {
      if (
        (step === 3 && cart.type === ProductType.PHYSICAL) ||
        (step === 2 && cart.type === ProductType.DIGITAL)
      ) {
        console.log(
          `step ${step} e cart.type ${cart.type} e address ${address.cep}`
        );
        setPaymentCardVisible(true);
        document
          .getElementById("payment-step")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };
    setPaymentSectionComplete();

    return () => {
      setPaymentSectionComplete();
    };
  }, [step, cart.type, setPaymentCardVisible]);

  const onSubmit = () => {
    setPaymentData({
      id: "pix",
      pixQrcode: "pix-qrcode",
      pixCode: "pix-code",
    });
  };

  return (
    <AnimatePresence>
      {paymentCardVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            opacity: { duration: 0.3 },
            height: { duration: 0.4 },
          }}
          className={`rounded-lg p-6 ${
            theme.defaultSnippets.isCardShadow
              ? "shadow-lg"
              : "border border-gray-200/60"
          }`}
          style={{
            backgroundColor: theme.defaultColors.cardBackground,
          }}
          id="payment-step"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: theme.defaultColors.cardText }}
              >
                Pagamento
              </h3>
            </div>

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
                  Ao selecionar o Pix, você será encaminhado para um ambiente
                  seguro para finalizar seu pagamento.
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
                  isSelected={cart.orderBumps.some(
                    (b: any) => b.id === bump.id
                  )}
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
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { PaymentStep };
