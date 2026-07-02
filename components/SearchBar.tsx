"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  defaultValue?: string;
  action?: string;
  placeholder?: string;
};

export function SearchBar({
  defaultValue,
  action = "/busca",
  placeholder = "Buscar celulares, notebooks, perifericos e eletronicos"
}: SearchBarProps) {
  return (
    <form action={action} className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-slate-700 bg-slate-950/80 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-cyan"
      />
    </form>
  );
}
