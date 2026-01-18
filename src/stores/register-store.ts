import { create } from "zustand";
import type { Step1FormData } from "@/validators/register-step1";
import type { Step2PFFormData } from "@/validators/register-step2-pf";
import type { Step2PJFormData } from "@/validators/register-step2-pj";

interface RegisterState {
  currentStep: number;
  step1Data: Step1FormData | null;
  step2PFData: Step2PFFormData | null;
  step2PJData: Step2PJFormData | null;
  currentError: string | null;
  isSubmitting: boolean;
  setCurrentStep: (step: number) => void;
  saveStep1Data: (data: Step1FormData) => void;
  saveStep2PFData: (data: Step2PFFormData) => void;
  saveStep2PJData: (data: Step2PJFormData) => void;
  setCurrentError: (error: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  currentStep: 1,
  step1Data: null,
  step2PFData: null,
  step2PJData: null,
  currentError: null,
  isSubmitting: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  saveStep1Data: (data) => set({ step1Data: data }),
  saveStep2PFData: (data) => set({ step2PFData: data }),
  saveStep2PJData: (data) => set({ step2PJData: data }),
  setCurrentError: (error) => set({ currentError: error }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  reset: () =>
    set({
      currentStep: 1,
      step1Data: null,
      step2PFData: null,
      step2PJData: null,
      currentError: null,
      isSubmitting: false,
    }),
}));
