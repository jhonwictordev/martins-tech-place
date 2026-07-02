import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  pathname: string;
  query?: Record<string, string | undefined>;
};

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  pathname,
  query
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(currentPage - 2, 0),
    Math.min(currentPage + 1, totalPages)
  );

  const buildHref = (page: number) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query ?? {})) {
      if (value) {
        params.set(key, value);
      }
    }

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        className="button-secondary"
        aria-disabled={currentPage === 1}
      >
        Anterior
      </Link>
      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={
            page === currentPage
              ? "inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand font-semibold text-white"
              : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-950/60 text-slate-300 hover:border-cyan hover:text-cyan"
          }
        >
          {page}
        </Link>
      ))}
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        className="button-secondary"
        aria-disabled={currentPage === totalPages}
      >
        Proxima
      </Link>
    </div>
  );
}
