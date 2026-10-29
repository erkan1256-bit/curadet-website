import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertRendererIndependence,
  decideNextMusicBrainAction,
  type AnalyzerVerdict,
  type RendererRequest
} from '../src/domain/music-brain.js';

test('accepts a renderer request only when it originates from a Music Brain decision', () => {
  const request: RendererRequest = {
    decisionId: 'decision-1',
    renderer: 'suno',
    instructions: 'Render the approved musical plan without changing the musical intent.',
    negativeConstraints: ['do not replace the approved rhythm plan'],
    referenceAssetIds: []
  };
  assert.doesNotThrow(() => assertRendererIndependence(request));
});

test('rejects renderer-first generation without a CURADET decision', () => {
  const request: RendererRequest = {
    decisionId: '',
    renderer: 'external',
    instructions: 'Generate something catchy.',
    negativeConstraints: [],
    referenceAssetIds: []
  };
  assert.throws(() => assertRendererIndependence(request), /Music Brain decision/);
});

test('hard analyzer failure returns work to Music Brain rather than blindly rerendering', () => {
  const verdict: AnalyzerVerdict = {
    renderId: 'render-1',
    passed: false,
    hardFailReasons: ['rhythm failure'],
    scores: { rhythm_timing: 20 },
    corrections: ['rebuild rhythm plan']
  };
  assert.equal(decideNextMusicBrainAction(verdict), 'revise_decision');
});

test('correctable renderer miss rerenders without replacing CURADET musical intent', () => {
  const verdict: AnalyzerVerdict = {
    renderId: 'render-2',
    passed: false,
    hardFailReasons: [],
    scores: { realism: 70 },
    corrections: ['reduce synthetic articulation']
  };
  assert.equal(decideNextMusicBrainAction(verdict), 'rerender');
});

test('passing analysis is accepted', () => {
  const verdict: AnalyzerVerdict = {
    renderId: 'render-3',
    passed: true,
    hardFailReasons: [],
    scores: { release_readiness: 92 },
    corrections: []
  };
  assert.equal(decideNextMusicBrainAction(verdict), 'accept');
});
