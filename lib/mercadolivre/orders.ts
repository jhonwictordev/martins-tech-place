import { prisma } from "@/lib/prisma";
import { meliFetch } from "@/lib/mercadolivre/client";

type MeliOrderSearchResponse = {
  results: MeliOrder[];
};

type MeliOrder = {
  id: number | string;
  status: string;
  total_amount: number;
  currency_id: string;
  date_created: string;
  date_closed?: string | null;
  buyer?: {
    first_name?: string;
    nickname?: string;
  };
  order_items?: Array<{
    item?: {
      id?: string;
      title?: string;
    };
    quantity: number;
    unit_price: number;
  }>;
};

export async function getOrders(userId: string) {
  const account = await prisma.meliAccount.findUniqueOrThrow({
    where: { userId }
  });

  return meliFetch<MeliOrderSearchResponse>("/orders/search", {
    userId,
    searchParams: {
      seller: account.meliUserId,
      sort: "date_desc"
    }
  });
}

export async function getOrderById(userId: string, orderId: string) {
  return meliFetch<MeliOrder>(`/orders/${orderId}`, { userId });
}

async function upsertOrder(userId: string, order: MeliOrder) {
  const saved = await prisma.order.upsert({
    where: { meliOrderId: String(order.id) },
    update: {
      buyerName: order.buyer?.first_name ?? null,
      buyerNickname: order.buyer?.nickname ?? null,
      status: order.status,
      totalAmount: order.total_amount,
      currencyId: order.currency_id,
      dateCreated: new Date(order.date_created),
      dateClosed: order.date_closed ? new Date(order.date_closed) : null
    },
    create: {
      meliOrderId: String(order.id),
      buyerName: order.buyer?.first_name ?? null,
      buyerNickname: order.buyer?.nickname ?? null,
      status: order.status,
      totalAmount: order.total_amount,
      currencyId: order.currency_id,
      dateCreated: new Date(order.date_created),
      dateClosed: order.date_closed ? new Date(order.date_closed) : null
    }
  });

  await prisma.orderItem.deleteMany({
    where: { orderId: saved.id }
  });

  if (order.order_items?.length) {
    await prisma.orderItem.createMany({
      data: await Promise.all(
        order.order_items.map(async (item) => {
          const product = item.item?.id
            ? await prisma.product.findUnique({
                where: { meliItemId: item.item.id }
              })
            : null;

          return {
            orderId: saved.id,
            productId: product?.id,
            title: item.item?.title ?? "Item Mercado Livre",
            quantity: item.quantity,
            unitPrice: item.unit_price
          };
        })
      )
    });
  }

  return saved;
}

export async function syncOrders(userId: string) {
  const response = await getOrders(userId);
  const syncedIds: string[] = [];

  for (const order of response.results) {
    const saved = await upsertOrder(userId, order);
    syncedIds.push(saved.id);
  }

  return {
    syncedCount: syncedIds.length,
    syncedIds
  };
}

export async function syncSingleOrderById(userId: string, orderId: string) {
  const order = await getOrderById(userId, orderId);
  return upsertOrder(userId, order);
}
