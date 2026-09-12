# InkweCham AI

## Issue 13 rebuild foundation

This branch rebuilds the application from the current `main` baseline around a verified execution boundary.

### KHESH contract

`Understand → Verify → Reason → Coordinate → Decide → Execute → Report`

### Execution rules

- SYSTEM execution requires an authenticated Supabase user.
- The application calls a configured authorized SYSTEM adapter; it does not fabricate authoritative data.
- Missing adapter configuration fails closed.
- Adapter responses containing non-authoritative evidence are rejected at the boundary.
- Every execution attempt is persisted to `khesh_execution_audit` for traceability.
- Supabase RLS restricts audit reads/inserts to the authenticated actor.

### Next implementation gates

1. Connect the real authorized SYSTEM provider.
2. Add complete authentication UI and protected application routes.
3. Add automated adapter, persistence, boundary and end-to-end tests.
4. Connect KHESH reasoning/orchestration to the verified execution endpoint.
5. Verify the full Supabase flow before production deployment.
