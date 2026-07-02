import type { StoreSettings } from "@prisma/client";

export type DemoAttribute = {
  name: string;
  value: string;
};

export type DemoProduct = {
  id: string;
  meliItemId: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  currencyId: string;
  availableQuantity: number;
  soldQuantity: number;
  condition: string;
  permalink: string;
  thumbnail: string;
  categoryId: string;
  categoryName: string;
  brand?: string;
  model?: string;
  freeShipping: boolean;
  status: string;
  updatedAt: string;
  images: string[];
  attributes: DemoAttribute[];
};

export const demoCategories = [
  { meliCategoryId: "MLB1055", name: "Celulares", parentId: null },
  { meliCategoryId: "MLB1648", name: "Notebooks", parentId: null },
  { meliCategoryId: "MLB430269", name: "PCs Gamer", parentId: null },
  { meliCategoryId: "MLB14407", name: "Monitores", parentId: null },
  { meliCategoryId: "MLB1672", name: "SSDs", parentId: null },
  { meliCategoryId: "MLB1011", name: "HDs externos", parentId: null },
  { meliCategoryId: "MLB3697", name: "Fones Bluetooth", parentId: null },
  { meliCategoryId: "MLB418451", name: "Teclados", parentId: null },
  { meliCategoryId: "MLB418450", name: "Mouses", parentId: null },
  { meliCategoryId: "MLB1002", name: "Smart TVs", parentId: null },
  { meliCategoryId: "MLB432417", name: "Acessorios para celular", parentId: null },
  { meliCategoryId: "MLB430901", name: "Roteadores", parentId: null },
  { meliCategoryId: "MLB1499", name: "Impressoras", parentId: null },
  { meliCategoryId: "MLB438150", name: "Cameras de seguranca", parentId: null },
  { meliCategoryId: "MLB127600", name: "Smartwatch", parentId: null }
];

