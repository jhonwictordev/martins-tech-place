"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { storeSettingsSchema } from "@/lib/validations";

type StoreSettingsValues = {
  storeName: string;
  logoUrl?: string;
  whatsapp?: string;
  instagram?: string;
  email?: string;
  metaTitle: string;
  metaDescription: string;
};

export function AdminSettingsForm({ initialValues }: { initialValues: StoreSettingsValues }) {
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: initialValues
  });

  async function onSubmit(values: StoreSettingsValues) {
    setMessage(null);

    const response = await fetch("/api/store-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      form.setError("root", {
        message: data.message ?? "Nao foi possivel salvar as configuracoes."
      });
      return;
    }

    setMessage("Configuracoes da loja salvas com sucesso.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="surface rounded-[2rem] p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Nome da loja</label>
          <input {...form.register("storeName")} className="input-base" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Logo URL</label>
          <input {...form.register("logoUrl")} className="input-base" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">WhatsApp</label>
          <input {...form.register("whatsapp")} className="input-base" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Instagram</label>
          <input {...form.register("instagram")} className="input-base" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">E-mail</label>
          <input type="email" {...form.register("email")} className="input-base" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">SEO title</label>
          <input {...form.register("metaTitle")} className="input-base" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-300">SEO description</label>
        <textarea {...form.register("metaDescription")} rows={5} className="input-base h-auto py-4" />
      </div>
      {form.formState.errors.root ? (
        <p className="mt-4 text-sm text-rose-300">{form.formState.errors.root.message}</p>
      ) : null}
      {message ? <p className="mt-4 text-sm text-success">{message}</p> : null}
      <button type="submit" className="button-primary mt-6">
        Salvar configuracoes
      </button>
    </form>
  );
}
