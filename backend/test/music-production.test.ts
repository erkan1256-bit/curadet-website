import test from 'node:test';
import assert from 'node:assert/strict';
import { canReleaseFinalMusic, nextMusicStatus } from '../src/domain/music-production.js';

test('final music cannot release without every commercial and rights gate', () => {
  assert.equal(canReleaseFinalMusic({
    qualityPassed: true,
    originalityPassed: true,
    rightsCleared: true,
    paymentSettled: false,
    contractAccepted: true,
    activeEntitlement: true
  }), false);
});

test('final music releases only when quality originality rights payment contract and entitlement pass', () => {
  assert.equal(canReleaseFinalMusic({
    qualityPassed: true,
    originalityPassed: true,
    rightsCleared: true,
    paymentSettled: true,
    contractAccepted: true,
    activeEntitlement: true
  }), true);
});

test('03-06 workflow supports revision without bypassing render and review', () => {
  assert.equal(nextMusicStatus('client_preview', 'revise'), 'revision');
  assert.equal(nextMusicStatus('revision', 'render'), 'rendering');
});

test('invalid workflow transitions are rejected', () => {
  assert.throws(() => nextMusicStatus('brief_received', 'deliver'));
});
