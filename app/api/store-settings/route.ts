import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { storeSettingsSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Nao autorizado." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = storeSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Configuracoes invalidas.",
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  if (!hasDatabaseUrl) {
    return NextResponse.json(
      {
        message: "Modo demo ativo. Configure DATABASE_URL para salvar configuracoes persistentes."
      },
      { status: 400 }
    );
  }

  const existing = await prisma.storeSettings.findFirst();

  if (existing) {
    await prisma.storeSettings.update({
      where: { id: existing.id },
      data: parsed.data
    });
  } else {
    await prisma.storeSettings.create({
      data: parsed.data
    });
  }

  return NextResponse.json({ message: "Configuracoes salvas com sucesso." });
}
