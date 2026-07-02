import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Dados de contato invalidos.",
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Mensagem recebida com sucesso."
  });
}
