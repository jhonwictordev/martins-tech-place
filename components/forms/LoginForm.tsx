"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validations";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const redirectTo = searchParams.get("callbackUrl") ?? "/admin";
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginValues) {
    setError(null);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: redirectTo
    });

    if (response?.error) {
      setError("Nao foi possivel autenticar. Verifique suas credenciais.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="surface mx-auto max-w-lg rounded-[2rem] p-8">
      <h1 className="font-display text-3xl text-white">Entrar no painel</h1>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Use sua conta administrativa para conectar o Mercado Livre, sincronizar produtos e acompanhar pedidos.
      </p>
      <p className="mt-2 text-xs leading-6 text-slate-400">
        Em ambientes sem banco, configure credenciais administrativas via variaveis de ambiente antes de acessar o painel.
      </p>
      <div className="mt-8 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">E-mail</label>
          <input type="email" {...form.register("email")} className="input-base" />
          {form.formState.errors.email ? (
            <p className="mt-2 text-xs text-rose-300">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Senha</label>
          <input type="password" {...form.register("password")} className="input-base" />
          {form.formState.errors.password ? (
            <p className="mt-2 text-xs text-rose-300">{form.formState.errors.password.message}</p>
          ) : null}
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="button-primary mt-6 w-full disabled:opacity-70"
      >
        {form.formState.isSubmitting ? "Entrando..." : "Acessar painel"}
      </button>
    </form>
  );
}
