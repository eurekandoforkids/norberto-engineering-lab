# ADR-003 — Identidade gerenciada e controle de acesso

**Status:** decisão registrada; conciliação entre arquitetura e implementação ainda requer verificação.  
**Fontes internas:** SCRUM-25 e SCRUM-13.

## Problema

Cadastro, credenciais, sessão, recuperação de acesso e autorização exigem controles específicos. Reimplementar identidade do zero aumentaria o esforço e a responsabilidade de segurança do produto.

## Decisão

- Usar Supabase Auth como provedor gerenciado de autenticação.
- Não armazenar senhas nas tabelas do domínio.
- Separar autenticação (quem acessa) de autorização (o que essa identidade pode acessar).
- Aplicar controles de autorização no backend.
- Isolar responsabilidades de identidade de outros módulos do domínio.

## Implementação observada

A página de cadastro na branch main chama **supabase.auth.signUp diretamente do frontend**. Esse uso do SDK, isoladamente, não indica uma vulnerabilidade. Porém, o documento prevê um módulo Identity que encapsule dependências relevantes de autenticação e cuide do limite com o domínio.

**Diferença real que precisa ser resolvida:** definir e comprovar onde terminam as responsabilidades do frontend e onde começam autenticação, autorização, vínculo de domínio e persistência do backend.

## Verificações necessárias

- Acesso autorizado aos recursos por identidade, no servidor.
- Tratamento seguro de sessão expirada e falhas.
- Prevenção de enumeração de contas por mensagens.
- Evidência de testes reais de cadastro e recuperação de acesso.

[Trechos reais de cadastro](../code/registration-excerpts.md) · [Voltar](../README.md)

