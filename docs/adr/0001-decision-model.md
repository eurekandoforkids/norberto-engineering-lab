# ADR-0001 — Explainable prioritization, human decision

**Status:** Accepted for this independent technical demonstration.

## Context
A generic initiative register needs comparable, transparent prioritization without simulating an opaque AI verdict. The demonstrator must contain no confidential data, models, prompts or code from any private product.

## Decision
Use TypeScript domain logic, bounded 0–5 criteria, explicit weights totaling 100%, and an ordered breakdown for every evaluation. Impact (35%), urgency (15%) and confidence (20%) are beneficial; effort (20%) and risk (10%) are inverted. The formula outputs 0–100 and ties sort by stable ID. Criteria and thresholds are an **illustrative hypothesis** rather than an organizational policy.

## Alternatives considered
- **Opaque LLM scoring:** declined because outputs would be difficult to reproduce and audit.
- **Single priority dropdown:** declined because it would conceal the trade-offs.
- **Managed database:** deferred because the demo intentionally does not persist user data.

## Consequences
Pros: deterministic, explainable, testable, easy to inspect. Cons: fixed weights may be unsuitable in another context; human decision and validation remain necessary. No automated approvals or production business decisions are made.

## Ownership
The approach is an AI-assisted sample prepared for Norberto Berti to review. It is **not** a disclosed implementation of QBugado or Micélios, and must never be described as code from those systems.