export const demoProducts: DemoProduct[] = [
  {
    id: "demo-iphone-14",
    meliItemId: "MLB1000001",
    title: "iPhone 14 128GB Azul com Garantia Nacional",
    description:
      "Smartphone premium com camera dupla, tela Super Retina XDR e desempenho fluido para fotos, videos e jogos.",
    price: 4199,
    originalPrice: 4699,
    currencyId: "BRL",
    availableQuantity: 17,
    soldQuantity: 193,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/iphone-14-128gb-azul",
    thumbnail:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB1055",
    categoryName: "Celulares",
    brand: "Apple",
    model: "iPhone 14",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-01T18:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Tela", value: "6.1 polegadas OLED" },
      { name: "Armazenamento", value: "128 GB" },
      { name: "Camera", value: "12 MP dupla" },
      { name: "Bateria", value: "Ate 20h de video" }
    ]
  },
  {
    id: "demo-lenovo-ideapad",
    meliItemId: "MLB1000002",
    title: "Notebook Lenovo IdeaPad 3 Ryzen 7 16GB 512GB SSD",
    description:
      "Notebook para produtividade e estudo com tela Full HD, processador Ryzen 7 e SSD rapido para uso profissional.",
    price: 3599,
    originalPrice: 3999,
    currencyId: "BRL",
    availableQuantity: 12,
    soldQuantity: 91,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/notebook-lenovo-ideapad-3-ryzen-7",
    thumbnail:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB1648",
    categoryName: "Notebooks",
    brand: "Lenovo",
    model: "IdeaPad 3",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-01T17:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Processador", value: "AMD Ryzen 7" },
      { name: "Memoria RAM", value: "16 GB DDR4" },
      { name: "Armazenamento", value: "512 GB SSD NVMe" },
      { name: "Tela", value: "15.6 polegadas Full HD" }
    ]
  },
  {
    id: "demo-pc-gamer",
    meliItemId: "MLB1000003",
    title: "PC Gamer Ryzen 5 RTX 4060 16GB SSD 1TB",
    description:
      "Setup gamer pronto para jogar em Full HD e Quad HD com gabinete airflow, SSD rapido e placa RTX serie 40.",
    price: 6499,
    originalPrice: 7299,
    currencyId: "BRL",
    availableQuantity: 6,
    soldQuantity: 54,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/pc-gamer-rtx-4060-ryzen-5",
    thumbnail:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB430269",
    categoryName: "PCs Gamer",
    brand: "Martins Tech Place",
    model: "RTX 4060 Pro",
    freeShipping: false,
    status: "active",
    updatedAt: "2026-06-30T19:20:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Placa de video", value: "NVIDIA GeForce RTX 4060 8 GB" },
      { name: "Processador", value: "AMD Ryzen 5 5600" },
      { name: "Memoria RAM", value: "16 GB DDR4" },
      { name: "Armazenamento", value: "SSD NVMe 1 TB" }
    ]
  },
  {
    id: "demo-monitor-gamer",
    meliItemId: "MLB1000004",
    title: "Monitor Gamer 27 Polegadas 165Hz IPS Full HD",
    description:
      "Monitor gamer com painel IPS, taxa de 165Hz e baixo tempo de resposta para jogabilidade competitiva.",
    price: 1399,
    originalPrice: 1699,
    currencyId: "BRL",
    availableQuantity: 22,
    soldQuantity: 144,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/monitor-gamer-27-165hz",
    thumbnail:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB14407",
    categoryName: "Monitores",
    brand: "AOC",
    model: "Hero 27G2",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-06-29T21:20:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Tamanho", value: "27 polegadas" },
      { name: "Taxa de atualizacao", value: "165Hz" },
      { name: "Painel", value: "IPS" },
      { name: "Resolucao", value: "Full HD" }
    ]
  },
  {
    id: "demo-ssd-1tb",
    meliItemId: "MLB1000005",
    title: "SSD NVMe 1TB PCIe 4.0 Leitura 7000MB/s",
    description:
      "SSD de alta performance para notebooks e desktops com tempo de carregamento reduzido e cache dinamico.",
    price: 479,
    originalPrice: 599,
    currencyId: "BRL",
    availableQuantity: 38,
    soldQuantity: 280,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/ssd-nvme-1tb-pcie-40",
    thumbnail:
      "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB1672",
    categoryName: "SSDs",
    brand: "Kingston",
    model: "NV2 1TB",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-01T08:15:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Capacidade", value: "1 TB" },
      { name: "Interface", value: "PCIe 4.0 x4" },
      { name: "Leitura", value: "Ate 7000 MB/s" },
      { name: "Gravacao", value: "Ate 5000 MB/s" }
    ]
  },
  {
    id: "demo-hd-externo",
    meliItemId: "MLB1000006",
    title: "HD Externo 2TB USB 3.0 Portatil",
    description:
      "Armazenamento portatil para backup, fotos e documentos com alimentacao via USB e corpo compacto.",
    price: 389,
    originalPrice: 429,
    currencyId: "BRL",
    availableQuantity: 44,
    soldQuantity: 120,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/hd-externo-2tb-usb-30",
    thumbnail:
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB1011",
    categoryName: "HDs externos",
    brand: "Seagate",
    model: "Portable 2TB",
    freeShipping: false,
    status: "active",
    updatedAt: "2026-06-28T13:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Capacidade", value: "2 TB" },
      { name: "Conexao", value: "USB 3.0" },
      { name: "Compatibilidade", value: "Windows e macOS" }
    ]
  },
  {
    id: "demo-fone-bt",
    meliItemId: "MLB1000007",
    title: "Fone Bluetooth ANC com Graves Intensos",
    description:
      "Fone sem fio com cancelamento de ruido, bateria de longa duracao e microfones duplos para chamadas nitidas.",
    price: 329,
    originalPrice: 449,
    currencyId: "BRL",
    availableQuantity: 31,
    soldQuantity: 242,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/fone-bluetooth-anc-graves-intensos",
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB3697",
    categoryName: "Fones Bluetooth",
    brand: "JBL",
    model: "Tune Beam",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-02T01:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Conectividade", value: "Bluetooth 5.3" },
      { name: "Bateria", value: "Ate 32 horas com estojo" },
      { name: "Cancelamento de ruido", value: "ANC inteligente" }
    ]
  },
  {
    id: "demo-teclado-rgb",
    meliItemId: "MLB1000008",
    title: "Teclado Mecanico RGB Switch Brown ABNT2",
    description:
      "Teclado mecanico com iluminacao RGB, estrutura resistente e switches Brown para digitacao precisa.",
    price: 299,
    originalPrice: 359,
    currencyId: "BRL",
    availableQuantity: 25,
    soldQuantity: 88,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/teclado-mecanico-rgb-switch-brown",
    thumbnail:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB418451",
    categoryName: "Teclados",
    brand: "Redragon",
    model: "K617",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-06-30T12:30:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Layout", value: "ABNT2" },
      { name: "Switch", value: "Brown" },
      { name: "Conexao", value: "USB-C" }
    ]
  },
  {
    id: "demo-mouse-wireless",
    meliItemId: "MLB1000009",
    title: "Mouse Gamer Wireless 26000 DPI Ultralight",
    description:
      "Mouse sem fio de alta precisao, design leve e sensor premium para jogabilidade competitiva.",
    price: 259,
    originalPrice: 319,
    currencyId: "BRL",
    availableQuantity: 40,
    soldQuantity: 167,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/mouse-gamer-wireless-26000-dpi",
    thumbnail:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB418450",
    categoryName: "Mouses",
    brand: "Logitech",
    model: "G Pro Wireless",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-01T14:20:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Sensor", value: "26000 DPI" },
      { name: "Peso", value: "63 g" },
      { name: "Conexao", value: "Wireless Lightspeed" }
    ]
  },
  {
    id: "demo-smart-tv",
    meliItemId: "MLB1000010",
    title: "Smart TV 50 Polegadas 4K HDR Google TV",
    description:
      "Tela 4K com HDR, assistentes de voz e apps de streaming para entretenimento em alta definicao.",
    price: 2499,
    originalPrice: 2899,
    currencyId: "BRL",
    availableQuantity: 11,
    soldQuantity: 73,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/smart-tv-50-4k-google-tv",
    thumbnail:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB1002",
    categoryName: "Smart TVs",
    brand: "TCL",
    model: "P635",
    freeShipping: false,
    status: "active",
    updatedAt: "2026-06-27T18:40:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Tela", value: "50 polegadas 4K UHD" },
      { name: "Sistema", value: "Google TV" },
      { name: "HDR", value: "HDR10" }
    ]
  },
  {
    id: "demo-roteador-wifi6",
    meliItemId: "MLB1000011",
    title: "Roteador Wi-Fi 6 AX3000 Dual Band Mesh",
    description:
      "Roteador de alto desempenho para streaming, home office e jogos online com baixa latencia.",
    price: 589,
    originalPrice: 699,
    currencyId: "BRL",
    availableQuantity: 19,
    soldQuantity: 61,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/roteador-wifi-6-ax3000",
    thumbnail:
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB430901",
    categoryName: "Roteadores",
    brand: "TP-Link",
    model: "Archer AX55",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-01T10:10:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Padrao", value: "Wi-Fi 6 AX3000" },
      { name: "Bandas", value: "Dual Band" },
      { name: "Recursos", value: "Mesh, OFDMA e MU-MIMO" }
    ]
  },
  {
    id: "demo-smartwatch",
    meliItemId: "MLB1000012",
    title: "Smartwatch AMOLED com GPS e 10 Dias de Bateria",
    description:
      "Relogio inteligente com notificacoes, monitoramento de saude, GPS integrado e tela AMOLED brilhante.",
    price: 699,
    originalPrice: 849,
    currencyId: "BRL",
    availableQuantity: 27,
    soldQuantity: 102,
    condition: "new",
    permalink: "https://lista.mercadolivre.com.br/smartwatch-amoled-gps-10-dias",
    thumbnail:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=80",
    categoryId: "MLB127600",
    categoryName: "Smartwatch",
    brand: "Amazfit",
    model: "GTR 4",
    freeShipping: true,
    status: "active",
    updatedAt: "2026-07-02T02:10:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=80"
    ],
    attributes: [
      { name: "Tela", value: "AMOLED 1.43 polegadas" },
      { name: "Bateria", value: "Ate 10 dias" },
      { name: "Sensores", value: "Frequencia cardiaca, SpO2, GPS" }
    ]
  }
];

