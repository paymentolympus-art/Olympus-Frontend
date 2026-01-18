import { z } from "zod";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    accountType: z.enum(["PERSON", "COMPANY"], {
      message: "Selecione o tipo de cadastro",
    }),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve ter uma letra maiúscula, uma minúscula e número"
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    // Campos para Pessoa Física
    cpf: z.string().optional(),
    phone: z.string().optional(),
    birthDate: z.string().optional(),
    rg: z.string().optional(),
    // Campos para Pessoa Jurídica
    companyCnpj: z.string().optional(),
    companyName: z.string().optional(),
    tradeName: z.string().optional(),
    acceptTerms: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.accountType === "PERSON") {
        if (!data.cpf) {
          return false;
        }
        const cleanCpf = data.cpf.replace(/\D/g, "");
        if (cleanCpf.length < 11) {
          return false;
        }
        return cpf.isValid(cleanCpf);
      }
      return true;
    },
    {
      message: "CPF inválido",
      path: ["cpf"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "PERSON" || data.accountType === "COMPANY") {
        if (!data.phone) {
          return false;
        }
        const cleanPhone = data.phone.replace(/\D/g, "");
        return cleanPhone.length === 11;
      }
      return true;
    },
    {
      message: "Telefone é obrigatório e deve ter 11 dígitos",
      path: ["phone"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "PERSON") {
        if (!data.birthDate) {
          return false;
        }
        // Valida formato DD/MM/AAAA
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!dateRegex.test(data.birthDate)) {
          return false;
        }
        const [, day, month, year] = data.birthDate.match(dateRegex) || [];
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
      }
      return true;
    },
    {
      message:
        "Data de nascimento é obrigatória e deve estar no formato DD/MM/AAAA",
      path: ["birthDate"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "PERSON") {
        return !!data.rg && data.rg.length >= 5;
      }
      return true;
    },
    {
      message: "RG é obrigatório e deve ter pelo menos 5 caracteres",
      path: ["rg"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "COMPANY") {
        if (!data.companyCnpj) {
          return false;
        }
        const cleanCnpj = data.companyCnpj.replace(/\D/g, "");
        if (cleanCnpj.length < 14) {
          return false;
        }
        return cnpj.isValid(cleanCnpj);
      }
      return true;
    },
    {
      message: "CNPJ inválido",
      path: ["companyCnpj"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "COMPANY") {
        return !!data.companyName && data.companyName.length >= 3;
      }
      return true;
    },
    {
      message: "Razão Social é obrigatória e deve ter pelo menos 3 caracteres",
      path: ["companyName"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "COMPANY") {
        return !!data.tradeName && data.tradeName.length >= 3;
      }
      return true;
    },
    {
      message: "Nome Fantasia é obrigatório e deve ter pelo menos 3 caracteres",
      path: ["tradeName"],
    }
  )
  .refine(
    (data) => {
      return data.acceptTerms === true;
    },
    {
      message: "Você deve aceitar os termos de uso",
      path: ["acceptTerms"],
    }
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
