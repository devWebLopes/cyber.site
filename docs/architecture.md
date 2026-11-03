# Arquitetura — CyberTech

## Visão Geral

Monorepo pnpm com separação clara entre frontend, API e bibliotecas compartilhadas. Contrato de API definido em OpenAPI (`lib/api-spec`) é a fonte da verdade; hooks e schemas são gerados via Orval.

## Componentes

### Frontend (`artifacts/cybertech`)
- SPA React + Vite, roteamento com Wouter.
- Estilização Tailwind 4 + shadcn/ui.
- Estado de servidor via TanStack Query; formulários via React Hook Form + Zod.
- Animações: Framer Motion e Lenis (scroll suave), respeitando reduced motion.

### API (`artifacts/api-server`)
- Express 5, logging estruturado com Pino.
- Rotas organizadas por domínio; validação de entrada com Zod.
- CORS e cookie-parser configurados.

### Banco (`lib/db`)
- Drizzle ORM sobre PostgreSQL; schema em `lib/db/src/schema`.
- Migrations/push via drizzle-kit.

### Contrato (`lib/api-spec`, `lib/api-zod`, `lib/api-client-react`)
- OpenAPI spec → Orval gera hooks React Query e schemas Zod.
- Sempre alterar spec primeiro, depois codegen.

## Fluxo de Dados

1. Usuário interage com frontend.
2. Frontend chama hooks gerados (`api-client-react`).
3. API valida, processa, persiste via Drizzle.
4. Resposta tipada retorna ao frontend.

## Decisões Não Óbvias

- Monorepo para compartilhar tipos/schemas entre frontend e backend.
- Codegen evita divergência entre cliente e servidor.
- Um único agente por dispositivo no produto (conceito de negócio), não afeta código.
- Identidade visual: azul claro predominante, faixas escuras pontuais.

## Gotchas

- Rodar `pnpm run typecheck` após mudanças em `lib/*` (impacta todos).
- `DATABASE_URL` obrigatória para API.
- Vite host `0.0.0.0` para preview em ambientes containerizados.
