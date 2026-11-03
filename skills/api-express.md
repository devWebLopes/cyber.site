# Skill: API Express

## Escopo
Desenvolvimento da API em `artifacts/api-server`.

## Stack
Express 5, TypeScript, Pino, CORS, cookie-parser, Zod.

## Regras
- Rotas organizadas por domínio em `src/routes`.
- Validar entrada com Zod antes de processar.
- Logging estruturado com Pino; não usar console.log em produção.
- Retornar erros com status HTTP apropriado e payload consistente.

## Padrões
- Middleware de validação reutilizável.
- Separar handlers de lógica de negócio.
- Usar `@workspace/db` para acesso a dados.

## Verificação
- `pnpm --filter @workspace/api-server run typecheck`
- `pnpm --filter @workspace/api-server run build`
