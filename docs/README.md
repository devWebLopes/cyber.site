# CyberTech — Documentação do Projeto

Índice principal da documentação. Leia este arquivo antes de alterar qualquer código.

## Visão Geral

CyberTech é uma plataforma web de serviços de cibersegurança para empresas: site institucional (landing page) com captura de leads e backend de API que persiste dados em PostgreSQL. O projeto é um monorepo pnpm com frontend React (Vite) e API Express.

## Stack

- **Monorepo:** pnpm workspaces (`artifacts/*`, `lib/*`, `lib/integrations/*`, `scripts`)
- **Runtime:** Node.js 24, TypeScript 5.9
- **Frontend:** React 19, Vite 7, Tailwind CSS 4, Wouter, Framer Motion, Lenis, shadcn/ui (Radix), React Hook Form, Zod, TanStack Query
- **API:** Express 5, Pino (logging), CORS, cookie-parser
- **Banco:** PostgreSQL + Drizzle ORM + drizzle-zod
- **Codegen:** Orval (a partir do spec OpenAPI em `lib/api-spec`)
- **Build:** esbuild (bundle CJS), tsc (typecheck)

## Tipo

WEB (full-stack): frontend estático/SPA + API REST + banco relacional.

## Estrutura de Pastas

```
cyber/
├── artifacts/
│   ├── cybertech/        # Frontend React (Vite)
│   ├── api-server/       # API Express
│   └── mockup-sandbox/   # Sandbox de protótipos
├── lib/
│   ├── api-client-react/ # Hooks gerados (Orval)
│   ├── api-spec/         # Spec OpenAPI (fonte da verdade)
│   ├── api-zod/          # Schemas Zod gerados
│   └── db/               # Schema Drizzle + migrations
├── scripts/              # Scripts auxiliares
├── docs/                 # Documentação (este diretório)
├── skills/               # Habilidades dos agentes
├── agents/               # Agentes especializados
├── plans/                # Planejamentos de tarefas
└── agents.md             # Ponto de entrada da IA
```

## Padrões Base

- TypeScript estrito; `pnpm run typecheck` deve passar antes de entregar.
- Frontend usa shadcn/ui em `src/components/ui`; não duplicar componentes.
- Validação com Zod (`zod/v4`); schemas derivados do Drizzle quando possível.
- API segue contrato OpenAPI; alterações de endpoint exigem atualizar spec e rodar codegen.
- Estilo: Tailwind 4; identidade visual azul claro com faixas escuras (ver `.agents/memory/visual-direction.md`).
- Movimentos discretos, respeitando `prefers-reduced-motion`.

## Como Rodar

- `pnpm --filter @workspace/api-server run dev` — API (porta 5000)
- `pnpm --filter @workspace/cybertech run dev` — Frontend
- `pnpm run typecheck` — typecheck completo
- `pnpm run build` — typecheck + build
- `pnpm --filter @workspace/api-spec run codegen` — regenerar hooks/schemas
- `pnpm --filter @workspace/db run push` — push schema (dev)

## Variáveis de Ambiente

- `DATABASE_URL` — connection string Postgres (obrigatória)

## Arquivos de Referência

- `docs/architecture.md` — decisões arquiteturais
- `docs/code-standards.md` — padrões de código
- `docs/visual-guidelines.md` — diretrizes visuais
- `skills/README.md` — habilidades disponíveis
- `agents/README.md` — agentes e quando acioná-los
- `plans/` — planejamentos de tarefas
- `agents.md` — cérebro/ponto de entrada da IA
