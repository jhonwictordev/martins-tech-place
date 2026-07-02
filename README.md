# Martins Tech Place

Loja virtual moderna de tecnologia integrada ao Mercado Livre, desenvolvida com Next.js 14+, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL e NextAuth.

## O que o projeto entrega

- Home completa com hero comercial, categorias, destaques, ofertas relampago, mais vendidos e beneficios.
- Catalogo com busca, filtros por categoria, preco, marca, condicao, frete gratis, estoque e ordenacao.
- Pagina individual de produto com galeria, caracteristicas tecnicas, informacoes do vendedor e botao de compra no Mercado Livre.
- Blog com posts em Markdown e SEO estruturado.
- Painel administrativo protegido em `/admin`.
- Integracao OAuth com Mercado Livre.
- Sincronizacao manual de produtos e pedidos.
- Endpoint de webhook para atualizar catalogo e pedidos.
- Prisma schema completo com produtos, imagens, atributos, pedidos, logs e configuracoes da loja.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth com Credentials
- API Routes
- Zod
- React Hook Form
- Fetch nativo

## Estrutura principal

```txt
app/
  page.tsx
  produtos/
  categorias/
  ofertas/
  mais-vendidos/
  busca/
  blog/
  admin/
  api/
components/
lib/
  mercadolivre/
prisma/
content/blog/
public/
styles/
```

## Variaveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e defina valores proprios para cada chave:

```env
MELI_CLIENT_ID=
MELI_CLIENT_SECRET=
MELI_REDIRECT_URI=http://localhost:3000/api/mercadolivre/callback
MELI_SITE_ID=MLB
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
NEXTAUTH_SECRET=gere-um-segredo-forte
NEXTAUTH_URL=http://localhost:3000
DEMO_ADMIN_EMAIL=admin@seudominio.com
DEMO_ADMIN_PASSWORD=defina-uma-senha-forte
```

## Instalacao

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Projeto local:

- Loja: `http://localhost:3000`
- Admin: `http://localhost:3000/login`

As credenciais administrativas sao definidas por `DEMO_ADMIN_EMAIL` e `DEMO_ADMIN_PASSWORD`. Nao publique senhas reais no repositorio.

## Comandos principais

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Outros comandos:

```bash
npm run build
npm run start
npm run lint
```

## Como criar o app no Mercado Livre Developers

1. Acesse o painel de desenvolvedores do Mercado Livre.
2. Crie um novo aplicativo.
3. Copie o `Client ID` e o `Client Secret`.
4. Configure a URL de redirecionamento:

```txt
http://localhost:3000/api/mercadolivre/callback
```

5. Preencha `MELI_CLIENT_ID`, `MELI_CLIENT_SECRET` e `MELI_REDIRECT_URI` no `.env`.

## Fluxo de conexao com Mercado Livre

1. Inicie o projeto.
2. Acesse `/login`.
3. Entre com a conta administrativa.
4. Acesse `/admin/integracao`.
5. Clique em `Conectar Mercado Livre`.
6. Autorize o aplicativo no Mercado Livre.
7. Ao retornar para o callback, os tokens serao salvos no banco.

## Sincronizacao de produtos

Existem dois caminhos:

- Via painel:
  - `/admin/integracao`
  - Botao `Sincronizar produtos agora`
- Via API:

```bash
POST /api/mercadolivre/sync-products
```

O modulo faz:

- Busca anuncios do vendedor
- Consulta detalhes do item
- Busca descricao
- Atualiza preco, estoque, imagens e atributos
- Mantem os dados locais sincronizados

## Sincronizacao de pedidos

Via painel:

- `/admin/integracao`
- Botao `Sincronizar pedidos agora`

Via API:

```bash
POST /api/mercadolivre/sync-orders
```

O modulo faz:

- Busca pedidos do vendedor
- Salva comprador, status, total e datas
- Relaciona itens com produtos locais quando possivel

## Configuracao de webhook em producao

URL do webhook:

```txt
POST https://seu-dominio.com/api/mercadolivre/webhook
```

Boas praticas:

- Use HTTPS em producao
- Restrinja acesso ao painel admin
- Nao exponha `MELI_CLIENT_SECRET`
- Monitore `/admin/logs`
- Verifique expiracao de token em `/admin/integracao`

## SEO implementado

- Metadata padrao na home
- Metadata dinamica em produtos e posts
- Open Graph
- Sitemap em `/sitemap.xml`
- Robots em `/robots.txt`
- Schema.org Product nas paginas de produto

## Observacoes de arquitetura

- O checkout nao acontece dentro do site.
- O botao principal sempre redireciona para o `permalink` do anuncio oficial no Mercado Livre.
- O projeto possui fallback demo para exibir a vitrine mesmo antes da primeira sincronizacao real.
- O seed popula categorias, produtos de exemplo, pedidos e configuracoes iniciais.

## Rotas importantes

Publicas:

- `/`
- `/produtos`
- `/produtos/[id]`
- `/categorias`
- `/categorias/[slug]`
- `/ofertas`
- `/mais-vendidos`
- `/busca`
- `/blog`
- `/blog/[slug]`

Admin:

- `/admin`
- `/admin/produtos`
- `/admin/pedidos`
- `/admin/integracao`
- `/admin/configuracoes`
- `/admin/logs`

API:

- `/api/auth/[...nextauth]`
- `/api/contact`
- `/api/store-settings`
- `/api/mercadolivre/auth`
- `/api/mercadolivre/callback`
- `/api/mercadolivre/webhook`
- `/api/mercadolivre/sync-products`
- `/api/mercadolivre/sync-orders`
- `/api/mercadolivre/disconnect`

## Proximos passos recomendados

- Subir PostgreSQL de producao
- Configurar dominio publico com HTTPS
- Conectar conta real do Mercado Livre
- Ajustar redirect URI de producao
- Apontar webhook do app Mercado Livre para o dominio final
- Revisar identidade visual com assets proprios da marca
