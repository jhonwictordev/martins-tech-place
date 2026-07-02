import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="container-shell py-20">
      <LoadingSpinner label="Preparando a Martins Tech Place..." />
    </div>
  );
}
