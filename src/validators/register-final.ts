import { z } from "zod";
import { cpf, cnpj } from "cpf-cnpj-validator";
import type { Step1FormData } from "./register-step1";
import type { Step2PFFormData } from "./register-step2-pf";
import type { Step2PJFormData } from "./register-step2-pj";

// Schema de validação final para PF
const pfFinalSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  accountType: z.literal("PERSON"),
  password: z.string(),
  confirmPassword: z.string(),
  cpf: z.string().refine(
    (val) => {
      const cleanCpf = val.replace(/\D/g, "");
      return cpf.isValid(cleanCpf);
    },
    { message: "CPF inválido" }
  ),
  phone: z.string().refine(
    (val) => {
      const cleanPhone = val.replace(/\D/g, "");
      return cleanPhone.length === 11;
    },
    { message: "Telefone deve ter 11 dígitos" }
  ),
  birthDate: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true),
});

// Schema de validação final para PJ
const pjFinalSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  accountType: z.literal("COMPANY"),
  password: z.string(),
  confirmPassword: z.string(),
  companyCnpj: z.string().refine(
    (val) => {
      const cleanCnpj = val.replace(/\D/g, "");
      return cnpj.isValid(cleanCnpj);
    },
    { message: "CNPJ inválido" }
  ),
  companyName: z.string().min(3),
  tradeName: z.string().min(3),
  phone: z.string().refine(
    (val) => {
      const cleanPhone = val.replace(/\D/g, "");
      return cleanPhone.length === 11;
    },
    { message: "Telefone deve ter 11 dígitos" }
  ),
  acceptTerms: z.boolean().refine((val) => val === true),
});

// Validador final para PF
export const validatePFData = (
  step1: Step1FormData,
  step2: Step2PFFormData
) => {
  return pfFinalSchema.parse({
    ...step1,
    ...step2,
  });
};

// Validador final para PJ
export const validatePJData = (
  step1: Step1FormData,
  step2: Step2PJFormData
) => {
  return pjFinalSchema.parse({
    ...step1,
    ...step2,
  });
};

export type FinalPFData = z.infer<typeof pfFinalSchema>;
export type FinalPJData = z.infer<typeof pjFinalSchema>;
