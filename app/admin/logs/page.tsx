import { AdminHeader } from "@/components/admin/AdminHeader";
import { getWebhookLogs } from "@/lib/storefront";
import { formatDate } from "@/lib/utils";

export default async function AdminLogsPage() {
  const logs = await getWebhookLogs();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Logs de webhook"
        description="Auditoria das notificacoes recebidas do Mercado Livre para produtos e pedidos."
      />
      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="surface rounded-[2rem] p-6 text-sm text-slate-300">
            Nenhum webhook recebido ainda. Configure a URL em producao e acompanhe os eventos por aqui.
          </div>
        ) : null}
        {logs.map((log) => (
          <div key={log.id} className="surface rounded-[2rem] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan">{log.topic}</p>
                <h2 className="mt-2 font-display text-2xl text-white">{log.resource}</h2>
              </div>
              <div className="text-sm text-slate-300">
                <p>Recebido em: {formatDate(log.receivedAt)}</p>
                <p>User ID: {log.userId ?? "N/A"}</p>
                <p>Application ID: {log.applicationId ?? "N/A"}</p>
                <p>Tentativas: {log.attempts}</p>
              </div>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
              {JSON.stringify(log.payload, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
