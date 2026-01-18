import { z } from "zod";

export const createWithdrawalSchema = z.object({
  value: z
    .number("Valor deve ser um número")
    .min(10, "Valor mínimo de saque é R$ 10,00"),
  code: z
    .string()
    .min(1, "Código de verificação é obrigatório")
    .length(6, "Código deve ter exatamente 6 dígitos"),
  pixKeyId: z.string().min(1, "Chave PIX é obrigatória"),
});

export type CreateWithdrawalFormData = z.infer<typeof createWithdrawalSchema>;

export const createPixKeySchema = z.object({
  type: z.enum(["EMAIL", "CPF", "CNPJ", "PHONE", "RANDOM"], {
    message: "Tipo de chave PIX é obrigatório",
  }),
  value: z.string().min(1, "Valor da chave PIX é obrigatório"),
  code: z
    .string()
    .min(1, "Código de verificação é obrigatório")
    .length(6, "Código deve ter exatamente 6 dígitos"),
});

export type CreatePixKeyFormData = z.infer<typeof createPixKeySchema>;

export const deletePixKeySchema = z.object({
  code: z
    .string()
    .min(1, "Código de verificação é obrigatório")
    .length(6, "Código deve ter exatamente 6 dígitos"),
});

export type DeletePixKeyFormData = z.infer<typeof deletePixKeySchema>;
