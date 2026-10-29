import assert from 'node:assert/strict';
import test from 'node:test';
import { buildLearningRecord } from '../src/domain/music-brain-memory.js';
import { evaluateRenderer, rankRenderers } from '../src/domain/renderer-evaluation.js';
import type { AnalyzerVerdict, MusicDecision, RendererKind } from '../src/domain/music-brain.js';

const decision: MusicDecision = {
  decisionId: 'decision-eval',
  projectId: 'project-eval',
  createdAt: '2026-10-29T20:10:00Z',
  musicalIntent: 'Natural human musical expression',
  constraints: ['renderer must not own the musical decision']
};

function record(renderer: RendererKind, renderId: string, score: number, accepted: boolean, hardFail = false) {
  const verdict: AnalyzerVerdict = {
    renderId,
    passed: accepted,
    hardFailReasons: hardFail ? ['generation failure'] : [],
    scores: { release_readiness: score, realism: score },
    corrections: accepted ? [] : ['improve performance']
  };
  return buildLearningRecord({
    learningId: `learning-${renderId}`,
    decision,
    renderId,
    renderer,
    verdict,
    outcome: accepted ? 'accepted' : 'revised',
    createdAt: '2026-10-29T20:11:00Z'
  });
}

test('renderer evaluation is based on CURADET learning evidence', () => {
  const records = [record('suno', 's1', 82, true), record('suno', 's2', 70, false)];
  const evaluation = evaluateRenderer(records, 'suno');
  assert.equal(evaluation.sampleCount, 2);
  assert.equal(evaluation.acceptedCount, 1);
  assert.equal(evaluation.averageScore, 76);
});

test('ranking can prefer a better renderer without changing Music Brain decisions', () => {
  const records = [
    record('suno', 's1', 70, false),
    record('local', 'l1', 88, true),
    record('external', 'e1', 60, false, true)
  ];
  const ranking = rankRenderers(records);
  assert.equal(ranking[0]?.renderer, 'local');
  assert.equal(ranking.at(-1)?.renderer, 'external');
});
