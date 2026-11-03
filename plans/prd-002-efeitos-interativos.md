# PRD 002 - Efeitos Interativos e Scrollytelling

## Status

Proposto.

## Responsaveis

- **Arquiteto:** define limites, arquitetura de movimento e criterios de desempenho.
- **Frontend:** implementa a experiencia em `artifacts/cybertech`.
- **QA:** valida acessibilidade, responsividade, desempenho e regressoes.

## Skills Aplicaveis

- `frontend-react`
- `styling-tailwind`
- `visual-direction`
- `accessibility`
- `verification`

Nao e necessario instalar uma skill ou dependencia adicional. O projeto ja possui Framer Motion, Lenis e uma camada propria de animacoes por `IntersectionObserver`.

## Contexto

A landing page da CyberTech ja usa Lenis para rolagem suave, entradas discretas com `useComfortMotion` e fallbacks para `prefers-reduced-motion`. A evolucao deve adicionar parallax, resposta visual ao cursor e uma narrativa sincronizada com o scroll sem duplicar a infraestrutura existente ou comprometer leitura, conversao e acessibilidade.

## Problema

A pagina apresenta bem o produto, mas as secoes ainda se comportam majoritariamente como blocos independentes. Faltam recursos de movimento que:

- reforcem profundidade e hierarquia visual;
- deem retorno imediato a interacoes com ponteiro;
- conectem as etapas do processo em uma narrativa continua;
- preservem a experiencia de visitantes com dispositivos modestos, toque ou sensibilidade a movimento.

## Objetivo

Criar uma experiencia de movimento coerente com a identidade CyberTech, usando animacoes discretas para orientar a atencao e explicar o processo comercial sem atrasar o acesso ao conteudo ou aos CTAs.

## Resultados Esperados

- Tornar a navegacao mais envolvente sem prejudicar a compreensao.
- Destacar CTAs e elementos interativos de forma previsivel.
- Transformar a secao `#processo` em uma narrativa visual de quatro etapas.
- Manter os fluxos de contato, filtros, links e menu totalmente funcionais.
- Manter a pagina utilizavel sem JavaScript e com movimento reduzido.

## Fora de Escopo

- Alterar textos comerciais, formulario, API ou banco de dados.
- Criar WebGL, video de fundo, animacoes 3D ou efeitos sonoros.
- Aplicar cursor personalizado em dispositivos touch ou ponteiros imprecisos.
- Reestruturar todas as secoes da landing page.
- Adicionar bibliotecas de animacao ou plugins de scroll.
- Criar painel para configurar efeitos.

## Publico e Dispositivos

- Decisores e profissionais de TI em desktop e notebook.
- Visitantes em celulares e tablets, com uma versao linear e leve da narrativa.
- Pessoas que usam teclado, leitores de tela ou `prefers-reduced-motion`.
- Navegadores modernos com suporte a `IntersectionObserver`, `requestAnimationFrame` e media queries de ponteiro.

## Principios de Experiencia

1. **Conteudo primeiro:** nenhum texto ou CTA pode depender da animacao para aparecer ou funcionar.
2. **Movimento com funcao:** cada efeito deve indicar profundidade, estado interativo ou progresso narrativo.
3. **Conforto:** deslocamentos curtos, sem zoom intenso, flashes, oscilacoes ou scroll sequestrado.
4. **Progressive enhancement:** sem suporte, em touch ou com movimento reduzido, a pagina permanece estatica e completa.
5. **Consistencia visual:** azul claro predominante e azul-escuro apenas nas faixas previstas pela direcao visual.

## Experiencia Proposta

### 1. Parallax e Rolagem Dinamica

- Manter uma unica instancia do Lenis e integrar atualizacoes de movimento ao mesmo ciclo de renderizacao.
- Aplicar parallax leve apenas a elementos decorativos:
  - orbitas e grade do hero;
  - ilustracao do dashboard no hero;
  - circulos decorativos da secao de resultados.
- Limitar o deslocamento visual a aproximadamente `8-32px`, de acordo com o tamanho do elemento e da viewport.
- Usar apenas `transform` e, quando necessario, `opacity`; nao animar propriedades que provoquem layout.
- Desativar o parallax em `prefers-reduced-motion: reduce` e permitir versao estatica em telas pequenas.
- Preservar ancoras, botao de voltar do navegador, foco e links internos com o offset do header atual.

