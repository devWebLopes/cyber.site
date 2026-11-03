# CyberTech — agents.md (Ponto de Entrada da IA)

## Contexto do Projeto
CyberTech é uma plataforma web de serviços de cibersegurança: site institucional (landing page) com captura de leads e backend de API persistindo em PostgreSQL. Monorepo pnpm.

## Objetivos Gerais
- Manter site institucional performático, acessível e visualmente consistente.
- Prover API REST tipada e validada para leads/contato.
- Preservar contrato OpenAPI como fonte da verdade.

## Stack
pnpm workspaces, Node 24, TypeScript 5.9; Frontend React 19 + Vite 7 + Tailwind 4; API Express 5; DB PostgreSQL + Drizzle; Codegen Orval.

## Mapa da Estrutura
- `docs/` — documentação (README, arquitetura, padrões, visual)
- `skills/` — habilidades técnicas (README + *.md)
- `agents/` — agentes especializados (README + *.md)
- `plans/` — planejamentos de tarefas
- `artifacts/` — código (cybertech, api-server, mockup-sandbox)
- `lib/` — bibliotecas compartilhadas (api-spec, api-zod, api-client-react, db)
- `.agents/memory/` — memória do projeto (visual direction)

## Regras Rígidas
1. Sempre consultar este arquivo e `docs/README.md` antes de iniciar qualquer tarefa.
2. Seguir padrões documentados em `docs/code-standards.md`.
3. Respeitar direção visual em `skills/visual-direction.md` e `.agents/memory/visual-direction.md`.
4. Alterações de API exigem atualizar OpenAPI spec + codegen.
5. Rodar `pnpm run typecheck` antes de entregar.
6. Nunca commitar segredos.
7. Consultar `agents/README.md` para escolher agente adequado.
8. Consultar `skills/README.md` para habilidades aplicáveis.

## Fluxo de Trabalho
1. Ler `agents.md` e `docs/README.md`.
2. Escolher agente em `agents/README.md`.
3. Aplicar skills relevantes.
4. Implementar.
5. Verificar (`pnpm run typecheck`, build).
6. Documentar decisões se necessário.
