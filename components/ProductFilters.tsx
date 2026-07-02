"use client";

import type { CategorySummary } from "@/lib/storefront";

type ProductFiltersProps = {
  categories: CategorySummary[];
  brands: string[];
  basePath?: string;
  currentValues?: Record<string, string | undefined>;
  lockedCategory?: CategorySummary | null;
};

export function ProductFilters({
  categories,
  brands,
  basePath = "/produtos",
  currentValues,
  lockedCategory
}: ProductFiltersProps) {
  const hasValues = Object.values(currentValues ?? {}).some(Boolean);

  return (
    <form action={basePath} className="surface grid gap-4 rounded-[2rem] p-5 lg:grid-cols-4">
      <input
        name="q"
        defaultValue={currentValues?.q}
        placeholder="Buscar por titulo, marca, modelo ou descricao"
        className="input-base lg:col-span-2"
      />
      {lockedCategory ? (
        <input type="hidden" name="category" value={lockedCategory.id} />
      ) : (
        <select name="category" defaultValue={currentValues?.category} className="input-base">
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      <select name="brand" defaultValue={currentValues?.brand} className="input-base">
        <option value="">Todas as marcas</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <select name="condition" defaultValue={currentValues?.condition} className="input-base">
        <option value="">Novo e usado</option>
        <option value="new">Novo</option>
        <option value="used">Usado</option>
      </select>
      <input
        type="number"
        name="minPrice"
        defaultValue={currentValues?.minPrice}
        placeholder="Preco minimo"
        className="input-base"
      />
      <input
        type="number"
        name="maxPrice"
        defaultValue={currentValues?.maxPrice}
        placeholder="Preco maximo"
        className="input-base"
      />
      <select name="freeShipping" defaultValue={currentValues?.freeShipping} className="input-base">
        <option value="">Frete</option>
        <option value="true">Frete gratis</option>
      </select>
      <select name="inStock" defaultValue={currentValues?.inStock} className="input-base">
        <option value="">Estoque</option>
        <option value="true">Somente disponiveis</option>
      </select>
      <select name="sort" defaultValue={currentValues?.sort} className="input-base lg:col-span-2">
        <option value="latest">Mais recentes</option>
        <option value="price-asc">Menor preco</option>
        <option value="price-desc">Maior preco</option>
        <option value="best-selling">Mais vendidos</option>
        <option value="discount-desc">Maior desconto</option>
      </select>
      <div className="flex flex-wrap gap-3 lg:col-span-2 lg:justify-end">
        {hasValues ? (
          <a
            href={lockedCategory ? `${basePath}?category=${lockedCategory.id}` : basePath}
            className="button-secondary"
          >
            Limpar filtros
          </a>
        ) : null}
        <button type="submit" className="button-primary">
          Aplicar filtros
        </button>
      </div>
    </form>
  );
}