### 2. Cursor Personalizado

- Exibir um indicador visual discreto com ponto e halo somente quando todas as condicoes forem verdadeiras:
  - `(hover: hover)`;
  - `(pointer: fine)`;
  - movimento reduzido nao estiver ativo;
  - a pagina estiver visivel.
- Atualizar a posicao com `requestAnimationFrame`, sem `setState` por evento de ponteiro.
- Oferecer estados visuais para:
  - links, botoes e controles clicaveis;
  - cards com hover;
  - estado pressionado.
- Nao bloquear eventos: a camada deve usar `pointer-events: none` e ficar abaixo de menus, dialogos e feedbacks criticos.
- Preservar o cursor nativo em campos de texto, `textarea`, `select`, componentes redimensionaveis e qualquer area em que o formato do cursor comunique funcao.
- Remover o indicador ao sair da viewport, perder visibilidade ou trocar para uma modalidade touch.
- Nao alterar navegacao por teclado nem usar o cursor como unica indicacao de interatividade.

### 3. Scrollytelling em `#processo`

- Transformar as quatro etapas existentes em uma narrativa sincronizada com o scroll no desktop:
  - coluna narrativa com as etapas;
  - painel visual sticky que representa o estado atual;
  - barra ou trilha de progresso de `1/4` a `4/4`;
  - transicoes curtas entre diagnostico, implantacao, configuracao e monitoramento.
- Cada etapa deve ativar quando seu bloco cruza uma faixa central da viewport, usando `IntersectionObserver` ou progresso de scroll do Framer Motion.
- Atualizar somente a apresentacao visual; o DOM deve manter as quatro etapas em ordem semantica.
- Nao transformar a roda do mouse em slides, impedir rolagem ou criar secoes com altura excessiva.
- Em mobile, touch, viewport baixa ou movimento reduzido:
  - usar o fluxo vertical existente;
  - mostrar todos os textos sem sticky obrigatorio;
  - usar apenas destaque de etapa ou nenhum movimento.
- O CTA final deve permanecer acessivel e visivel depois da quarta etapa.

## Requisitos Funcionais

| ID | Requisito | Criterio de aceite |
|---|---|---|
| RF-01 | Parallax decorativo | Hero e resultados apresentam profundidade em desktop sem deslocar texto ou controles. |
| RF-02 | Rolagem dinamica integrada | Existe uma unica instancia de Lenis, com cleanup completo ao desmontar a rota. |
| RF-03 | Cursor responsivo ao contexto | O indicador muda em controles interativos e nao captura cliques. |
| RF-04 | Cursor condicionado ao dispositivo | O efeito nao e montado em touch, ponteiro impreciso ou movimento reduzido. |
| RF-05 | Narrativa em quatro etapas | `#processo` comunica a etapa ativa e o progresso correspondente. |
| RF-06 | Fallback linear | Todo o conteudo permanece legivel e operavel sem sticky, animacao ou JavaScript. |
| RF-07 | Navegacao por ancora | Menu, CTAs e URL com hash continuam chegando ao destino correto. |
| RF-08 | Preferencia dinamica | Alterar `prefers-reduced-motion` durante a sessao desativa ou reativa os efeitos sem recarregar. |

## Requisitos Nao Funcionais

### Acessibilidade

- Atender WCAG 2.2 AA nos fluxos afetados.
- Nao esconder foco, alterar ordem de tabulacao ou criar conteudo apenas visual.
- Marcar cursor e decoracoes como `aria-hidden="true"`.
- Se o progresso do processo tiver texto util, usar rotulo acessivel sem anuncios repetitivos durante a rolagem.
- Evitar movimento disparado por foco; foco deve tornar o conteudo imediatamente visivel.
- Garantir experiencia estatica em `prefers-reduced-motion: reduce`.

### Desempenho

- Nao adicionar dependencia de runtime.
- Usar no maximo um loop de `requestAnimationFrame` para efeitos baseados em ponteiro/scroll e pausa-lo quando a pagina estiver oculta.
- Evitar leituras e escritas de layout intercaladas por frame.
- Animar somente `transform`, `opacity` e variaveis CSS que nao causem layout.
- Manter CLS menor que `0.1` e nao introduzir long tasks recorrentes durante a rolagem.
- Buscar rolagem proxima de 60 fps em desktop intermediario e manter a pagina fluida com throttling de CPU de 4x.

### Responsividade

