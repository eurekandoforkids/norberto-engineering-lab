# Security and privacy review

The demo is deliberately stateless and stores no user data. The example records are fictional.

Controls implemented:
- Allowlisted routes for static assets; no generic file hosting or directory traversal.
- Strict request schema, numeric bounds, duplicate checking, 20-item batch maximum.
- 64 KiB request size limit, no credentials, no external service calls.
- Security response headers including CSP, `nosniff`, `no-referrer`, frame denial.
- No HTML insertion of user text; browser app renders user-controlled titles via `textContent`.
- CI runs built-in tests without third-party packages or repository write permissions.

Limitations and follow-ups before any wider deployment:
- No authentication, because it is an *anonymous, read-only decision-support demo*, not a multi-user business application.
- Fixed in-memory fictional examples; no real records or decisions are saved.
- No rate limiting / WAF; apply on a production edge if publishing an API openly.
- Standard HTTP parser and body bounds do not replace network-layer request limits.
- Prioritization is not an autonomous decision; no bias/fairness assessment for a real population is claimed.

**Confidentiality policy:** no internal QBugado data, screenshots, designs, source files, workflows, tokens, architectures, prompts or unpublished roadmap belong in this repository. Review every new file, SVG, image, `.env` and git history before publishing.
