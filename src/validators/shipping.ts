import { z } from "zod";

// Schema para produto
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nome do produto é obrigatório"),
});

// Schema para productId opcional (aceita string vazia ou UUID válido)
const OptionalProductIdSchema = z
  .string()
  .refine(
    (val) =>
      val === "" ||
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        val
      ),
    {
      message: "ID do produto inválido",
    }
  )
  .optional()
  .or(z.literal(""));

// Schema para opção de frete
export const ShippingOptionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.number().min(0, "Preço deve ser positivo"),
  image: z.string().url().optional(),
  productId: z.string().uuid().optional(),
  product: ProductSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Schema para criar opção de frete
export const CreateShippingDataSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  price: z
    .number()
    .min(0, "Preço deve ser positivo")
    .max(999999, "Preço muito alto"),
  productId: OptionalProductIdSchema,
  image: z.instanceof(File).optional(),
});

// Schema para atualizar opção de frete
export const UpdateShippingDataSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .optional(),
  description: z.string().max(500, "Descrição muito longa").optional(),
  price: z
    .number()
    .min(0, "Preço deve ser positivo")
    .max(999999, "Preço muito alto")
    .optional(),
  productId: OptionalProductIdSchema,
});

// Schema para filtros
export const ShippingFiltersSchema = z.object({
  search: z.string().max(100, "Termo de busca muito longo").optional(),
  productId: OptionalProductIdSchema,
  page: z.number().int().positive("Página deve ser positiva").optional(),
  limit: z
    .number()
    .int()
    .min(1, "Limite mínimo é 1")
    .max(100, "Limite máximo é 100")
    .optional(),
});

// Schema para upload de imagem
export const UploadImageSchema = z.object({
  id: z.string().uuid("ID inválido"),
  image: z.instanceof(File, { message: "Arquivo de imagem é obrigatório" }),
});

// Schema para remoção de imagem
export const RemoveImageSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

// Schema para busca por produto
export const GetByProductSchema = z.object({
  productId: z.string().uuid("ID do produto inválido"),
});

// Tipos inferidos dos schemas
export type Product = z.infer<typeof ProductSchema>;
export type ShippingOption = z.infer<typeof ShippingOptionSchema>;
export type CreateShippingData = z.infer<typeof CreateShippingDataSchema>;
export type UpdateShippingData = z.infer<typeof UpdateShippingDataSchema>;
export type ShippingFilters = z.infer<typeof ShippingFiltersSchema>;
export type UploadImageData = z.infer<typeof UploadImageSchema>;
export type RemoveImageData = z.infer<typeof RemoveImageSchema>;
export type GetByProductData = z.infer<typeof GetByProductSchema>;

// Interfaces mantidas para compatibilidade (deprecated - usar os tipos acima)
export interface ShippingOptionInterface {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  productId?: string;
  product?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateShippingDataInterface {
  name: string;
  description?: string;
  price: number;
  productId?: string;
  image?: File;
}

export interface UpdateShippingDataInterface {
  name?: string;
  description?: string;
  price?: number;
  productId?: string;
}

export interface ShippingFiltersInterface {
  search?: string;
  productId?: string;
  page?: number;
  limit?: number;
}
