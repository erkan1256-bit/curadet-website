import assert from 'node:assert/strict';
import test from 'node:test';
import { buildLearningRecord, comparableAcrossRenderers } from '../src/domain/music-brain-memory.js';
import type { AnalyzerVerdict, MusicDecision } from '../src/domain/music-brain.js';

const decision: MusicDecision = {
  decisionId: 'decision-1',
  projectId: 'project-1',
  createdAt: '2026-10-29T20:00:00Z',
  musicalIntent: 'Human, natural and emotionally coherent performance',
  rhythmPlan: '9/8 with controlled microtiming',
  instrumentationPlan: 'Acoustic physical instruments',
  constraints: ['no synthetic timing collapse']
};

const verdict: AnalyzerVerdict = {
  renderId: 'render-1',
  passed: false,
  hardFailReasons: [],
  scores: { realism: 74, rhythm_timing: 81 },
  corrections: ['reduce quantized feel']
};

test('learning memory preserves CURADET decision and analyzer evidence independently of renderer', () => {
  const record = buildLearningRecord({
    learningId: 'learning-1',
    decision,
    renderId: 'render-1',
    renderer: 'suno',
    rendererModel: 'external-model',
    verdict,
    outcome: 'revised',
    createdAt: '2026-10-29T20:01:00Z'
  });

  assert.equal(record.decisionId, decision.decisionId);
  assert.equal(record.renderer, 'suno');
  assert.equal(record.scores.realism, 74);
  assert.deepEqual(record.corrections, ['reduce quantized feel']);
});

test('learning record rejects analyzer evidence from another render', () => {
  assert.throws(() => buildLearningRecord({
    learningId: 'learning-bad',
    decision,
    renderId: 'render-2',
    renderer: 'local',
    verdict,
    outcome: 'rejected',
    createdAt: '2026-10-29T20:02:00Z'
  }));
});

test('cross-renderer comparison requires evidence from at least two renderer kinds', () => {
  const first = buildLearningRecord({
    learningId: 'learning-1', decision, renderId: 'render-1', renderer: 'suno', verdict,
    outcome: 'revised', createdAt: '2026-10-29T20:01:00Z'
  });
  const localVerdict = { ...verdict, renderId: 'render-local' };
  const second = buildLearningRecord({
    learningId: 'learning-2', decision, renderId: 'render-local', renderer: 'local', verdict: localVerdict,
    outcome: 'accepted', createdAt: '2026-10-29T20:03:00Z'
  });

  assert.equal(comparableAcrossRenderers([first]), false);
  assert.equal(comparableAcrossRenderers([first, second]), true);
});
