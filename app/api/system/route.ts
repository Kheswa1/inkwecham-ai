import { randomUUID } from 'node:crypto';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AuthorizedSystemAdapterImpl } from '@/lib/system/adapter';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  const body = await request.json() as { action?: string; input?: Record<string, unknown> };
  if (!body.action) return Response.json({ ok: false, error: 'Action is required' }, { status: 400 });

  const requestId = randomUUID();
  const result = await new AuthorizedSystemAdapterImpl().execute({ action: body.action, input: body.input ?? {}, actorId: user.id, requestId });
  const evidence = result.evidence[0];
  await supabase.from('khesh_execution_audit').insert({ request_id: requestId, actor_id: user.id, action: body.action, status: result.ok ? 'completed' : 'failed', evidence_kind: evidence?.kind ?? 'stored', source: evidence?.source ?? 'system-boundary', result: result.result, error: result.error ?? null });
  return Response.json(result, { status: result.ok ? 200 : 502 });
}