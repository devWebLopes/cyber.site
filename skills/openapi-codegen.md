# Skill: OpenAPI Codegen

## Escopo
Contrato de API e geração de código.

## Fonte da Verdade
`lib/api-spec` (spec OpenAPI).

## Fluxo
1. Editar spec OpenAPI.
2. Rodar `pnpm --filter @workspace/api-spec run codegen`.
3. Consumir hooks em `lib/api-client-react` e schemas em `lib/api-zod`.

## Regras
- Nunca editar arquivos gerados manualmente.
- Alterações de endpoint exigem atualizar spec + codegen.
- Validar que typecheck passa após codegen.

## Verificação
- `pnpm --filter @workspace/api-spec run codegen`
- `pnpm run typecheck`
