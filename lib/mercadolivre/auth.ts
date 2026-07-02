import type { MeliAccount } from "@prisma/client";
import { env, assertMeliEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
  user_id: number | string;
  refresh_token: string;
};

export function getMercadoLivreAuthorizationUrl(userId: string) {
  assertMeliEnv();
  const url = new URL("https://auth.mercadolivre.com.br/authorization");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", env.MELI_CLIENT_ID!);
  url.searchParams.set("redirect_uri", env.MELI_REDIRECT_URI!);
  url.searchParams.set("state", userId);

  return url.toString();
}

export async function exchangeCodeForToken(code: string) {
  assertMeliEnv();

  const response = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: env.MELI_CLIENT_ID,
      client_secret: env.MELI_CLIENT_SECRET,
      code,
      redirect_uri: env.MELI_REDIRECT_URI
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao trocar codigo OAuth: ${errorText}`);
  }

  return (await response.json()) as TokenResponse;
}

export async function saveMeliTokens(userId: string, payload: TokenResponse) {
  return prisma.meliAccount.upsert({
    where: { userId },
    update: {
      meliUserId: String(payload.user_id),
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      tokenExpiresAt: new Date(Date.now() + payload.expires_in * 1000),
      scope: payload.scope
    },
    create: {
      userId,
      meliUserId: String(payload.user_id),
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      tokenExpiresAt: new Date(Date.now() + payload.expires_in * 1000),
      scope: payload.scope
    }
  });
}

export async function refreshAccessToken(userId: string) {
  assertMeliEnv();
  const account = await prisma.meliAccount.findUnique({
    where: { userId }
  });

  if (!account) {
    throw new Error("Conta do Mercado Livre nao encontrada para renovacao de token.");
  }

  const response = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: env.MELI_CLIENT_ID,
      client_secret: env.MELI_CLIENT_SECRET,
      refresh_token: account.refreshToken
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao renovar token OAuth: ${errorText}`);
  }

  const refreshed = (await response.json()) as TokenResponse;
  await saveMeliTokens(userId, refreshed);

  return prisma.meliAccount.findUniqueOrThrow({
    where: { userId }
  });
}

export async function getValidMeliAccount(userId: string): Promise<MeliAccount | null> {
  const account = await prisma.meliAccount.findUnique({
    where: { userId }
  });

  if (!account) {
    return null;
  }

  const refreshThreshold = 60 * 1000;
  const isExpiringSoon = account.tokenExpiresAt.getTime() <= Date.now() + refreshThreshold;

  if (!isExpiringSoon) {
    return account;
  }

  return refreshAccessToken(userId);
}

export async function disconnectMeliAccount(userId: string) {
  await prisma.meliAccount.deleteMany({
    where: { userId }
  });
}

export async function getMeliAccountBySellerId(meliUserId: string) {
  return prisma.meliAccount.findFirst({
    where: { meliUserId }
  });
}
