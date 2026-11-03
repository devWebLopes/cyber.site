# Padrões de Código — CyberTech

## TypeScript
- Modo estrito. Sem `any` sem justificativa.
- Preferir tipos inferidos de Zod/Drizzle a tipos manuais duplicados.
- Imports com alias `@/` no frontend.

## Estrutura de Arquivos
- Componentes UI reutilizáveis em `src/components/ui` (shadcn). Não editar manualmente exceto via CLI.
- Páginas em `src/pages`.
- Hooks em `src/hooks`.
- Lógica de API em `artifacts/api-server/src`.

## Estilo
- Tailwind 4; usar tokens de tema, evitar cores hardcoded.
- Componentes pequenos e focados; extrair quando > ~150 linhas.

## Validação
- Zod para entrada de API e formulários.
- Schemas compartilhados via `lib/api-zod` quando possível.

## Commits
- Mensagens concisas no imperativo.
- Nunca commitar segredos/`.env`.

## Testes/Verificação
- `pnpm run typecheck` obrigatório.
- `pnpm run build` antes de deploy.

## Acessibilidade
- Respeitar `prefers-reduced-motion`.
- Labels e aria em formulários.
- Contraste adequado (WCAG AA).

## Performance
- Lazy load de rotas pesadas quando aplicável.
- Imagens otimizadas.
