import { z } from "zod";
import { ProductStatus } from "@/types/product";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z.string().optional(),
  type: z.enum(["DIGITAL", "PHYSICAL"]).default("DIGITAL"),
  paymentFormat: z.enum(["ONE_TIME", "RECURRING"]).default("ONE_TIME"),
  price: z
    .string()
    .min(1, "Preço é obrigatório")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Preço deve ser um número válido"
    ),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .optional(),
  description: z.string().optional(),
  type: z.enum(["DIGITAL", "PHYSICAL"]).optional(),
  paymentFormat: z.enum(["ONE_TIME", "RECURRING"]).optional(),
  price: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Preço deve ser um número válido"
    )
    .optional(),
  status: z.nativeEnum(ProductStatus).optional(),
  urlBack: z
    .union([
      z.string().url("URL de retorno deve ser uma URL válida"),
      z.literal(""),
    ])
    .optional(),
  urlRedirect: z
    .union([
      z.string().url("URL de redirecionamento deve ser uma URL válida"),
      z.literal(""),
    ])
    .optional(),
});

export const uploadImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Imagem deve ter no máximo 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Formato de imagem não suportado. Use JPEG, PNG ou WebP"
    ),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type UploadImageFormData = z.infer<typeof uploadImageSchema>;
