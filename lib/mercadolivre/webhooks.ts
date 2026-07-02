import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getMeliAccountBySellerId } from "@/lib/mercadolivre/auth";
import { syncSingleOrderById } from "@/lib/mercadolivre/orders";
import { syncSingleProductByItemId } from "@/lib/mercadolivre/products";
import { webhookPayloadSchema } from "@/lib/validations";

function extractResourceId(resource: string) {
  const segments = resource.split("/").filter(Boolean);
  return segments.at(-1) ?? resource;
}

export async function handleMeliWebhook(payload: unknown) {
  const parsed = webhookPayloadSchema.parse(payload);
  const userId = parsed.user_id ? String(parsed.user_id) : null;
  const applicationId = parsed.application_id ? String(parsed.application_id) : null;

  await prisma.webhookLog.create({
    data: {
      topic: parsed.topic,
      resource: parsed.resource,
      userId,
      applicationId,
      attempts: parsed.attempts ?? 1,
      payload: parsed as Prisma.InputJsonValue
    }
  });

  if (!userId) {
    return { received: true, synced: false };
  }

  const account = await getMeliAccountBySellerId(userId);

  if (!account) {
    return { received: true, synced: false };
  }

  if (parsed.topic.includes("items") || parsed.resource.includes("/items/")) {
    await syncSingleProductByItemId(account.userId, extractResourceId(parsed.resource));
    return { received: true, synced: true, resourceType: "item" };
  }

  if (parsed.topic.includes("orders") || parsed.resource.includes("/orders/")) {
    await syncSingleOrderById(account.userId, extractResourceId(parsed.resource));
    return { received: true, synced: true, resourceType: "order" };
  }

  return { received: true, synced: false };
}
