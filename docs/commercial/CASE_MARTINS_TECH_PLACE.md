# Case Comercial — Martins Tech Place: E-Commerce de Tecnologia Integrado ao Mercado Livre

## PROBLEMA
Vendedores de tecnologia, informática e eletrônicos operam quase inteiramente dentro de marketplaces consolidados como o Mercado Livre. Embora esses canais ofereçam tráfego abundante, cobram comissões expressivas (12% a 19% por venda), retêm os dados dos consumidores e impedem a fidelização de clientes. Criar uma loja virtual independente costuma resultar em retrabalho operacional para manter estoques, preços e pedidos sincronizados manualmente entre a loja própria e o marketplace.

## SOLUÇÃO
O **Martins Tech Place** é uma plataforma de e-commerce de última geração desenvolvida com Next.js (App Router), Tailwind CSS e Prisma ORM sobre PostgreSQL. A solução une uma experiência de compra ultrarrápida (com renderização do lado do servidor para indexação máxima no Google) à integração automatizada com a API do Mercado Livre via OAuth e webhooks, garantindo sincronização fluida de catálogo e pedidos.

## FUNCIONALIDADES COMPROVADAS
- **Vitrine Otimizada para SEO e Alta Conversão**: Interface moderna focada em produtos de tecnologia, com carregamento rápido e metadados estruturados.
- **Integração OAuth com Mercado Livre**: Fluxo seguro de autorização de conta para acesso à API oficial do marketplace.
- **Processamento de Webhooks em Tempo Real**: Notificações automáticas de alterações de pedidos e status de pagamento vindas do Mercado Livre.
- **Modelagem de Dados Relacional com Prisma**: Estrutura escalável para categorias, especificações técnicas, variações de produto, clientes e pedidos.
- **Autenticação e Sessões Seguras**: Camada de autenticação com NextAuth e controle de sessões criptografadas.

## TECNOLOGIAS VERIFICADAS
- **Frontend & SSR**: Next.js, React, Tailwind CSS, Lucide Icons, Hook Form com validação Zod.
- **Backend & Banco de Dados**: Next.js API Routes, Prisma ORM 6, PostgreSQL.
- **Segurança & Autenticação**: NextAuth.js, Bcrypt.js.
- **Qualidade & Testes**: Vitest (`oauth.test.ts`, `webhooks.test.ts`), GitHub Actions CI.

## DIFERENCIAIS
- **Arquitetura Unificada (Full-Stack Next.js)**: Reduz a complexidade de manutenção mantendo frontend e backend dentro do mesmo ecossistema tipado em TypeScript.
- **Testes Automatizados de Integração**: Suíte de testes verificando a integridade dos contratos de webhook e autenticação OAuth.
- **Pronto para Escala em Edge/Vercel**: Projetado para deploy com tempo de carregamento global em sub-segundos.

## STATUS
**MVP de E-Commerce com Módulos de Integração Verificados** — Estrutura completa de catálogo, banco relacional migrado e testes de autenticação e webhook implementados.

## VALOR COMERCIAL
- **Recuperação de Margem de Lucro**: Transforma compradores eventuais de marketplace em clientes diretos da loja própria, economizando de 12% a 19% em comissões por venda recorrente.
- **Preservação de Dados de Clientes**: Constrói um mailing proprietário para campanhas de pós-venda, remarketing e lançamentos de novos produtos.
- **Centralização da Operação**: Evita a necessidade de gerenciar dois estoques paralelos graças ao processamento orientado a eventos via webhooks.
