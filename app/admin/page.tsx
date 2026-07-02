import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MetricCard } from "@/components/admin/MetricCard";
import { SyncButton } from "@/components/SyncButton";
import { formatDate } from "@/lib/utils";
import { getAdminDashboardMetrics, getIntegrationStatus } from "@/lib/storefront";

export default async function AdminDashboardPage() {
  const [metrics, integration] = await Promise.all([getAdminDashboardMetrics(), getIntegrationStatus()]);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dashboard administrativo"
        description="Visao geral da operacao com catalogo sincronizado, pedidos acumulados, faturamento estimado e status atual da integracao Mercado Livre."
        actions={
          <>
            <SyncButton endpoint="/api/mercadolivre/sync-products" label="Sincronizar produtos agora" />
            <SyncButton endpoint="/api/mercadolivre/sync-orders" label="Sincronizar pedidos agora" />
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Produtos" value={metrics.products} hint="Total de produtos sincronizados no catalogo." />
        <MetricCard
          title="Produtos ativos"
          value={metrics.activeProducts}
          hint="Itens ativos e prontos para exibir na vitrine."
        />
        <MetricCard title="Pedidos" value={metrics.orders} hint="Pedidos capturados e atualizados localmente." />
        <MetricCard
          title="Faturamento estimado"
          value={metrics.revenue}
          currency
          hint="Soma dos pedidos sincronizados no banco."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="surface rounded-[2rem] p-6">
          <h2 className="font-display text-2xl text-white">Acoes rapidas</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Link href="/admin/produtos" className="button-secondary text-center">
              Ver produtos sincronizados
            </Link>
            <Link href="/admin/pedidos" className="button-secondary text-center">
              Ver pedidos
            </Link>
            <Link href="/admin/integracao" className="button-secondary text-center">
              Integracao Mercado Livre
            </Link>
            <Link href="/admin/configuracoes" className="button-secondary text-center">
              Configuracoes da loja
            </Link>
          </div>
        </section>

        <section className="surface rounded-[2rem] p-6">
          <h2 className="font-display text-2xl text-white">Status da integracao</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p>Conectado: {integration.connected ? "Sim" : "Nao"}</p>
            <p>Seller ID: {integration.sellerId ?? "Nao conectado"}</p>
            <p>Token expira em: {formatDate(integration.tokenExpiresAt)}</p>
            <p>Ultima atualizacao: {formatDate(integration.lastUpdated)}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
