import { z } from "zod";

// Schema para mudança de senha
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Senha atual é obrigatória")
      .min(6, "Senha atual deve ter pelo menos 6 caracteres"),
    newPassword: z
      .string()
      .min(1, "Nova senha é obrigatória")
      .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    code: z
      .string()
      .min(1, "Código de verificação é obrigatório")
      .length(6, "Código deve ter 6 dígitos"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Schema para ativar/desativar 2FA
export const toggle2FASchema = z.object({
  enabled: z.boolean(),
});

export type Toggle2FAFormData = z.infer<typeof toggle2FASchema>;

// Schema para desativar 2FA (requer senha e código)
export const disable2FASchema = z.object({
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  code: z
    .string()
    .min(1, "Código de verificação é obrigatório")
    .length(6, "Código deve ter 6 dígitos"),
});

export type Disable2FAFormData = z.infer<typeof disable2FASchema>;
