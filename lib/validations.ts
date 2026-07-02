import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail valido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.")
});

export const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail valido."),
  subject: z.string().min(4, "Informe o assunto do contato."),
  message: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
});

const logoUrlSchema = z
  .string()
  .refine((value) => value === "" || value.startsWith("/") || z.string().url().safeParse(value).success, {
    message: "Informe uma URL valida ou um caminho local iniciado por /."
  });

export const storeSettingsSchema = z.object({
  storeName: z.string().min(2),
  logoUrl: logoUrlSchema.optional().or(z.literal("")),
  whatsapp: z.string().min(8).optional().or(z.literal("")),
  instagram: z.string().min(2).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(20)
});

export const productFiltersSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  condition: z.enum(["new", "used"]).optional(),
  freeShipping: z.enum(["true", "false"]).optional(),
  inStock: z.enum(["true", "false"]).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sort: z
    .enum([
      "price-asc",
      "price-desc",
      "best-selling",
      "latest",
      "discount-desc"
    ])
    .optional(),
  page: z.coerce.number().min(1).default(1)
});

export const webhookPayloadSchema = z
  .object({
    topic: z.string(),
    resource: z.string(),
    user_id: z.union([z.string(), z.number()]).optional(),
    application_id: z.union([z.string(), z.number()]).optional(),
    attempts: z.number().optional()
  })
  .passthrough();
