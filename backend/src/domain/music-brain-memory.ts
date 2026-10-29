import type { AnalyzerVerdict, MusicDecision, RendererKind } from './music-brain.js';

export type LearningOutcome = 'accepted' | 'rejected' | 'revised' | 'human_review';

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
  decisionSnapshot: Pick<MusicDecision,
    | 'musicalIntent'
    | 'rhythmPlan'
    | 'melodyPlan'
    | 'harmonyOrMakamPlan'
    | 'arrangementPlan'
    | 'vocalPlan'
    | 'instrumentationPlan'
    | 'emotionalArc'
    | 'constraints'
  >;
};

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
    rendererModel: input.rendererModel,
    createdAt: input.createdAt,
    outcome: input.outcome,
    hardFailReasons: [...verdict.hardFailReasons],
    corrections: [...verdict.corrections],
    scores: { ...verdict.scores },
    decisionSnapshot: {
      musicalIntent: decision.musicalIntent,
      rhythmPlan: decision.rhythmPlan,
      melodyPlan: decision.melodyPlan,
      harmonyOrMakamPlan: decision.harmonyOrMakamPlan,
      arrangementPlan: decision.arrangementPlan,
      vocalPlan: decision.vocalPlan,
      instrumentationPlan: decision.instrumentationPlan,
      emotionalArc: decision.emotionalArc,
      constraints: [...decision.constraints]
    }
  };
}

export function comparableAcrossRenderers(records: MusicBrainLearningRecord[]): boolean {
  const renderers = new Set(records.map((record) => record.renderer));
  return records.length >= 2 && renderers.size >= 2;
}
