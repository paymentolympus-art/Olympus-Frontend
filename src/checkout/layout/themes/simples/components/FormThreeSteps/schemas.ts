import { z } from "zod";

export const customerSchema = z.object({
  email: z.string().email(),
  cellphone: z.string().min(1),
  name: z.string().min(1),
  cpf: z.string().min(1),
});

export type CustomerData = z.infer<typeof customerSchema>;

export const addressSchema = z.object({
  cep: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  number: z.string().optional(),
  complement: z.string().optional(),
  state: z.string().min(1),
  neighborhood: z.string().min(1),
});

export type AddressData = z.infer<typeof addressSchema>;
