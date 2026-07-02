import Link from "next/link";
import { BarChart3, Boxes, Cable, FileStack, LayoutDashboard, Settings, ShoppingBag } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Boxes },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/integracao", label: "Integracao", icon: Cable },
  { href: "/admin/logs", label: "Logs", icon: FileStack },
  { href: "/admin/configuracoes", label: "Configuracoes", icon: Settings }
];

export function AdminSidebar() {
  return (
    <aside className="surface sticky top-6 hidden h-fit rounded-[2rem] p-5 xl:block">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Painel admin</p>
      <nav className="mt-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900/70 hover:text-cyan"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
        Dashboard com catalogo sincronizado, pedidos, configuracoes da loja e status da integracao Mercado Livre.
      </div>
    </aside>
  );
}
