# INKWE AI — Shared Engineering and Preservation Rules

This repository contains historical or current work within the INKWENATIVE AI / InkweCham / INKWE AI ecosystem.

## Identity and architecture
INKWENATIVE AI is the founding umbrella vision. INKWE AI is the current unified central intelligence architecture evolved from it. Preserve both historical continuity and current identity. The target is ONE central intelligence ecosystem, not multiple competing independent AI brains.

KHESH is the primary conversational companion and coordinator. Neutracore/NeuralCore provide shared orchestration, governance and infrastructure according to their reconciled responsibilities. IC AI CITY is an experience/environment, not a separate intelligence brain. Specialist capabilities may retain their own interfaces, data boundaries and domain controls while using shared central governance.

## Preservation
- Preserve existing code, branches, commits, designs, names, APIs and data until explicitly reviewed.
- Do not delete, rewrite, rename, relocate or merge historical work as incidental cleanup.
- Inspect all branches and relevant history before declaring a branch obsolete or a repository duplicate.
- Prefer adapters and staged migration over destructive replacement.
- Record the source repository, branch, commit, status and migration destination when consolidating code.
- Do not assume a project is canonical based only on a repository name.

## Reality and claims
Distinguish VERIFIED, PRESENT IN SOURCE, HISTORICAL, PLANNED, UNKNOWN, BLOCKED and DEPRECATED. A README, mock, branch, UI, migration file or generated output is not proof of a production deployment or live integration. Never fabricate test results, provider connectivity, production state, payments or execution evidence.

## Security and authority
- Treat clients, webhooks, external APIs, retrieved documents and model outputs as untrusted.
- Enforce authentication, authorization, ownership and tenant isolation server-side.
- Keep provider credentials and privileged tokens server-side and out of Git.
- Apply least privilege to agents, services, tools, database access and integrations.
- Validate inputs, provider outputs, webhook signatures and replay protection.
- Use idempotency, durable state and safe retries for side-effecting actions.
- Protect secrets and personal data in logs and errors.
- Never allow an AI model or specialist capability to grant itself permissions or bypass policy.

## Execution and governance
No agent, service, UI, webhook, automation or provider may bypass central authorization, required owner approval, Reality/evidence verification or domain-specific controls. Recommendation is not execution. Report actual outcomes truthfully, including partial, blocked, failed and unknown states.

For InkweCham commercial operations, apply the 60% cleared-deposit gate only to the approved workflow where it applies; do not hardcode it into unrelated products. Cleared funds require authoritative payment evidence, not a screenshot alone.

For trading code only: TradingView signals are inputs, never order authorization. Independent strategy validation, broker gateway and separate Risk Guardian Alpha AND Risk Guardian Omega approvals are mandatory for every live order. No bypasses or guaranteed-return claims.

For creative/media code only: respect provider API constraints, licensing, cost limits, job state and output provenance. Do not claim a rendered asset exists until the provider/storage result is verified.

## Engineering quality
Prefer small, additive changes. Preserve API contracts. Add tests for business rules, authorization, failure paths, retries and integration boundaries. Treat migrations as durable high-risk changes; inspect RLS, grants, constraints and recovery. Do not claim a test passed unless its result is visible.

## Release authority
Code review tools may explain and suggest. They do not authorize merging, production data changes, financial actions, provider spend or deployment. Human maintainers retain final authority.
