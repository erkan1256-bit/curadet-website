import type { MusicBrainLearningRecord } from './music-brain-memory.js';
import type { RendererKind } from './music-brain.js';

export type RendererEvaluation = {
  renderer: RendererKind;
  sampleCount: number;
  acceptedCount: number;
  hardFailCount: number;
  averageScore: number;
};

export function evaluateRenderer(records: MusicBrainLearningRecord[], renderer: RendererKind): RendererEvaluation {
  const samples = records.filter((record) => record.renderer === renderer);
  if (samples.length === 0) {
    return { renderer, sampleCount: 0, acceptedCount: 0, hardFailCount: 0, averageScore: 0 };
  }

  let scoreTotal = 0;
  let scoreCount = 0;
  for (const sample of samples) {
    for (const score of Object.values(sample.scores)) {
      if (Number.isFinite(score)) {
        scoreTotal += score;
        scoreCount += 1;
      }
    }
  }

  return {
    renderer,
    sampleCount: samples.length,
    acceptedCount: samples.filter((sample) => sample.outcome === 'accepted').length,
    hardFailCount: samples.filter((sample) => sample.hardFailReasons.length > 0).length,
    averageScore: scoreCount > 0 ? scoreTotal / scoreCount : 0
  };
}

export function rankRenderers(records: MusicBrainLearningRecord[]): RendererEvaluation[] {
  const renderers: RendererKind[] = ['local', 'suno', 'external', 'human'];
  return renderers
    .map((renderer) => evaluateRenderer(records, renderer))
    .filter((evaluation) => evaluation.sampleCount > 0)
    .sort((a, b) => {
      const aAcceptance = a.acceptedCount / a.sampleCount;
      const bAcceptance = b.acceptedCount / b.sampleCount;
      if (aAcceptance !== bAcceptance) return bAcceptance - aAcceptance;

      const aHardFailRate = a.hardFailCount / a.sampleCount;
      const bHardFailRate = b.hardFailCount / b.sampleCount;
      if (aHardFailRate !== bHardFailRate) return aHardFailRate - bHardFailRate;

      return b.averageScore - a.averageScore;
    });
}
