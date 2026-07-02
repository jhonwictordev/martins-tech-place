import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { getMercadoLivreAuthorizationUrl } from "@/lib/mercadolivre/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL ?? "http://localhost:3000"));
  }

  if (!hasDatabaseUrl) {
    return NextResponse.redirect(
      new URL("/admin/integracao?error=configure_database_url", process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    );
  }

  return NextResponse.redirect(new URL(getMercadoLivreAuthorizationUrl(session.user.id)));
}
