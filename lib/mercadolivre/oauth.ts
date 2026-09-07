import crypto from "node:crypto";

export type OAuthTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
  user_id: number | string;
  refresh_token: string;
};

type OAuthConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export function createOAuthState(userId: string, secret: string) {
  const encoded = Buffer.from(JSON.stringify({ userId, issuedAt: Date.now() })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyOAuthState(state: string, secret: string, maxAgeMs = 10 * 60 * 1000) {
  const [encoded, signature] = state.split(".");
  if (!encoded || !signature) throw new Error("OAuth state invalido.");
  const expected = crypto.createHmac("sha256", secret).update(encoded).digest();
  const received = Buffer.from(signature, "base64url");
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
    throw new Error("OAuth state invalido.");
  }
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { userId: string; issuedAt: number };
  if (!payload.userId || !payload.issuedAt || Date.now() - payload.issuedAt > maxAgeMs) throw new Error("OAuth state expirado.");
  return payload.userId;
}

export async function requestOAuthToken(
  grant: { code: string } | { refreshToken: string },
  config: OAuthConfig,
  fetcher: typeof fetch = fetch,
) {
  const body =
    "code" in grant
      ? { grant_type: "authorization_code", code: grant.code, redirect_uri: config.redirectUri }
      : { grant_type: "refresh_token", refresh_token: grant.refreshToken };
  const response = await fetcher("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...body, client_id: config.clientId, client_secret: config.clientSecret }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Mercado Livre OAuth ${response.status}: ${await response.text()}`);
  const token = (await response.json()) as OAuthTokenResponse;
  if (!token.access_token || !token.refresh_token || !Number.isFinite(token.expires_in)) {
    throw new Error("Resposta OAuth incompleta.");
  }
  return token;
}
