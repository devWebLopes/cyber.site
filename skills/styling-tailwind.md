# Skill: Estilização Tailwind

## Escopo
Estilização do frontend.

## Stack
Tailwind CSS 4, shadcn/ui (Radix), tw-animate-css.

## Regras
- Usar tokens de tema (CSS variables) em vez de cores hardcoded.
- Componentes base shadcn em `src/components/ui`.
- Responsivo mobile-first.
- Dark mode via next-themes quando aplicável.

## Padrões
- Classes utilitárias; extrair componentes para repetição.
- Evitar `!important`.

## Verificação
- `pnpm --filter @workspace/cybertech run typecheck`
- `pnpm --filter @workspace/cybertech run build`
