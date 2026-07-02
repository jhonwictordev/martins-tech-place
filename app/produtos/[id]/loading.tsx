import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ProductDetailLoading() {
  return (
    <div className="container-shell py-20">
      <LoadingSpinner label="Carregando detalhes do produto..." />
    </div>
  );
}
