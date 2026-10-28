export const catalogSourceClasses = [
  "curadet_original",
  "client_original",
  "co_production",
  "licensed_or_external",
] as const;

export type CatalogSourceClass = (typeof catalogSourceClasses)[number];

export type Id = string;
export type ISODateTime = string;

export interface AuditFields {
  id: Id;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  version: number;
}

export interface PartyRef {
  id: Id;
  kind: "curadet" | "person" | "artist" | "client" | "organization";
  displayName: string;
}

export interface Contribution {
  party: PartyRef;
  role: string;
  shareBps?: number;
  provenanceNote?: string;
}

export interface Work extends AuditFields {
  title: string;
  language?: string;
  contributors: Contribution[];
}

export interface Recording extends AuditFields {
  workId: Id;
  sourceClass: CatalogSourceClass;
  masterAssetId?: Id;
  durationMs?: number;
  contributors: Contribution[];
  rightsState: "draft" | "hold" | "cleared" | "blocked";
  provenanceState: "draft" | "verified" | "blocked";
}

export interface Release extends AuditFields {
  title: string;
  recordingIds: Id[];
  publicationState:
    | "draft"
    | "qc_passed"
    | "rights_cleared"
    | "metadata_ready"
    | "scheduled"
    | "published"
    | "paused"
    | "withdrawn";
}

export interface CatalogEntry extends AuditFields {
  releaseId: Id;
  recordingId: Id;
  visible: boolean;
  availableFrom?: ISODateTime;
  availableUntil?: ISODateTime;
}

export interface Subscription extends AuditFields {
  userId: Id;
  planId: Id;
  state: "pending" | "active" | "grace" | "past_due" | "cancelled" | "expired";
  providerRef?: string;
}

export interface EntitlementGrant extends AuditFields {
  userId: Id;
  scope: "listen" | "download" | "license" | "project";
  resourceId?: Id;
  validUntil?: ISODateTime;
  authority: "subscription" | "order" | "contract" | "owner_grant";
  authorityId: Id;
}

export interface ProductionProject extends AuditFields {
  sourceClass: Exclude<CatalogSourceClass, "licensed_or_external">;
  requester: PartyRef;
  title?: string;
  state:
    | "briefed"
    | "accepted"
    | "production"
    | "analysis_qc"
    | "preview"
    | "revision"
    | "approved"
    | "mastered"
    | "rights_metadata_gate"
    | "catalog_or_delivery";
  workId?: Id;
  recordingId?: Id;
}

export function canPublish(recording: Recording): boolean {
  return recording.rightsState === "cleared" && recording.provenanceState === "verified";
}

export function hasActiveListeningEntitlement(
  grants: EntitlementGrant[],
  userId: Id,
  now: ISODateTime,
): boolean {
  const nowMs = Date.parse(now);
  return grants.some((grant) => {
    if (grant.userId !== userId || grant.scope !== "listen") return false;
    if (!grant.validUntil) return true;
    return Date.parse(grant.validUntil) > nowMs;
  });
}
