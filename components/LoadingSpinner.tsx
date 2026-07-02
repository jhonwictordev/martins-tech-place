import { LoaderCircle } from "lucide-react";

export function LoadingSpinner({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/60 px-6 py-10 text-center">
      <LoaderCircle className="h-8 w-8 animate-spin text-cyan" />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
}
