import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getAdminOrders } from "@/lib/storefront";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Pedidos sincronizados"
        description="Pedidos capturados do Mercado Livre com comprador, status, total e itens associados ao catalogo local."
      />
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.meliOrderId} className="surface rounded-[2rem] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan">Pedido {order.meliOrderId}</p>
                <h2 className="mt-2 font-display text-2xl text-white">{order.buyerName ?? "Comprador Mercado Livre"}</h2>
                <p className="mt-2 text-sm text-slate-300">Nickname: {order.buyerNickname ?? "Nao informado"}</p>
              </div>
              <div className="text-sm text-slate-300">
                <p>Status: {order.status}</p>
                <p>Total: {formatCurrency(order.totalAmount, order.currencyId)}</p>
                <p>Criado em: {formatDate(order.dateCreated)}</p>
                <p>Fechado em: {formatDate(order.dateClosed)}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {order.items.map((item) => (
                <div
                  key={`${order.meliOrderId}-${item.title}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-sm text-slate-300"
                >
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-2">
                    Quantidade: {item.quantity} | Valor unitario: {formatCurrency(item.unitPrice, order.currencyId)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
