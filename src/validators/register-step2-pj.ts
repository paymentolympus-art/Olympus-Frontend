import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const step2PJSchema = z.object({
  companyCnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .refine(
      (val) => {
        const cleanCnpj = val.replace(/\D/g, "");
        if (cleanCnpj.length < 14) {
          return false;
        }
        return cnpj.isValid(cleanCnpj);
      },
      {
        message: "CNPJ inválido",
      }
    ),
  companyName: z
    .string()
    .min(3, "Razão Social é obrigatória e deve ter pelo menos 3 caracteres"),
  tradeName: z
    .string()
    .min(3, "Nome Fantasia é obrigatório e deve ter pelo menos 3 caracteres"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (val) => {
        const cleanPhone = val.replace(/\D/g, "");
        return cleanPhone.length === 11;
      },
      {
        message: "Telefone deve ter 11 dígitos",
      }
    ),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos de uso",
  }),
});

export type Step2PJFormData = z.infer<typeof step2PJSchema>;
