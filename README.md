# Decision Lab — Engineering demonstration

**A public, independent sample of TypeScript engineering, API design, testability and human oversight.**

Prepared as a demonstrative technical artifact for **Norberto Berti**. The executive portfolio remains at **https://qbugado-ai-portfolio.vercel.app/**. It is **not QBugado source code**, not a fork or extract from a private repository, and does not disclose proprietary architecture. Any professional portfolio should distinguish this sample from production features and measured results.

## What it shows

- **Product thinking:** a small, explicit decision-support problem that a reviewer can understand.
- **Engineering:** TypeScript domain model with runtime schema validation, dependency-free Node.js API, deterministic results and precise error responses.
- **Explainability:** per-criterion weights, beneficial versus costly dimensions and an audit-friendly scoring breakdown.
- **Quality:** automated domain + HTTP tests and a read-only GitHub Actions CI pipeline.
- **Governance:** ADR on trade-offs, security review and clear human decision boundaries.

## Run locally

Requires **Node.js 22.16+**. There are *no external packages*, secrets, installations or API keys.

```bash
npm test
npm start
# open http://localhost:3000
```

REST example:

```bash
curl -s http://localhost:3000/api/examples
curl -s -X POST http://localhost:3000/api/evaluate \
  -H 'Content-Type: application/json' \
  -d '{"initiatives":[{"id":"demo","title":"Automatizar relatórios","scores":{"impact":5,"urgency":4,"confidence":5,"effort":2,"risk":1}}]}'
```

## Structure

```text
src/core.ts            Domain logic, validation and scoring
src/server.ts          HTTP API and route allowlist
src/examples.ts        Fictional sample data
public/                Accessible responsive UI
tests/                 Unit and HTTP integration tests
.github/workflows/     Read-only CI
docs/adr/0001-...       Architecture decision record
docs/SECURITY.md       Controls and known limitations
```

## Scoring, not automatic approval

Inputs are integers 0–5. Weighted total 0–100 uses impact 35%, urgency 15%, confidence 20%, *lower effort* 20% and *lower risk* 10%. Higher total is a suggestion, not a decision. Weights are an illustrative hypothesis, **not** a validated enterprise policy.

## Responsibility and attribution

This sample was drafted with ChatGPT (GPT-6) in an AI-assisted workflow. Norberto is the intended owner/reviewer of the portfolio case; no completed human approval, production deployment or employment outcome is implied by this README. Track actual code review and changes through public pull requests once the repo exists.

## Intellectual property and limits

All files in this repository are original fictional demonstration material. No code, private metrics, configurations, AI guardrails, user data or unpublished designs from QBugado or Micélios were reused. Public visibility does not mean the private projects are public. No open-source license is granted by default.