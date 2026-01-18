import { z } from "zod";

/**
 * Schema de validação para dados do cliente
 * Usado na etapa 1 (Identificação)
 */
export const customerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  cellphone: z.string().min(1, { message: "Telefone é obrigatório" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  cpf: z.string().min(1, { message: "CPF é obrigatório" }),
});

// Tipo inferido do schema
export type CustomerData = z.infer<typeof customerSchema>;
