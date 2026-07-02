"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "@/lib/validations";

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  async function onSubmit(values: ContactValues) {
    setSuccess(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      form.setError("root", {
        message: "Nao foi possivel enviar sua mensagem agora."
      });
      return;
    }

    form.reset();
    setSuccess("Mensagem enviada com sucesso. Retornaremos em breve.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="surface rounded-[2rem] p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Nome</label>
          <input {...form.register("name")} className="input-base" />
          {form.formState.errors.name ? (
            <p className="mt-2 text-xs text-rose-300">{form.formState.errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">E-mail</label>
          <input type="email" {...form.register("email")} className="input-base" />
          {form.formState.errors.email ? (
            <p className="mt-2 text-xs text-rose-300">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-300">Assunto</label>
        <input {...form.register("subject")} className="input-base" />
        {form.formState.errors.subject ? (
          <p className="mt-2 text-xs text-rose-300">{form.formState.errors.subject.message}</p>
        ) : null}
      </div>
      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-300">Mensagem</label>
        <textarea {...form.register("message")} rows={6} className="input-base h-auto py-4" />
        {form.formState.errors.message ? (
          <p className="mt-2 text-xs text-rose-300">{form.formState.errors.message.message}</p>
        ) : null}
      </div>
      {form.formState.errors.root ? (
        <p className="mt-4 text-sm text-rose-300">{form.formState.errors.root.message}</p>
      ) : null}
      {success ? <p className="mt-4 text-sm text-success">{success}</p> : null}
      <button type="submit" className="button-primary mt-6">
        Enviar mensagem
      </button>
    </form>
  );
}
