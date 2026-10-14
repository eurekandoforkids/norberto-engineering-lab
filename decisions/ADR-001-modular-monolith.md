# ADR-001 — Monólito Modular + Hexagonal/Clean

**Status:** decisão registrada no documento de arquitetura e na SCRUM-23.

## Tensão

Construir rapidamente um MVP sem gerenciar serviços distribuídos, mas preservando responsabilidade, testabilidade e capacidade de evolução.

## Alternativas e compromissos

| Alternativa | Compromisso |
| --- | --- |
| Monólito sem fronteiras | Menor formalismo inicial, maior risco de acoplamento |
| **Monólito Modular** | Operação inicial simples, requer disciplina na separação dos módulos |
| Microsserviços | Maior isolamento possível, com overhead operacional prematuro |

## Decisão

Backend em NestJS/TypeScript organizado em fronteiras de negócio. Princípios Hexagonais/Clean aplicados pragmaticamente: separação de domínio e infraestrutura quando houver valor, sem camadas ou eventos artificiais.

## Consequências

- Uma implantação inicial mais simples não elimina a necessidade de controlar dependências internas.
- Extrair um módulo para outro serviço pode ser possível no futuro, mas não é garantia de migração sem esforço.
- É necessário verificar imports, contratos e acesso aos dados entre módulos.

**Comprovação nesta publicação:** decisão concluída no Jira; cinco módulos completamente implementados **não comprovados**.

[Arquitetura lógica](../architecture/module-boundaries.md) · [Matriz de evidências](../evidence/implementation-status.md)

