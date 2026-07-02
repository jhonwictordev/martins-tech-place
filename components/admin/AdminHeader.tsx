import type { ReactNode } from "react";

type AdminHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-950/60 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-display text-3xl text-white">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
