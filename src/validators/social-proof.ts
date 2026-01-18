import { z } from "zod";

/**
 * Schema para criar uma prova social
 */
export const createSocialProofSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB
      "Imagem deve ter no máximo 10MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "Formato de imagem não suportado. Use JPEG, PNG ou WebP"
    )
    .optional(),
  text: z
    .string()
    .min(1, "Texto é obrigatório")
    .max(500, "Texto deve ter no máximo 500 caracteres"),
  name: z
    .string()
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .optional(),
  rating: z
    .number()
    .int("Avaliação deve ser um número inteiro")
    .min(1, "Avaliação deve ser no mínimo 1")
    .max(5, "Avaliação deve ser no máximo 5")
    .optional(),
});

/**
 * Schema para atualizar uma prova social
 * Todos os campos são opcionais
 */
export const updateSocialProofSchema = z
  .object({
    file: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
      .refine(
        (file) => file.size <= 10 * 1024 * 1024, // 10MB
        "Imagem deve ter no máximo 10MB"
      )
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          ),
        "Formato de imagem não suportado. Use JPEG, PNG ou WebP"
      )
      .optional(),
    text: z
      .string()
      .min(1, "Texto deve ter pelo menos 1 caractere")
      .max(500, "Texto deve ter no máximo 500 caracteres")
      .optional(),
    name: z
      .string()
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .optional(),
    rating: z
      .number()
      .int("Avaliação deve ser um número inteiro")
      .min(1, "Avaliação deve ser no mínimo 1")
      .max(5, "Avaliação deve ser no máximo 5")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Pelo menos um campo deve ser fornecido para atualização"
  );

export type CreateSocialProofFormData = z.infer<typeof createSocialProofSchema>;
export type UpdateSocialProofFormData = z.infer<typeof updateSocialProofSchema>;
