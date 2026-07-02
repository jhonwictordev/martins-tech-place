import { assertMeliEnv } from "@/lib/env";
import { getValidMeliAccount } from "@/lib/mercadolivre/auth";

const MERCADO_LIVRE_API_BASE = "https://api.mercadolibre.com";

type FetchOptions = {
  userId: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  searchParams?: Record<string, string | number | undefined>;
};

export async function meliFetch<T>(path: string, options: FetchOptions): Promise<T> {
  assertMeliEnv();
  const account = await getValidMeliAccount(options.userId);

  if (!account) {
    throw new Error("Conta do Mercado Livre nao conectada.");
  }

  const url = new URL(path, MERCADO_LIVRE_API_BASE);

  for (const [key, value] of Object.entries(options.searchParams ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${account.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mercado Livre API error ${response.status}: ${errorText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}
