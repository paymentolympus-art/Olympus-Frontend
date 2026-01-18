import { z } from "zod";

export const createIntegrationSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  key: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Chave deve ter pelo menos 3 caracteres"
    ),
  secret: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Segredo deve ter pelo menos 3 caracteres"
    ),
  token: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Token deve ter pelo menos 3 caracteres"
    ),
  type: z.enum(["UTMIFY", "META", "WEBHOOK"]),
  data: z.record(z.string(), z.any()).optional(),
});

export const updateIntegrationSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .optional(),
  key: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Chave deve ter pelo menos 3 caracteres"
    ),
  secret: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Segredo deve ter pelo menos 3 caracteres"
    ),
  token: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Token deve ter pelo menos 3 caracteres"
    ),
  type: z.enum(["UTMIFY", "META", "WEBHOOK"]).optional(),
  active: z.boolean().optional(),
  data: z.record(z.string(), z.any()).optional(),
});

export const associateIntegrationSchema = z.object({
  integrationId: z.string().min(1, "ID da integração é obrigatório"),
  productId: z.string().min(1, "ID do produto é obrigatório"),
});

export type CreateIntegrationFormData = z.infer<typeof createIntegrationSchema>;
export type UpdateIntegrationFormData = z.infer<typeof updateIntegrationSchema>;
export type AssociateIntegrationFormData = z.infer<
  typeof associateIntegrationSchema
>;
