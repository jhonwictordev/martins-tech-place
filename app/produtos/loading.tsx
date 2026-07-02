import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ProductsLoading() {
  return (
    <div className="container-shell py-20">
      <LoadingSpinner label="Carregando catalogo de produtos..." />
    </div>
  );
}
