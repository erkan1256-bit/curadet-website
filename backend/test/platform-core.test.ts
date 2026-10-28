import assert from "node:assert/strict";
import test from "node:test";
import {
  canPublish,
  hasActiveListeningEntitlement,
  type EntitlementGrant,
  type Recording,
} from "../src/domain/platform-core.js";

const baseRecording: Recording = {
  id: "rec_1",
  createdAt: "2026-10-29T00:00:00Z",
  updatedAt: "2026-10-29T00:00:00Z",
  version: 1,
  workId: "work_1",
  sourceClass: "curadet_original",
  contributors: [],
  rightsState: "cleared",
  provenanceState: "verified",
};

test("publication requires both rights clearance and verified provenance", () => {
  assert.equal(canPublish(baseRecording), true);
  assert.equal(canPublish({ ...baseRecording, rightsState: "hold" }), false);
  assert.equal(canPublish({ ...baseRecording, provenanceState: "draft" }), false);
});

test("listening entitlement must belong to user and be unexpired", () => {
  const grants: EntitlementGrant[] = [
    {
      id: "ent_1",
      createdAt: "2026-10-29T00:00:00Z",
      updatedAt: "2026-10-29T00:00:00Z",
      version: 1,
      userId: "user_1",
      scope: "listen",
      validUntil: "2026-11-29T00:00:00Z",
      authority: "subscription",
      authorityId: "sub_1",
    },
  ];

  assert.equal(hasActiveListeningEntitlement(grants, "user_1", "2026-10-29T00:00:00Z"), true);
  assert.equal(hasActiveListeningEntitlement(grants, "user_2", "2026-10-29T00:00:00Z"), false);
  assert.equal(hasActiveListeningEntitlement(grants, "user_1", "2026-12-01T00:00:00Z"), false);
});
