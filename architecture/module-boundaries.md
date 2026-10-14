# Arquitetura lógica — fronteiras de domínio

**Natureza:** decisão documentada, não declaração de implementação completa.  
**Fontes internas:** Arquitetura Técnica QBugado v1.0 (11/09/2026); SCRUM-20; SCRUM-23.

## Problema

A experiência exige identidade, estado, regras de interação, IA e registros duráveis. Fronteiras explícitas tornam alterações mais compreensíveis e reduzem o risco de acoplamento indiscriminado.

## Cinco fronteiras definidas

| Módulo lógico | Responsabilidade |
| --- | --- |
| Identity | Identidade, autenticação e controle de acesso |
| Journey | Estado, continuidade e retomada da Jornada |
| Experience | Experiência e consequências das ações |
| Bug | Integração e orquestração de IA |
| Grimoire | Preservação e recuperação de registros |

### Esquema conceitual — não extraído do código

~~~text
         Next.js / React
                |
          HTTPS / REST
                |
            NestJS API
                |
     Fronteiras do domínio
    /         |           \
 Identity   Journey    Experience
                |           |
            Grimoire       Bug
                |
    Adaptadores de infraestrutura
~~~

O esquema indica responsabilidades, **não** conexões, sequência de chamadas ou diretórios implementados.

## Restrições arquiteturais registradas

- Um módulo não deve acessar diretamente repositórios ou tabelas internas de outro.
- A comunicação entre módulos deve ocorrer por interfaces e casos de uso públicos.
- Frameworks, ORM e provedores externos não devem contaminar o núcleo das regras de negócio.
- Comunicação direta entre módulos é suficiente para o MVP; eventos somente quando justificáveis.
- Código compartilhado mínimo, para evitar centralização indevida do domínio.

## Situação observada

Na branch principal consultada em 14/10/2026, a estrutura de backend/src ainda não expunha cinco diretórios independentes correspondentes às fronteiras acima. Isso não comprova implementação integral da arquitetura — nem permite julgar sua aderência sem examinar responsabilidades e dependências.

[Voltar ao case](../README.md)

