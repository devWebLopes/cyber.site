# Agentes — CyberTech

Índice de agentes especializados.

| Agente | Arquivo | Papel | Quando Acionar |
|--------|---------|-------|----------------|
| Frontend | `frontend.md` | UI, componentes, estilização | Mudanças em `artifacts/cybertech` |
| Backend | `backend.md` | API, rotas, lógica | Mudanças em `artifacts/api-server` |
| Banco de Dados | `database.md` | Schema, migrations, queries | Mudanças em `lib/db` |
| QA | `qa.md` | Testes, verificação, regressão | Antes de entrega / revisão |
| DevOps | `devops.md` | Build, deploy, env | CI/CD, ambiente |
| Arquiteto | `architect.md` | Decisões, estrutura | Mudanças estruturais |

## Fluxo Padrão
1. Arquiteto define abordagem (se complexo).
2. Agente especializado implementa.
3. QA verifica (typecheck/build).
4. DevOps valida deploy.

## Regra
Sempre consultar `agents.md` e `docs/README.md` antes de iniciar.
