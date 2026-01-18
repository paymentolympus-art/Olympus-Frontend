import { z } from "zod";

export const domainNameSchema = z
  .string()
  .min(1, "Nome do domínio é obrigatório")
  .max(255, "Nome do domínio deve ter no máximo 255 caracteres")
  .trim()
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
    "Formato de domínio inválido"
  )
  .transform((val) => val.replace(/^https?:\/\//, "").replace(/^www\./, ""));

export const createDomainSchema = z.object({
  name: domainNameSchema,
});

export const updateDomainSchema = z.object({
  name: domainNameSchema,
});

export const domainFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["PENDING", "VERIFIED", "ERROR"]).optional(),
  productId: z.string().optional(),
  page: z.coerce
    .number()
    .min(1, "Página deve ser maior que 0")
    .optional()
    .default(1),
  limit: z.coerce
    .number()
    .min(1, "Limite deve ser maior que 0")
    .max(100, "Limite máximo é 100")
    .optional()
    .default(10),
});

export const domainIdSchema = z.object({
  id: z.string().min(1, "ID é obrigatório").trim(),
});

export const associateProductsSchema = z.object({
  productIds: z
    .array(z.string().min(1, "ID do produto é obrigatório"))
    .min(1, "Pelo menos um produto deve ser fornecido"),
});

export const addProductToDomainSchema = z.object({
  productId: z.string().min(1, "ID do produto é obrigatório"),
});

export const removeProductFromDomainSchema = z.object({
  productId: z.string().min(1, "ID do produto é obrigatório"),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>;
export type UpdateDomainInput = z.infer<typeof updateDomainSchema>;
export type DomainFiltersInput = z.infer<typeof domainFiltersSchema>;
