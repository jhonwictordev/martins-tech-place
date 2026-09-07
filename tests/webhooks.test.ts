import { describe, expect, it, vi } from "vitest";
import { processMeliWebhook } from "@/lib/mercadolivre/webhooks";

const payload = { topic: "items", resource: "/items/MLB123", user_id: 99, application_id: 7 };
const dependencies = () => ({
  createLog: vi.fn(async () => ({ id: "log-1" })),
  updateLog: vi.fn(async () => undefined),
  findAccount: vi.fn(async () => ({ userId: "user-1" })) as any,
  syncProduct: vi.fn(async () => ({ id: "product-1" })) as any,
  syncOrder: vi.fn(async () => ({ id: "order-1" })) as any,
});

describe("Mercado Livre webhook reliability", () => {
  it("synchronizes once and marks the notification complete", async () => {
    const deps = dependencies();
    const result = await processMeliWebhook(payload, deps);
    expect(result).toMatchObject({ received: true, synced: true, resourceType: "item" });
    expect(deps.syncProduct).toHaveBeenCalledWith("user-1", "MLB123");
    expect(deps.updateLog).toHaveBeenCalledWith("log-1", expect.objectContaining({ status: "completed" }));
  });

  it("recognizes duplicate notifications before synchronization", async () => {
    const deps = dependencies();
    deps.createLog.mockRejectedValueOnce(Object.assign(new Error("unique"), { code: "P2002" }));
    await expect(processMeliWebhook(payload, deps)).resolves.toMatchObject({ duplicate: true, synced: false });
    expect(deps.syncProduct).not.toHaveBeenCalled();
  });

  it("records synchronization failures without requesting an endless webhook retry", async () => {
    const deps = dependencies();
    deps.syncProduct.mockRejectedValueOnce(new Error("upstream unavailable"));
    await expect(processMeliWebhook(payload, deps)).resolves.toMatchObject({ status: "sync_failed", synced: false });
    expect(deps.updateLog).toHaveBeenCalledWith("log-1", expect.objectContaining({ status: "failed", error: "upstream unavailable" }));
  });
});
