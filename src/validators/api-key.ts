import { z } from "zod";

// Validação de IP (IPv4 ou IPv6)
const ipRegex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

// Validação de domínio
const domainRegex =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  ips: z
    .array(
      z.string().refine((ip) => ipRegex.test(ip), {
        message: "IP inválido",
      })
    )
    .default([]),
  domains: z
    .array(
      z.string().refine((domain) => domainRegex.test(domain), {
        message: "Domínio inválido",
      })
    )
    .default([]),
});

export const updateApiKeySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .optional(),
  status: z.enum(["PENDING", "ACTIVE", "INACTIVE", "BLOCKED"]).optional(),
  ips: z
    .array(
      z.string().refine((ip) => ip === "" || ipRegex.test(ip), {
        message: "IP inválido",
      })
    )
    .optional(),
  domains: z
    .array(
      z.string().refine((domain) => domain === "" || domainRegex.test(domain), {
        message: "Domínio inválido",
      })
    )
    .optional(),
});

export type CreateApiKeyFormData = z.infer<typeof createApiKeySchema>;
export type UpdateApiKeyFormData = z.infer<typeof updateApiKeySchema>;
