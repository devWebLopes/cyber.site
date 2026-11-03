# Skill: Frontend React

## Escopo
Desenvolvimento do frontend em `artifacts/cybertech`.

## Stack
React 19, Vite 7, TypeScript, Wouter, TanStack Query, React Hook Form, Zod.

## Regras
- Usar hooks gerados de `@workspace/api-client-react` para chamadas de API.
- Formulários com React Hook Form + resolver Zod.
- Roteamento via Wouter (`Route`, `Switch`, `Router`).
- Componentes UI de `src/components/ui` (shadcn); não reinventar.
- Estado local com useState/useEffect; estado servidor com TanStack Query.

## Padrões
- Componentes funcionais com TypeScript.
- Props tipadas explicitamente quando não inferidas.
- Evitar efeitos colaterais em render.

## Verificação
- `pnpm --filter @workspace/cybertech run typecheck`
