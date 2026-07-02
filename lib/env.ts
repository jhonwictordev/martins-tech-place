import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().optional(),
  DEMO_ADMIN_EMAIL: z.string().optional(),
  DEMO_ADMIN_PASSWORD: z.string().optional(),
  MELI_CLIENT_ID: z.string().optional(),
  MELI_CLIENT_SECRET: z.string().optional(),
  MELI_REDIRECT_URI: z.string().optional(),
  MELI_SITE_ID: z.string().default("MLB")
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  DEMO_ADMIN_EMAIL: process.env.DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD: process.env.DEMO_ADMIN_PASSWORD,
  MELI_CLIENT_ID: process.env.MELI_CLIENT_ID,
  MELI_CLIENT_SECRET: process.env.MELI_CLIENT_SECRET,
  MELI_REDIRECT_URI: process.env.MELI_REDIRECT_URI,
  MELI_SITE_ID: process.env.MELI_SITE_ID ?? "MLB"
});

export const hasDatabaseUrl = Boolean(env.DATABASE_URL);
export const demoAdminEmail = env.DEMO_ADMIN_EMAIL?.trim() || null;
export const demoAdminPassword = env.DEMO_ADMIN_PASSWORD?.trim() || null;
export const hasDemoAdminCredentials = Boolean(demoAdminEmail && demoAdminPassword);

export const missingMeliEnv = () =>
  [
    "MELI_CLIENT_ID",
    "MELI_CLIENT_SECRET",
    "MELI_REDIRECT_URI"
  ].filter((key) => !env[key as keyof typeof env]);

export function assertMeliEnv() {
  const missing = missingMeliEnv();

  if (missing.length > 0) {
    throw new Error(
      `Variaveis do Mercado Livre ausentes: ${missing.join(", ")}. Configure o arquivo .env antes de conectar a conta.`
    );
  }
}
