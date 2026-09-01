import RunwayML from '@runwayml/sdk';

const apiKey = process.env.RUNWAYML_API_SECRET;
if (!apiKey) throw new Error('RUNWAYML_API_SECRET is not configured');

export const runway = new RunwayML({ apiKey });

export type GenerateInput = {
  prompt: string;
  imageUrl?: string;
  model: string;
  ratio: string;
  duration: number;
};

export async function createVideo(input: GenerateInput) {
  const payload: Record<string, unknown> = {
    model: input.model,
    promptText: input.prompt,
    ratio: input.ratio,
    duration: input.duration,
  };
  if (input.imageUrl) payload.promptImage = input.imageUrl;

  const task = await runway.imageToVideo.create(payload as never);
  return { id: task.id };
}

export async function getVideoTask(id: string) {
  return runway.tasks.retrieve(id);
}
