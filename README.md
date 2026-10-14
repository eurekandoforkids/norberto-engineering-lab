# QBugado | Engineering Case
## Uma arquitetura precisa funcionar além do diagrama.

**Arquitetura de software · Engenharia de produto · Desenvolvimento assistido por IA**  
**Norberto Berti** · Atualizado em 14/10/2026

> Este é um case técnico público, não um fork, espelho ou sincronização do repositório privado do QBugado. O código-fonte completo e os mecanismos proprietários permanecem privados. As amostras são explicitamente identificadas como código real, excerto real ou demonstração independente.

Este repositório complementa o [portfólio executivo](https://qbugado-ai-portfolio.vercel.app). Aqui demonstramos **como decisões arquiteturais se relacionam com implementação, qualidade e evidências** — sem repetir a narrativa de negócio.

### Explore o case

| O que você quer examinar? | Evidência |
| --- | --- |
| Fronteiras e responsabilidades | [Arquitetura lógica](architecture/module-boundaries.md) |
| Por que Monólito Modular? | [ADR-001](decisions/ADR-001-modular-monolith.md) |
| Como preservar estado após interrupções? | [ADR-002](decisions/ADR-002-persistence.md) |
| Como tratar identidade e autorização? | [ADR-003](decisions/ADR-003-identity.md) |
| Existe código real? | [Cadastro e componente React](code/registration-excerpts.md) · [Input.tsx](code/ui/Input.tsx) |
| Como funciona o fluxo de entrega? | [Git e CI](engineering/git-workflow.md) |
| O que está comprovado? | [Matriz de evidências](evidence/implementation-status.md) |
| Como protegemos a propriedade intelectual? | [Política de divulgação](SECURITY.md) |

## 01 — Arquitetura: complexidade por escolha, não por acidente

O MVP precisava separar responsabilidades sem antecipar os custos operacionais de microsserviços. A decisão registrada foi **Monólito Modular com princípios Hexagonais/Clean**, aplicados pragmaticamente.

Cinco fronteiras de domínio foram definidas: Identity, Journey, Experience, Bug e Grimoire. Isso descreve a **arquitetura lógica planejada**, não significa que esses cinco módulos já estejam integralmente implementados. A modularidade precisa ser comprovada no código, e não presumida a partir do diagrama. [Detalhes técnicos](decisions/ADR-001-modular-monolith.md).

## 02 — Código real: da decisão à implementação

O primeiro caso examinado é **cadastro com e-mail e senha** (história interna SCRUM-13, concluída). A branch principal do produto contém Next.js, React, TypeScript, validações de formulário e cadastro com o SDK do Supabase.

Selecionamos [trechos reais](code/registration-excerpts.md) e o componente [Input.tsx real](code/ui/Input.tsx). O login completo e os mecanismos proprietários não são apresentados como entregas verificadas neste case.

**Ponto a conciliar:** a página de cadastro utiliza o Supabase Auth diretamente no frontend, enquanto a arquitetura prevê isolamento de dependências de identidade por módulo. A solução completa precisa distinguir chamadas do SDK de autorização sobre dados do domínio. [Análise da decisão](decisions/ADR-003-identity.md).

## 03 — Integridade: o que acontece quando algo dá errado?

A estratégia documentada define o backend como fonte de verdade do progresso. Uma ação que altera o estado de negócio só deve ser considerada concluída depois que sua persistência for confirmada. Fechar uma tela não equivale a confirmar uma escolha. [Persistência e cenários de falha](decisions/ADR-002-persistence.md).

**Isso é uma decisão de arquitetura; resultados de testes dessa estratégia ainda não foram comprovados nesta publicação.**

## 04 — Engenharia de entrega: do requisito ao código versionado

O repositório privado está organizado em frontend, backend, aplicações complementares, testes e automações. Existem configurações de CI para frontend e backend, além de branches de desenvolvimento, funcionalidades e correções.

O fluxo **definido** é: requisito → análise → branch → implementação assistida por IA → testes → PR e revisão → homologação humana → integração. A responsabilidade por aprovação e decisão continua humana. A existência de arquivos CI não comprova, por si só, execuções bem-sucedidas. [Fluxo e evidências](engineering/git-workflow.md).

## 05 — Qualidade: não confundir decisão com entrega

Classificamos as evidências como **definida, implementada, testada ou homologada**. A arquitetura e a persistência estão documentadas; o cadastro e um componente UI existem no código; testes e homologações detalhadas exigem verificação específica. [Confira a matriz](evidence/implementation-status.md).

Incluímos um [exemplo público independente de validação](examples/registration-rules.mjs) com [testes próprios](tests/registration-rules.test.mjs). **Esses testes não avaliam o produto privado QBugado.**

## 06 — Segurança e propriedade intelectual

Não divulgamos dados pessoais, credenciais, prompts, mecanismos proprietários, infraestrutura sensível, desenho integral do banco nem arquivos completos que permitam reconstruir o núcleo do produto. A seleção é manual; **nada é sincronizado automaticamente**. [Critérios de divulgação](SECURITY.md).

## 07 — Evolução: o case cresce com o software

Novos elementos entrarão neste repositório somente quando forem verificáveis e expressamente autorizados. O case deve refletir a diferença entre arquitetura pretendida e implementação, inclusive quando houver decisões a revisar.

---

**Engenharia não é apenas fazer o código funcionar. É construir condições para que ele continue funcionando enquanto o produto evolui.**

*Norberto Berti — Arquitetura, Engenharia de Produto e Transformação Digital com IA.*

