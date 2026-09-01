import { NextResponse } from 'next/server';
import { createVideo } from '@/lib/runway';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

    const task = await createVideo({
      prompt,
      imageUrl: typeof body.imageUrl === 'string' && body.imageUrl.trim() ? body.imageUrl.trim() : undefined,
      model: typeof body.model === 'string' ? body.model : 'gen4.5',
      ratio: typeof body.ratio === 'string' ? body.ratio : '1280:720',
      duration: Number(body.duration) === 10 ? 10 : 5,
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Generation failed' }, { status: 500 });
  }
}
