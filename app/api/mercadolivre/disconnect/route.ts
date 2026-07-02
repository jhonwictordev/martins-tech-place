import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { disconnectMeliAccount } from "@/lib/mercadolivre/auth";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Nao autorizado." }, { status: 401 });
  }

  if (!hasDatabaseUrl) {
    return NextResponse.json(
      {
        message: "Modo demo ativo. Nao ha conta Mercado Livre persistida para desconectar."
      },
      { status: 400 }
    );
  }

  await disconnectMeliAccount(session.user.id);

  return NextResponse.json({
    message: "Conta do Mercado Livre desconectada."
  });
}
