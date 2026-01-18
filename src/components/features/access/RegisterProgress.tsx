interface RegisterProgressProps {
  currentStep: number;
}

export function RegisterProgress({ currentStep }: RegisterProgressProps) {
  return (
    <div className="flex gap-2 w-full">
      {Array.from({ length: 2 }).map((_, index) => {
        const stepNumber = index + 1;
        // Etapa 1 = 1 barra ativa, Etapa 2 = 2 barras ativas
        const isActive = stepNumber <= currentStep;
        return (
          <div
            key={stepNumber}
            className={`flex-1 h-1 rounded-full transition-colors ${
              isActive ? "bg-white" : "bg-zinc-600"
            }`}
          />
        );
      })}
    </div>
  );
}
