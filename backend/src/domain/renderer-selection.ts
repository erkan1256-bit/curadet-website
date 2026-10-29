import type { RendererKind } from './music-brain.js';
import { rankRenderers, type RendererEvaluation } from './renderer-evaluation.js';
import type { MusicBrainLearningRecord } from './music-brain-memory.js';

export type RendererSelectionPolicy = {
  minimumSamples: number;
  maximumHardFailRate: number;
  minimumAverageScore: number;
};

export type RendererSelection = {
  renderer?: RendererKind;
  reason: 'selected' | 'insufficient_evidence' | 'quality_gate_failed';
  evaluation?: RendererEvaluation;
};

function passesPolicy(evaluation: RendererEvaluation, policy: RendererSelectionPolicy): boolean {
  if (evaluation.sampleCount < policy.minimumSamples) return false;
  const hardFailRate = evaluation.hardFailCount / evaluation.sampleCount;
  return hardFailRate <= policy.maximumHardFailRate && evaluation.averageScore >= policy.minimumAverageScore;
}

export function selectRenderer(
  records: MusicBrainLearningRecord[],
  policy: RendererSelectionPolicy
): RendererSelection {
  const ranked = rankRenderers(records);
  if (ranked.length === 0 || ranked.every((evaluation) => evaluation.sampleCount < policy.minimumSamples)) {
    return { reason: 'insufficient_evidence' };
  }

  const eligible = ranked.filter((evaluation) => passesPolicy(evaluation, policy));
  const winner = eligible[0];
  if (!winner) return { reason: 'quality_gate_failed' };

  return {
    renderer: winner.renderer,
    reason: 'selected',
    evaluation: winner
  };
}
