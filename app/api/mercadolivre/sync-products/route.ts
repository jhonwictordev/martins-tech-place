import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { syncSellerProducts } from "@/lib/mercadolivre/products";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Nao autorizado." }, { status: 401 });
  }

  if (!hasDatabaseUrl) {
    return NextResponse.json(
      {
        message: "Modo demo ativo. Configure DATABASE_URL para sincronizar produtos reais."
      },
      { status: 400 }
    );
  }

  try {
    const result = await syncSellerProducts(session.user.id);

    return NextResponse.json({
      message: `${result.syncedCount} produtos sincronizados com sucesso.`,
      result
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Falha ao sincronizar produtos."
      },
      { status: 500 }
    );
  }
}
