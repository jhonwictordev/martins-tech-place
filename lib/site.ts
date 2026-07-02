export const siteConfig = {
  name: "Martins Tech Place",
  description:
    "Loja de tecnologia integrada ao Mercado Livre com ofertas atualizadas automaticamente.",
  slogan: "Tecnologia com preco de Mercado Livre",
  heroSubtitle:
    "Encontre celulares, notebooks, perifericos, acessorios e eletronicos com ofertas atualizadas automaticamente.",
  url: process.env.NEXTAUTH_URL ?? "http://localhost:3000"
};

export const mainCategories = [
  "Celulares",
  "Notebooks",
  "PCs Gamer",
  "Monitores",
  "SSDs",
  "HDs externos",
  "Fones Bluetooth",
  "Teclados",
  "Mouses",
  "Smart TVs",
  "Acessorios para celular",
  "Roteadores",
  "Impressoras",
  "Cameras de seguranca",
  "Smartwatch"
];

export const storefrontBenefits = [
  {
    title: "Compra segura pelo Mercado Livre",
    description: "Clique e finalize sua compra no Mercado Livre com protecao da plataforma."
  },
  {
    title: "Produtos atualizados automaticamente",
    description: "Sincronizacao de estoque, preco e status dos anuncios em tempo real."
  },
  {
    title: "Ofertas de tecnologia",
    description: "Os eletronicos mais buscados em um so lugar, com curadoria de alta demanda."
  },
  {
    title: "Envio rapido conforme anuncio",
    description: "Consulte frete gratis, reputacao e prazo diretamente no anuncio oficial."
  }
];

export const commercialMessages = [
  "Compre com seguranca pelo Mercado Livre",
  "Ofertas atualizadas automaticamente",
  "Produtos de tecnologia em destaque",
  "Os eletronicos mais buscados em um so lugar",
  "Clique e finalize sua compra no Mercado Livre"
];
