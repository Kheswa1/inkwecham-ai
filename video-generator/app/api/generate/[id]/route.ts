import { NextResponse } from 'next/server';
import { getVideoTask } from '@/lib/runway';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const task = await getVideoTask(params.id);
    return NextResponse.json(task);
  } catch (error) {
    console.error('Polling error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to retrieve task' }, { status: 500 });
  }
}
