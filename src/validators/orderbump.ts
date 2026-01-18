import { z } from "zod";

export const createOrderbumpSchema = z.object({
  offerId: z.string().min(1, "Oferta é obrigatória"),
  productId: z.string().min(1, "Produto é obrigatório"),
  name: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  callToAction: z
    .string()
    .min(1, "Chamada para ação é obrigatória")
    .min(3, "Chamada para ação deve ter pelo menos 3 caracteres")
    .max(50, "Chamada para ação deve ter no máximo 50 caracteres"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
});

export const updateOrderbumpSchema = z.object({
  name: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres")
    .optional(),
  callToAction: z
    .string()
    .min(3, "Chamada para ação deve ter pelo menos 3 caracteres")
    .max(50, "Chamada para ação deve ter no máximo 50 caracteres")
    .optional(),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),
  price: z.number().min(0, "Preço deve ser maior ou igual a 0").optional(),
  priceFake: z
    .number()
    .min(0, "Preço falso deve ser maior ou igual a 0")
    .optional(),
  status: z.string().optional(),
});

export type CreateOrderbumpFormData = z.infer<typeof createOrderbumpSchema>;
export type UpdateOrderbumpFormData = z.infer<typeof updateOrderbumpSchema>;
