"use client";

import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";

type SyncButtonProps = {
  endpoint: string;
  label: string;
  method?: "POST" | "DELETE";
};

export function SyncButton({ endpoint, label, method = "POST" }: SyncButtonProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() =>
          startTransition(async () => {
            setMessage(null);
            const response = await fetch(endpoint, {
              method
            });
            const data = await response.json().catch(() => ({}));
            setMessage(data.message ?? (response.ok ? "Acao concluida com sucesso." : "Falha na operacao."));
          })
        }
        className="button-primary w-full"
      >
        {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
        {label}
      </button>
      {message ? <p className="text-xs text-slate-300">{message}</p> : null}
    </div>
  );
}
