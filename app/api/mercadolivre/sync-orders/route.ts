import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { syncOrders } from "@/lib/mercadolivre/orders";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Nao autorizado." }, { status: 401 });
  }

  if (!hasDatabaseUrl) {
    return NextResponse.json(
      {
        message: "Modo demo ativo. Configure DATABASE_URL para sincronizar pedidos reais."
      },
      { status: 400 }
    );
  }

  try {
    const result = await syncOrders(session.user.id);

    return NextResponse.json({
      message: `${result.syncedCount} pedidos sincronizados com sucesso.`,
      result
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Falha ao sincronizar pedidos."
      },
      { status: 500 }
    );
  }
}
