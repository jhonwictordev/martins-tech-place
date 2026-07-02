import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Home } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container-shell grid gap-6 py-8 xl:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan hover:text-cyan"
          >
            <Home className="h-4 w-4" />
            Voltar para a loja
          </Link>
          <AdminSidebar />
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
