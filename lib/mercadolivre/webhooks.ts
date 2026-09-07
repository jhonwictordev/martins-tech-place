import crypto from "node:crypto";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getMeliAccountBySellerId } from "@/lib/mercadolivre/auth";
import { syncSingleOrderById } from "@/lib/mercadolivre/orders";
import { syncSingleProductByItemId } from "@/lib/mercadolivre/products";
import { webhookPayloadSchema } from "@/lib/validations";

const extractResourceId = (resource: string) => resource.split("/").filter(Boolean).at(-1) ?? resource;

type WebhookDeps = {
  createLog: (data: any) => Promise<{ id: string }>;
  updateLog: (id: string, data: any) => Promise<unknown>;
  findAccount: typeof getMeliAccountBySellerId;
  syncProduct: typeof syncSingleProductByItemId;
  syncOrder: typeof syncSingleOrderById;
};

export async function processMeliWebhook(payload: unknown, deps: WebhookDeps) {
  const parsed = webhookPayloadSchema.parse(payload);
  const userId = parsed.user_id ? String(parsed.user_id) : null;
  const applicationId = parsed.application_id ? String(parsed.application_id) : null;
  const eventKey = crypto.createHash("sha256").update([parsed.topic, parsed.resource, userId, applicationId].join("|")).digest("hex");
  let log: { id: string };
  try {
    log = await deps.createLog({
      eventKey, topic: parsed.topic, resource: parsed.resource, userId, applicationId,
      attempts: parsed.attempts ?? 1, status: "processing", payload: parsed as Prisma.InputJsonValue,
    });
  } catch (error: any) {
    if (error?.code === "P2002") return { received: true, synced: false, duplicate: true };
    throw error;
  }
  if (!userId) {
    await deps.updateLog(log.id, { status: "ignored" });
    return { received: true, synced: false };
  }
  const account = await deps.findAccount(userId);
  if (!account) {
    await deps.updateLog(log.id, { status: "ignored" });
    return { received: true, synced: false };
  }
  try {
    let resourceType: "item" | "order" | undefined;
    if (parsed.topic.includes("items") || parsed.resource.includes("/items/")) {
      await deps.syncProduct(account.userId, extractResourceId(parsed.resource));
      resourceType = "item";
    } else if (parsed.topic.includes("orders") || parsed.resource.includes("/orders/")) {
      await deps.syncOrder(account.userId, extractResourceId(parsed.resource));
      resourceType = "order";
    }
    await deps.updateLog(log.id, { status: resourceType ? "completed" : "ignored", processedAt: new Date(), error: null });
    return { received: true, synced: Boolean(resourceType), resourceType };
  } catch (error) {
    await deps.updateLog(log.id, {
      status: "failed", processedAt: new Date(),
      error: error instanceof Error ? error.message.slice(0, 500) : "sync_failed",
    });
    return { received: true, synced: false, status: "sync_failed" };
  }
}

export function handleMeliWebhook(payload: unknown) {
  return processMeliWebhook(payload, {
    createLog: (data) => prisma.webhookLog.create({ data }),
    updateLog: (id, data) => prisma.webhookLog.update({ where: { id }, data }),
    findAccount: getMeliAccountBySellerId,
    syncProduct: syncSingleProductByItemId,
    syncOrder: syncSingleOrderById,
  });
}
