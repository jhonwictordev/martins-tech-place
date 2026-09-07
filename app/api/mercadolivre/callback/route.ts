import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, saveMeliTokens } from "@/lib/mercadolivre/auth";
import { oauthStateSecret } from "@/lib/env";
import { verifyOAuthState } from "@/lib/mercadolivre/oauth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/admin/integracao?error=missing_code", process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    );
  }

  try {
    const userId = verifyOAuthState(state, oauthStateSecret());
    const tokens = await exchangeCodeForToken(code);
    await saveMeliTokens(userId, tokens);

    return NextResponse.redirect(
      new URL("/admin/integracao?connected=1", process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "oauth_failed";
    return NextResponse.redirect(
      new URL(`/admin/integracao?error=${encodeURIComponent(message)}`, process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    );
  }
}