- Validar larguras de `320`, `375`, `768`, `1024` e `1440px`.
- Nao permitir overflow horizontal, sobreposicao do cursor sobre conteudo critico ou sticky maior que a viewport.
- Desligar ou simplificar efeitos quando a altura da viewport nao comportar a narrativa sticky.

### Manutencao

- Centralizar a deteccao de capacidade e preferencia de movimento em hook reutilizavel.
- Separar o cursor e o painel narrativo em componentes focados, sem editar componentes base de `src/components/ui`.
- Usar tokens/variaveis CSS para distancia, duracao e easing.
- Reaproveitar `useComfortMotion`; nao criar um segundo sistema de reveal global.

## Arquitetura Proposta

- **Lenis:** continua responsavel somente pela suavizacao e ancoras.
- **Framer Motion:** pode fornecer valores derivados de scroll e transicoes do painel narrativo; importar apenas APIs utilizadas.
- **IntersectionObserver:** continua responsavel por reveals e pode determinar a etapa narrativa ativa.
- **CSS transforms:** executam o parallax e a representacao do cursor por variaveis CSS.
- **React:** controla estados semanticos de etapa e montagem condicional, nao coordenadas a cada frame.

Arquivos previstos:

- `artifacts/cybertech/src/App.tsx`: composicao da pagina e adaptacao da secao de processo.
- `artifacts/cybertech/src/components/custom-cursor.tsx`: camada visual do ponteiro.
- `artifacts/cybertech/src/components/process-story.tsx`: painel e etapas da narrativa.
- `artifacts/cybertech/src/hooks/use-motion-preferences.ts`: capacidades de ponteiro e movimento.
- `artifacts/cybertech/src/hooks/use-parallax.ts`: vinculo leve entre scroll e variaveis CSS, se Framer Motion nao cobrir o caso de forma mais simples.
- `artifacts/cybertech/src/index.css`: tokens, estados e fallbacks responsivos.

Os nomes finais podem ser reduzidos pelo agente Frontend se a implementacao ficar mais simples dentro dos componentes existentes.

## Plano de Entrega

### Fase 1 - Fundacao

#### TASK-01 - Definir contrato de movimento

- **Agente:** Arquiteto.
- **Skills:** `visual-direction`, `accessibility`, `verification`.
- **Dependencias:** nenhuma.
- **Trabalho:** confirmar elementos animados, limites de deslocamento, breakpoints, fallback e ownership do loop de animacao.
- **Saida:** decisao curta no PR ou em `docs/architecture.md` somente se surgir uma decisao estrutural duradoura.
- **Aceite:** nao ha sobreposicao de responsabilidades entre Lenis, Framer Motion e `useComfortMotion`.

#### TASK-02 - Consolidar preferencias e capacidades

- **Agente:** Frontend.
- **Skills:** `frontend-react`, `accessibility`.
- **Dependencias:** TASK-01.
- **Trabalho:** criar uma fonte unica para `prefers-reduced-motion`, `hover`, `pointer` e visibilidade da pagina; suportar mudancas durante a sessao.
- **Aceite:** listeners possuem cleanup e os tres efeitos respondem a mesma preferencia.

### Fase 2 - Efeitos Base

#### TASK-03 - Integrar parallax ao scroll existente

- **Agente:** Frontend.
- **Skills:** `frontend-react`, `styling-tailwind`, `visual-direction`.
- **Dependencias:** TASK-02.
- **Trabalho:** aplicar profundidade ao hero e resultados, limitar amplitudes e garantir composicao por GPU sem layout shift.
- **Aceite:** RF-01, RF-02, RF-07 e RF-08 atendidos; sem parallax em movimento reduzido.

#### TASK-04 - Implementar cursor personalizado

- **Agente:** Frontend.
- **Skills:** `frontend-react`, `styling-tailwind`, `accessibility`.
- **Dependencias:** TASK-02.
- **Trabalho:** criar camada de ponto/halo, estados de interacao e excecoes para campos e controles especializados.
- **Aceite:** RF-03, RF-04 e RF-08 atendidos; clique, selecao de texto e foco continuam nativos.

### Fase 3 - Narrativa

#### TASK-05 - Construir painel visual do processo

- **Agente:** Frontend.
- **Skills:** `frontend-react`, `styling-tailwind`, `visual-direction`.
- **Dependencias:** TASK-01.
- **Trabalho:** representar visualmente as quatro etapas com progresso e estados coerentes com a identidade CyberTech.
- **Aceite:** painel nao usa dados ficticios apresentados como reais e mantem contraste AA.

