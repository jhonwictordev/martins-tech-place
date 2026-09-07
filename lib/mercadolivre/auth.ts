import type { MeliAccount } from "@prisma/client";
import { env, assertMeliEnv } from "@/lib/env";
import { oauthStateSecret } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createOAuthState, requestOAuthToken, type OAuthTokenResponse } from "@/lib/mercadolivre/oauth";

export function getMercadoLivreAuthorizationUrl(userId: string) {
  assertMeliEnv();
  const url = new URL("https://auth.mercadolivre.com.br/authorization");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", env.MELI_CLIENT_ID!);
  url.searchParams.set("redirect_uri", env.MELI_REDIRECT_URI!);
  url.searchParams.set("state", createOAuthState(userId, oauthStateSecret()));

  return url.toString();
}

export async function exchangeCodeForToken(code: string) {
  assertMeliEnv();

  return requestOAuthToken(
    { code },
    { clientId: env.MELI_CLIENT_ID!, clientSecret: env.MELI_CLIENT_SECRET!, redirectUri: env.MELI_REDIRECT_URI! },
  );
}

export async function saveMeliTokens(userId: string, payload: OAuthTokenResponse) {
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

  const refreshed = await requestOAuthToken(
    { refreshToken: account.refreshToken },
    { clientId: env.MELI_CLIENT_ID!, clientSecret: env.MELI_CLIENT_SECRET!, redirectUri: env.MELI_REDIRECT_URI! },
  );
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
