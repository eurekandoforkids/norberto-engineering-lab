# Git, qualidade e fluxo de engenharia

**Estrutura observada** na branch principal do repositório privado, em 14/10/2026:

~~~text
qbugado/
├── .github/workflows/  automação e CI
├── apps/               aplicações complementares
├── backend/            NestJS e Prisma
├── frontend/           Next.js e React
├── knowledge/          conhecimento privado
├── scripts/            utilitários internos
└── tests/              testes adicionais
~~~

Foram identificadas branches main, develop e branches de funcionalidades e correções. Há dois workflows privados relevantes:
- **Backend CI:** instalação, geração de Prisma Client, testes e build definidos.
- **Frontend CI:** instalação e build definidos.

A presença das configurações **não** equivale a comprovação de que todas as execuções tiveram sucesso.

## Fluxo de engenharia definido

~~~text
Requisito no Jira
    ↓
Análise técnica e dependências
    ↓
Branch e implementação assistida
    ↓
Testes e análise de qualidade
    ↓
Pull Request e revisão humana
    ↓
Homologação e aceite
    ↓
Integração e atualização do Jira
~~~

As responsabilidades de priorização, decisão e aprovação são humanas. A IA apoia análise, desenvolvimento, testes e documentação.

## CI deste repositório público

O [workflow público](../.github/workflows/ci.yml) executa os testes de um exemplo independente. **Seu resultado não comprova os pipelines privados do QBugado**.

[Voltar ao case](../README.md)

