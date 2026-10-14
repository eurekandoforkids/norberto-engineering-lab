# ADR-002 — Backend como fonte da verdade

**Status:** decisão definida na SCRUM-26 e no documento de arquitetura.

## Tensão

Uma pessoa pode fechar o navegador ou perder a conexão entre uma interação e a confirmação de sua gravação. A interface não deve afirmar que uma mudança foi concluída se o backend não a persistiu.

## Decisão registrada

- Estado de negócio da Jornada é preservado no backend com PostgreSQL/Prisma.
- Ações confirmadas que alteram o domínio precisam ser persistidas.
- Uma mudança apenas visual não significa avanço de negócio.
- O frontend reconstrói a continuidade a partir do último estado persistido.
- Operações precisam respeitar a identidade autorizada.

## Plano de verificação, ainda não executado como evidência pública

| Falha simulada | Propriedade esperada |
| --- | --- |
| Aba encerrada após confirmação | Estado recuperável no retorno |
| Rede interrompida antes da confirmação | Não afirmar conclusão |
| Solicitação de dados de outra conta | Acesso negado no servidor |
| Retomada de Jornada incompleta | Continuidade no ponto válido |

Event Sourcing e sincronização offline **não** integram o MVP definido.

**Atenção:** são critérios arquiteturais e cenários para teste, não resultados de testes existentes.

[Voltar ao case](../README.md)

