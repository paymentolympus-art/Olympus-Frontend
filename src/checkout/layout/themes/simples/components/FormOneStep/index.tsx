import React from "react";
import { CustomerStep } from "./steps/CustomerStep";
import { AddressStep } from "./steps/AddressStep";
import { PaymentStep } from "./steps/PaymentStep";

// Componente principal
const FormOneStep: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Step 1: Dados do Cliente */}
      <CustomerStep />

      {/* Step 2: Endereço (apenas para produtos físicos) */}
      <AddressStep />

      {/* Step 3: Pagamento */}
      <PaymentStep />
    </div>
  );
};

export { FormOneStep };
