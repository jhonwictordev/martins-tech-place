import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSettingsForm } from "@/components/forms/AdminSettingsForm";
import { getStoreSettings } from "@/lib/storefront";

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Configuracoes da loja"
        description="Atualize nome da marca, contatos, redes sociais e metadata padrao utilizada no SEO da home."
      />
      <AdminSettingsForm
        initialValues={{
          storeName: settings.storeName ?? "Martins Tech Place",
          logoUrl: settings.logoUrl ?? "",
          whatsapp: settings.whatsapp ?? "",
          instagram: settings.instagram ?? "",
          email: settings.email ?? "",
          metaTitle:
            settings.metaTitle ?? "Loja de Tecnologia | Ofertas em Celulares, Notebooks e Eletronicos",
          metaDescription:
            settings.metaDescription ??
            "Compre produtos de tecnologia, celulares, notebooks, perifericos, acessorios e eletronicos com ofertas atualizadas do Mercado Livre."
        }}
      />
    </div>
  );
}
