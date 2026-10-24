export type MusicJobStatus =
  | 'brief_received'
  | 'music_brain_planning'
  | 'rendering'
  | 'quality_review'
  | 'originality_review'
  | 'client_preview'
  | 'revision'
  | 'rights_clearance'
  | 'ready_for_delivery'
  | 'delivered'
  | 'rejected';

export type MusicBrief = {
  projectId: string;
  customerId: string;
  privateProject: boolean;
  silentClient: boolean;
  title?: string;
  intent: string;
  language?: string;
  genre?: string[];
  mood?: string[];
  bpm?: { min?: number; max?: number; target?: number };
  durationSeconds?: number;
  vocalMode: 'instrumental' | 'guide_vocal' | 'customer_performs' | 'curadet_vocal';
  exclusivity: 'non_exclusive' | 'limited_exclusive' | 'full_exclusive';
  requestedDeliverables: Array<'preview_mp3' | 'master_wav' | 'instrumental_wav' | 'stems' | 'short_cuts' | 'lyrics' | 'score_midi'>;
};

export type MusicVersion = {
  versionId: string;
  projectId: string;
  status: MusicJobStatus;
  createdAt: string;
  parentVersionId?: string;
  productionNotes?: string;
  qualityScore?: number;
  originalityScore?: number;
  exclusiveConflict?: boolean;
  approvedForPreview: boolean;
  approvedForDelivery: boolean;
};

export type DeliveryAsset = {
  assetId: string;
  versionId: string;
  kind: 'preview_mp3' | 'master_wav' | 'instrumental_wav' | 'stem' | 'short_cut' | 'lyrics' | 'score_midi';
  private: boolean;
  sha256: string;
  bytes: number;
  mimeType: string;
};

export type MusicReleaseGateInput = {
  qualityPassed: boolean;
  originalityPassed: boolean;
  rightsCleared: boolean;
  paymentSettled: boolean;
  contractAccepted: boolean;
  activeEntitlement: boolean;
};

export function canReleaseFinalMusic(input: MusicReleaseGateInput): boolean {
  return input.qualityPassed
    && input.originalityPassed
    && input.rightsCleared
    && input.paymentSettled
    && input.contractAccepted
    && input.activeEntitlement;
}

export function nextMusicStatus(current: MusicJobStatus, action: 'plan' | 'render' | 'qc_pass' | 'originality_pass' | 'preview' | 'revise' | 'rights_pass' | 'deliver' | 'reject'): MusicJobStatus {
  if (action === 'reject') return 'rejected';
  const transitions: Partial<Record<MusicJobStatus, Partial<Record<typeof action, MusicJobStatus>>>> = {
    brief_received: { plan: 'music_brain_planning' },
    music_brain_planning: { render: 'rendering' },
    rendering: { qc_pass: 'quality_review' },
    quality_review: { originality_pass: 'originality_review' },
    originality_review: { preview: 'client_preview' },
    client_preview: { revise: 'revision', rights_pass: 'rights_clearance' },
    revision: { render: 'rendering' },
    rights_clearance: { deliver: 'ready_for_delivery' },
    ready_for_delivery: { deliver: 'delivered' }
  };
  const next = transitions[current]?.[action];
  if (!next) throw new Error(`Invalid music workflow transition: ${current} -> ${action}`);
  return next;
}