export const demoOrders = [
  {
    meliOrderId: "2000001",
    buyerName: "Lucas Andrade",
    buyerNickname: "lucas.tech",
    status: "paid",
    totalAmount: 4199,
    currencyId: "BRL",
    dateCreated: "2026-06-30T10:10:00.000Z",
    dateClosed: null,
    items: [
      {
        productMeliItemId: "MLB1000001",
        title: "iPhone 14 128GB Azul com Garantia Nacional",
        quantity: 1,
        unitPrice: 4199
      }
    ]
  },
  {
    meliOrderId: "2000002",
    buyerName: "Mariana Costa",
    buyerNickname: "mari.setup",
    status: "ready_to_ship",
    totalAmount: 1558,
    currencyId: "BRL",
    dateCreated: "2026-07-01T09:30:00.000Z",
    dateClosed: null,
    items: [
      {
        productMeliItemId: "MLB1000004",
        title: "Monitor Gamer 27 Polegadas 165Hz IPS Full HD",
        quantity: 1,
        unitPrice: 1399
      },
      {
        productMeliItemId: "MLB1000008",
        title: "Teclado Mecanico RGB Switch Brown ABNT2",
        quantity: 1,
        unitPrice: 159
      }
    ]
  },
  {
    meliOrderId: "2000003",
    buyerName: "Thiago Silva",
    buyerNickname: "thiagodeals",
    status: "delivered",
    totalAmount: 589,
    currencyId: "BRL",
    dateCreated: "2026-06-28T12:00:00.000Z",
    dateClosed: "2026-06-29T14:45:00.000Z",
    items: [
      {
        productMeliItemId: "MLB1000011",
        title: "Roteador Wi-Fi 6 AX3000 Dual Band Mesh",
        quantity: 1,
        unitPrice: 589
      }
    ]
  }
];

export const defaultStoreSettings: Partial<StoreSettings> = {
  storeName: "Martins Tech Place",
  logoUrl: "/logo-martins-techplace.png",
  whatsapp: "+55 11 98888-0000",
  instagram: "@martinstechplace",
  email: "contato@martinstechplace.com",
  metaTitle: "Loja de Tecnologia | Ofertas em Celulares, Notebooks e Eletronicos",
  metaDescription:
    "Compre produtos de tecnologia, celulares, notebooks, perifericos, acessorios e eletronicos com ofertas atualizadas do Mercado Livre."
};
