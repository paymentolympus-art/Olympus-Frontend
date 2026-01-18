import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const step2PFSchema = z.object({
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(
      (val) => {
        const cleanCpf = val.replace(/\D/g, "");
        if (cleanCpf.length < 11) {
          return false;
        }
        return cpf.isValid(cleanCpf);
      },
      {
        message: "CPF inválido",
      }
    ),
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
  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine(
      (val) => {
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!dateRegex.test(val)) {
          return false;
        }
        const [, day, month, year] = val.match(dateRegex) || [];
        const date = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        return (
          date.getDate() === parseInt(day) &&
          date.getMonth() === parseInt(month) - 1 &&
          date.getFullYear() === parseInt(year)
        );
      },
      {
        message: "Data de nascimento deve estar no formato DD/MM/AAAA",
      }
    ),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos de uso",
  }),
});

export type Step2PFFormData = z.infer<typeof step2PFSchema>;
