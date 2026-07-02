import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SyncButton } from "@/components/SyncButton";
import { hasDatabaseUrl, missingMeliEnv } from "@/lib/env";
import { getIntegrationStatus } from "@/lib/storefront";
import { formatDate } from "@/lib/utils";

export default async function AdminIntegrationPage() {
  const integration = await getIntegrationStatus();
  const missingEnv = missingMeliEnv();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Integracao Mercado Livre"
        description="Conecte sua conta via OAuth, acompanhe expiracao do token, sincronize produtos e pedidos e valide se os webhooks estao sendo recebidos."
      />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="surface rounded-[2rem] p-6">
          <h2 className="font-display text-2xl text-white">Status atual</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p>Conectado: {integration.connected ? "Sim" : "Nao"}</p>
            <p>Seller ID: {integration.sellerId ?? "Nao conectado"}</p>
            <p>Conectado por: {integration.connectedBy ?? "Nao identificado"}</p>
            <p>Token expira em: {formatDate(integration.tokenExpiresAt)}</p>
            <p>Ultima atualizacao: {formatDate(integration.lastUpdated)}</p>
          </div>

          {missingEnv.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-amber-100">
              Configure as variaveis de ambiente antes de conectar: {missingEnv.join(", ")}.
            </div>
          ) : null}
          {!hasDatabaseUrl ? (
            <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-cyan">
              Modo demo ativo. Para conexao OAuth real e sincronizacao persistente, configure DATABASE_URL em desenvolvimento e producao.
            </div>
          ) : null}

          <div className="mt-6 grid gap-3">
            <Link href="/api/mercadolivre/auth" className="button-primary text-center">
              Conectar Mercado Livre
            </Link>
            <SyncButton endpoint="/api/mercadolivre/disconnect" method="DELETE" label="Desconectar conta" />
          </div>
        </section>

        <section className="surface rounded-[2rem] p-6">
          <h2 className="font-display text-2xl text-white">Sincronizacao manual</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <SyncButton endpoint="/api/mercadolivre/sync-products" label="Sincronizar produtos agora" />
            <SyncButton endpoint="/api/mercadolivre/sync-orders" label="Sincronizar pedidos agora" />
            <SyncButton endpoint="/api/mercadolivre/sync-products" label="Atualizar estoque" />
            <SyncButton endpoint="/api/mercadolivre/sync-products" label="Atualizar precos" />
          </div>
        </section>
      </div>
    </div>
  );
}
