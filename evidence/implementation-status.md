# Evidências verificadas e limites

**Revisão:** 14/10/2026. Fontes internas: documento de arquitetura v1.0, Jira e GitHub privado.

| Elemento | O que foi identificado | Limitação |
| --- | --- | --- |
| Monólito Modular + Hexagonal/Clean | Decisão registrada em SCRUM-23 | Implementação integral dos cinco módulos não verificada |
| Cadastro | SCRUM-13 concluída; implementação de cadastro presente | Testes específicos não publicados |
| Next.js / React | Arquivos reais de UI presentes | Não equivale a todo MVP implementado |
| Componente Input | Código real reproduzido no case | Arquivo isolado não prova qualidade global |
| Continuidade da Jornada | Decisão registrada em SCRUM-26 | Recuperação/testes ainda não comprovados aqui |
| IA contextual | Decisão registrada em SCRUM-28 | Código e resultados privados não divulgados |
| CI frontend/backend | Workflows privados presentes | Histórico de execuções não validado para publicação |
| Exemplo público de validação | Código e testes disponíveis neste repositório | Demonstração independente, **não** testes do produto |

## Convenção de estado

**Definida:** escolha fundamentada.  
**Implementada:** presença em software inspecionado.  
**Testada:** verificação executada e registrada.  
**Homologada:** critérios aceitos por responsável humano.

A conclusão de uma US que **define** arquitetura não significa que sua implementação esteja concluída. A execução do [teste público](../tests/registration-rules.test.mjs) é evidência apenas do exemplo didático.

[Voltar ao case](../README.md)

