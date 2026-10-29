import assert from 'node:assert/strict';
import test from 'node:test';
import { selectRenderer } from '../src/domain/renderer-selection.js';
import type { MusicBrainLearningRecord } from '../src/domain/music-brain-memory.js';
import type { RendererKind } from '../src/domain/music-brain.js';

function record(id: string, renderer: RendererKind, outcome: MusicBrainLearningRecord['outcome'], score: number, hardFail = false): MusicBrainLearningRecord {
  return {
    learningId: id,
    projectId: 'project-1',
    decisionId: `decision-${id}`,
    renderId: `render-${id}`,
    renderer,
    createdAt: '2026-10-29T20:30:00Z',
    outcome,
    hardFailReasons: hardFail ? ['broken generation'] : [],
    corrections: [],
    scores: { release_readiness: score },
    decisionSnapshot: { musicalIntent: 'human music', constraints: [] }
  };
}

const policy = { minimumSamples: 2, maximumHardFailRate: 0.25, minimumAverageScore: 80 };

test('does not auto-select a renderer when evidence is insufficient', () => {
  const result = selectRenderer([record('1', 'suno', 'accepted', 95)], policy);
  assert.equal(result.reason, 'insufficient_evidence');
  assert.equal(result.renderer, undefined);
});

test('selects the strongest renderer only after evidence and quality gates pass', () => {
  const records = [
    record('1', 'suno', 'accepted', 88),
    record('2', 'suno', 'accepted', 90),
    record('3', 'local', 'accepted', 82),
    record('4', 'local', 'revised', 80)
  ];
  const result = selectRenderer(records, policy);
  assert.equal(result.reason, 'selected');
  assert.equal(result.renderer, 'suno');
});

test('refuses every renderer when measured quality fails the gate', () => {
  const records = [
    record('1', 'suno', 'rejected', 60, true),
    record('2', 'suno', 'rejected', 65, true),
    record('3', 'local', 'revised', 70),
    record('4', 'local', 'revised', 72)
  ];
  const result = selectRenderer(records, policy);
  assert.equal(result.reason, 'quality_gate_failed');
  assert.equal(result.renderer, undefined);
});
