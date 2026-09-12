export type EvidenceKind = 'authoritative' | 'stored' | 'generated' | 'demo';

export type SystemRequest = {
  action: string;
  input: Record<string, unknown>;
  actorId: string;
  requestId: string;
};

export type SystemEvidence = {
  kind: EvidenceKind;
  source: string;
  observedAt: string;
  data: Record<string, unknown>;
};

export type SystemResult = {
  ok: boolean;
  requestId: string;
  evidence: SystemEvidence[];
  result: Record<string, unknown> | null;
  error?: string;
};

export interface AuthorizedSystemAdapter {
  execute(request: SystemRequest): Promise<SystemResult>;
}