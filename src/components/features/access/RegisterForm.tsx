import { Button } from "@/components/ui/button";
import { useRegisterStore } from "@/stores/register-store";
import { RegisterProgress } from "./RegisterProgress";
import { RegisterStep1 } from "./RegisterStep1";
import { RegisterStep2PF } from "./RegisterStep2PF";
import { RegisterStep2PJ } from "./RegisterStep2PJ";

export function RegisterForm() {
  const {
    currentStep,
    currentError,
    step1Data,
    isSubmitting,
    setCurrentStep,
    setCurrentError,
  } = useRegisterStore();

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    if (currentStep === 1) {
      return "Seja um cliente insane!";
    }
    return step1Data?.accountType === "PERSON"
      ? "Dados pessoais"
      : "Dados da empresa";
  };

  const getStepDescription = () => {
    if (currentStep === 1) {
      return "Para utilizar nossos serviços é necessário concluir seu cadastro";
    }
    return step1Data?.accountType === "PERSON"
      ? "Preencha seus dados pessoais"
      : "Preencha os dados da sua empresa";
  };

  const accountType = step1Data?.accountType;

  return (
    <div className="flex flex-col gap-6 w-full">
      <RegisterProgress currentStep={currentStep} />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white">{getStepTitle()}</h2>
        <p className="text-sm text-purple-50/40">{getStepDescription()}</p>
      </div>

      {currentStep === 1 && <RegisterStep1 onNext={handleNext} />}

      {currentStep === 2 && accountType === "PERSON" && <RegisterStep2PF />}

      {currentStep === 2 && accountType === "COMPANY" && <RegisterStep2PJ />}

      {currentError && (
        <div
          className="border rounded-md p-3"
          style={{
            borderColor: "rgba(239, 68, 68, 0.4)",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-destructive text-sm font-medium">
              {currentError}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCurrentError(null)}
              className="hover:bg-transparent! text-destructive hover:text-destructive/80 h-auto p-1"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 sm:flex-initial"
          >
            Voltar
          </Button>
        )}
        {currentStep === 1 && (
          <Button
            type="submit"
            form="register-step1-form"
            className="flex-1 sm:flex-initial"
          >
            Próximo
          </Button>
        )}
        {currentStep === 2 && accountType === "PERSON" && (
          <Button
            type="submit"
            form="register-step2-pf-form"
            className="flex-1 sm:flex-initial"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Finalizar Cadastro"}
          </Button>
        )}
        {currentStep === 2 && accountType === "COMPANY" && (
          <Button
            type="submit"
            form="register-step2-pj-form"
            className="flex-1 sm:flex-initial"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Finalizar Cadastro"}
          </Button>
        )}
      </div>
    </div>
  );
}
