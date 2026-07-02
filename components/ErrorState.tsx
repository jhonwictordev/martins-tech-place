type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({
  title = "Algo saiu do trilho",
  description = "Nao foi possivel carregar os dados agora. Tente novamente em instantes."
}: ErrorStateProps) {
  return (
    <div className="rounded-[2rem] border border-rose-500/30 bg-rose-950/20 px-6 py-10 text-center">
      <p className="font-display text-2xl text-white">{title}</p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-200">{description}</p>
    </div>
  );
}
