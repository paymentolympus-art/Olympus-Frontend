import React, { useState } from "react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import { RadioGroup, RadioGroupItem } from "@checkout-layout/ui/radio-group";

interface PaymentMethodsProps {
  checkoutTheme: CheckoutThemeType;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  checkoutTheme,
}) => {
  const [selectedPayment, setSelectedPayment] = useState("pix");

  const paymentOptions = [
    {
      id: "pix",
      name: "Pix",
      description: "Pix é uma forma de pagamento rápida e segura.",
      icon: "/pix.png",
      bgColor: "bg-teal-50",
    },
  ];

  return (
    <div
      className="p-4 border-b-8 border-gray-700/5"
      style={{ backgroundColor: checkoutTheme.defaultColors.cardBackground }}
    >
      <h3
        className="text-lg font-medium"
        style={{ color: checkoutTheme.defaultColors.cardText }}
      >
        Forma de pagamento
      </h3>

      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center justify-between py-3 px-2 rounded-lg border cursor-pointer transition-colors hover:bg-gray-100`}
            onClick={() => setSelectedPayment(option.id)}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <img src={option.icon} alt={option.name} className="w-14" />
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-sm font-medium"
                      style={{ color: checkoutTheme.defaultColors.cardText }}
                    >
                      {option.name}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: checkoutTheme.defaultColors.cardDescription,
                      }}
                    >
                      {option.description}
                    </span>
                  </div>
                </div>
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={(value) => setSelectedPayment(value)}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    style={{
                      borderWidth: "2px",
                      borderColor: checkoutTheme.defaultColors.primary,
                      backgroundColor:
                        selectedPayment === option.id
                          ? checkoutTheme.defaultColors.primary
                          : "transparent",
                      color:
                        selectedPayment === option.id ? "white" : "transparent",
                    }}
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
