import { NextResponse } from "next/server";
import { handleMeliWebhook } from "@/lib/mercadolivre/webhooks";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await handleMeliWebhook(payload);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Falha ao processar webhook."
      },
      { status: 400 }
    );
  }
}
