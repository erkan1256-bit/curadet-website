import type { AnalyzerVerdict, MusicDecision, RendererKind } from './music-brain.js';

export type LearningOutcome = 'accepted' | 'rejected' | 'revised' | 'human_review';

export type MusicDecisionSnapshot = {
  musicalIntent: string;
  rhythmPlan?: string;
  melodyPlan?: string;
  harmonyOrMakamPlan?: string;
  arrangementPlan?: string;
  vocalPlan?: string;
  instrumentationPlan?: string;
  emotionalArc?: string;
  constraints: string[];
};

export type MusicBrainLearningRecord = {
  learningId: string;
  projectId: string;
  decisionId: string;
  renderId: string;
  renderer: RendererKind;
  rendererModel?: string;
  createdAt: string;
  outcome: LearningOutcome;
  hardFailReasons: string[];
  corrections: string[];
  scores: Record<string, number>;
  decisionSnapshot: MusicDecisionSnapshot;
};

function snapshotDecision(decision: MusicDecision): MusicDecisionSnapshot {
  return {
    musicalIntent: decision.musicalIntent,
    ...(decision.rhythmPlan !== undefined ? { rhythmPlan: decision.rhythmPlan } : {}),
    ...(decision.melodyPlan !== undefined ? { melodyPlan: decision.melodyPlan } : {}),
    ...(decision.harmonyOrMakamPlan !== undefined ? { harmonyOrMakamPlan: decision.harmonyOrMakamPlan } : {}),
    ...(decision.arrangementPlan !== undefined ? { arrangementPlan: decision.arrangementPlan } : {}),
    ...(decision.vocalPlan !== undefined ? { vocalPlan: decision.vocalPlan } : {}),
    ...(decision.instrumentationPlan !== undefined ? { instrumentationPlan: decision.instrumentationPlan } : {}),
    ...(decision.emotionalArc !== undefined ? { emotionalArc: decision.emotionalArc } : {}),
    constraints: [...decision.constraints]
  };
}

export function buildLearningRecord(input: {
  learningId: string;
  decision: MusicDecision;
  renderId: string;
  renderer: RendererKind;
  rendererModel?: string;
  verdict: AnalyzerVerdict;
  outcome: LearningOutcome;
  createdAt: string;
}): MusicBrainLearningRecord {
  const { decision, verdict } = input;
  if (verdict.renderId !== input.renderId) {
    throw new Error('Analyzer verdict must belong to the render being learned from');
  }

  return {
    learningId: input.learningId,
    projectId: decision.projectId,
    decisionId: decision.decisionId,
    renderId: input.renderId,
    renderer: input.renderer,
    ...(input.rendererModel !== undefined ? { rendererModel: input.rendererModel } : {}),
    createdAt: input.createdAt,
    outcome: input.outcome,
    hardFailReasons: [...verdict.hardFailReasons],
    corrections: [...verdict.corrections],
    scores: { ...verdict.scores },
    decisionSnapshot: snapshotDecision(decision)
  };
}

export function comparableAcrossRenderers(records: MusicBrainLearningRecord[]): boolean {
  const renderers = new Set(records.map((record) => record.renderer));
  return records.length >= 2 && renderers.size >= 2;
}
