import type { AuthorizedSystemAdapter, SystemRequest, SystemResult } from './types';

/**
 * Production boundary: never manufacture authoritative evidence.
 * Until a real authorized provider is configured, execution fails closed.
 */
export class AuthorizedSystemAdapterImpl implements AuthorizedSystemAdapter {
  async execute(request: SystemRequest): Promise<SystemResult> {
    if (!request.actorId) return { ok: false, requestId: request.requestId, evidence: [], result: null, error: 'Missing authorized actor' };
    if (!process.env.SYSTEM_ADAPTER_URL) return { ok: false, requestId: request.requestId, evidence: [], result: null, error: 'SYSTEM_ADAPTER_URL is not configured' };

    const response = await fetch(process.env.SYSTEM_ADAPTER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.SYSTEM_ADAPTER_TOKEN ?? ''}` },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    if (!response.ok) return { ok: false, requestId: request.requestId, evidence: [], result: null, error: `System adapter returned ${response.status}` };
    const payload = (await response.json()) as SystemResult;
    if (!payload.evidence.every((item) => item.kind === 'authoritative')) return { ok: false, requestId: request.requestId, evidence: payload.evidence, result: null, error: 'Non-authoritative evidence crossed the system boundary' };
    return payload;
  }
}