export type RendererKind = 'suno' | 'local' | 'external' | 'human';

export type MusicIntent = {
  projectId: string;
  purpose: string;
  language?: string;
  genre?: string[];
  mood?: string[];
  culturalContext?: string[];
  targetBpm?: number;
  durationSeconds?: number;
  vocalMode?: 'instrumental' | 'guide_vocal' | 'customer_performs' | 'curadet_vocal';
};

export type MusicDecision = {
  decisionId: string;
  projectId: string;
  createdAt: string;
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

export type RendererRequest = {
  decisionId: string;
  renderer: RendererKind;
  rendererModel?: string;
  instructions: string;
  lyrics?: string;
  negativeConstraints: string[];
  referenceAssetIds: string[];
};

export type RenderResult = {
  renderId: string;
  decisionId: string;
  renderer: RendererKind;
  rendererModel?: string;
  createdAt: string;
  assetIds: string[];
  provenance: {
    provider?: string;
    requestFingerprint: string;
    externalJobId?: string;
  };
};

export type AnalyzerVerdict = {
  renderId: string;
  passed: boolean;
  hardFailReasons: string[];
  scores: Record<string, number>;
  corrections: string[];
};

export type MusicBrainLoopAction = 'accept' | 'revise_decision' | 'rerender' | 'human_review';

export function decideNextMusicBrainAction(verdict: AnalyzerVerdict): MusicBrainLoopAction {
  if (verdict.hardFailReasons.length > 0) return 'revise_decision';
  if (!verdict.passed && verdict.corrections.length > 0) return 'rerender';
  if (!verdict.passed) return 'human_review';
  return 'accept';
}

export function assertRendererIndependence(request: RendererRequest): void {
  if (!request.decisionId) throw new Error('Renderer request must originate from a CURADET Music Brain decision');
  if (!request.instructions.trim()) throw new Error('Renderer instructions cannot be empty');
}