#### TASK-06 - Sincronizar etapas com o scroll

- **Agente:** Frontend.
- **Skills:** `frontend-react`, `accessibility`.
- **Dependencias:** TASK-02, TASK-05.
- **Trabalho:** ativar etapas pela posicao na viewport, implementar sticky seguro e fallback linear.
- **Aceite:** RF-05, RF-06, RF-07 e RF-08 atendidos; nenhuma rolagem e bloqueada.

### Fase 4 - Qualidade

#### TASK-07 - Validar acessibilidade e interacao

- **Agente:** QA.
- **Skills:** `accessibility`, `verification`.
- **Dependencias:** TASK-03, TASK-04, TASK-06.
- **Trabalho:** testar teclado, foco, leitores de tela, movimento reduzido, touch, mouse, hash e formulario.
- **Aceite:** zero falha critica/seria no axe quando disponivel e nenhum fluxo critico quebrado.

#### TASK-08 - Validar desempenho e responsividade

- **Agente:** QA.
- **Skills:** `verification`.
- **Dependencias:** TASK-03, TASK-04, TASK-06.
- **Trabalho:** perfilar scroll, verificar loops/listeners, CLS, overflow, alturas baixas e breakpoints definidos.
- **Aceite:** requisitos de desempenho e responsividade atendidos ou desvios documentados antes da entrega.

#### TASK-09 - Verificacao final

- **Agente:** QA.
- **Skills:** `verification`.
- **Dependencias:** TASK-07, TASK-08.
- **Trabalho:** executar `pnpm run typecheck` e `pnpm run build`; revisar console e rotas.
- **Aceite:** comandos verdes, console sem novos erros e pagina inicial funcional em desktop e mobile.

## Matriz de Testes

| Cenario | Resultado esperado |
|---|---|
| Mouse e desktop amplo | Parallax, cursor e scrollytelling completos. |
| Trackpad | Movimento suave sem atraso perceptivel ou saltos. |
| Touch/mobile | Sem cursor; parallax simplificado ou desligado; processo linear. |
| Teclado | Ordem de foco e ativacao dos controles inalteradas. |
| Movimento reduzido | Conteudo estatico, sem parallax, perseguidor de cursor ou transicoes de scroll. |
| JavaScript desativado | Conteudo e links disponiveis; sem elementos essenciais ocultos. |
| Aba em segundo plano | Loops pausados e retomados sem salto visual relevante. |
| Resize/orientacao | Efeitos recalculados sem overflow ou estado inconsistente. |
| Link direto `/#processo` | Secao posicionada abaixo do header e conteudo acessivel. |
| Formulario e filtros | Digitacao, selecao, validacao e clique sem interferencia dos efeitos. |

## Riscos e Mitigacoes

| Risco | Mitigacao |
|---|---|
| Lenis e Framer Motion disputarem o ciclo de scroll | Definir um unico ownership de frame e testar cleanup da rota. |
| Excesso de movimento reduzir legibilidade | Animar decoracoes, limitar amplitudes e aplicar reduced motion. |
| Cursor causar atraso ou ocultar affordances | Usar RAF e CSS transforms; manter cursor nativo em controles especializados. |
| Sticky falhar em mobile ou viewport baixa | Breakpoint por largura/altura e fallback linear. |
| Muitos observers/listeners degradarem desempenho | Compartilhar preferencias, observar apenas alvos necessarios e desconectar no cleanup. |
| Scrollytelling alongar demais a pagina | Manter quatro etapas compactas e nao usar scroll locking. |

## Criterio de Pronto

- Todos os requisitos RF-01 a RF-08 foram demonstrados.
- Fallbacks para touch, teclado, JavaScript indisponivel e movimento reduzido foram validados.
- Nenhum CTA, ancora, filtro ou campo do formulario sofreu regressao.
- Nao foi adicionada dependencia de runtime.
- `pnpm run typecheck` e `pnpm run build` passam.
- QA aprovou acessibilidade, responsividade e fluidez da rolagem.

## Ordem Recomendada

`TASK-01 -> TASK-02 -> (TASK-03 + TASK-04 + TASK-05) -> TASK-06 -> (TASK-07 + TASK-08) -> TASK-09`
