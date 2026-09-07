import { describe, expect, it, vi } from "vitest";
import { createOAuthState, requestOAuthToken, verifyOAuthState } from "@/lib/mercadolivre/oauth";

const config = { clientId: "client", clientSecret: "secret", redirectUri: "https://example.test/callback" };

describe("Mercado Livre OAuth", () => {
  it("signs, verifies and rejects tampered state", () => {
    const state = createOAuthState("user-123", "state-secret");
    expect(verifyOAuthState(state, "state-secret")).toBe("user-123");
    expect(() => verifyOAuthState(state + "tampered", "state-secret")).toThrow(/state invalido/);
  });

  it("exchanges authorization codes without exposing credentials in the URL", async () => {
    const fetcher = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body));
      expect(body).toMatchObject({ grant_type: "authorization_code", code: "code-1", client_secret: "secret" });
      return new Response(JSON.stringify({ access_token: "access", refresh_token: "refresh", token_type: "bearer", expires_in: 3600, user_id: 10 }));
    });
    const token = await requestOAuthToken({ code: "code-1" }, config, fetcher as typeof fetch);
    expect(token.access_token).toBe("access");
    expect(fetcher).toHaveBeenCalledWith("https://api.mercadolibre.com/oauth/token", expect.any(Object));
  });

  it("uses the refresh-token grant and rejects provider failures", async () => {
    const fetcher = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      expect(JSON.parse(String(init?.body))).toMatchObject({ grant_type: "refresh_token", refresh_token: "old-refresh" });
      return new Response("expired refresh token", { status: 401 });
    });
    await expect(requestOAuthToken({ refreshToken: "old-refresh" }, config, fetcher as typeof fetch)).rejects.toThrow(/OAuth 401/);
  });
});
