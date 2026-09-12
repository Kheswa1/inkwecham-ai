import { randomUUID } from 'node:crypto';
import { AuthorizedSystemAdapterImpl } from '@/lib/system/adapter';

export async function POST(request: Request) {
  const actorId = request.headers.get('x-actor-id');
  if (!actorId) return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  const body = await request.json() as { action?: string; input?: Record<string, unknown> };
  if (!body.action) return Response.json({ ok: false, error: 'Action is required' }, { status: 400 });

  const result = await new AuthorizedSystemAdapterImpl().execute({
    action: body.action,
    input: body.input ?? {},
    actorId,
    requestId: randomUUID(),
  });

  return Response.json(result, { status: result.ok ? 200 : 502 });
}