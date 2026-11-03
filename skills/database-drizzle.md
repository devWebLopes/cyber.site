# Skill: Banco de Dados (Drizzle)

## Escopo
Schema e acesso a dados em `lib/db`.

## Stack
PostgreSQL, Drizzle ORM, drizzle-zod, drizzle-kit.

## Regras
- Schema em `lib/db/src/schema`.
- Migrations via drizzle-kit; dev usa `pnpm --filter @workspace/db run push`.
- Derivar schemas Zod com drizzle-zod.
- Queries tipadas; evitar SQL raw.

## Padrões
- Tabelas com nomes snake_case.
- Campos de auditoria (createdAt, updatedAt) quando aplicável.
- Índices para colunas filtradas/ordenadas.

## Verificação
- `pnpm run typecheck:libs`
