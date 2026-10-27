# CURADET AI + CONTROL CENTER — v0.1

Status: LOCKED ARCHITECTURE BASELINE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ

## Product rule
CURADET is one product with two strictly separated faces:

1. Public consumer interface — music, albums, catalog, discovery, licensing and future consumer services.
2. CURADET Control Center — authenticated Owner command interface.

The public interface and Control Center MUST be separated by authentication, authorization, API access, data exposure and publishing permissions.

## Core topology
OWNER → CURADET CONTROL CENTER → 00 MERKEZ / ORCHESTRATOR → CURADET systems → verified result → CONTROL CENTER

The primary CURADET core remains local/notebook-hosted. The web Control Center is NOT the core. It is an authorized control surface for the core.

## CURADET AI rule
AI runs primarily in the background. CURADET is the visible product; AI is a replaceable intelligence layer.

No single AI vendor, renderer or platform is the system of record.

CURADET-owned rules, decisions, metadata, audit records and operational memory remain under CURADET control.

## Music operation chain
MUSIC BRAIN → RENDERER ADAPTERS → MUSIC ANALYZER → CANDIDATE GATES → MASTER CANDIDATE → RIGHTS/METADATA GATE → COVER/SOCIAL PACKAGE → RELEASE PLAN → PUBLISH → PERFORMANCE → LEARNING → MUSIC BRAIN

Renderer adapters may include Suno, other AI engines, future CURADET Render Engine and studio recordings.

## MUSIC ANALYZER — P0
Analyzer must evaluate candidates without depending on the renderer. Initial evaluation families:
- technical audio quality
- rhythm/timing
- melody/motif
- tonality/makam
- vocal quality
- Turkish intelligibility when applicable
- lyric/music alignment
- structure/transitions
- energy/dynamics
- hook/chorus strength
- originality
- realism
- replay value
- shareable 10–20 second segment
- release readiness

Hard-fail gates override aggregate score for critical defects.

Every result must preserve: input identity/hash, analyzer version, criteria/threshold version, scores, hard-fails, elimination reasons, winner rationale, confidence and timestamps.

## Unit boundaries
- 03 — CURADET MUSIC AI: music production and final musical product.
- 03A — Music Experiment Lab: criteria, experiments, benchmarks and quality methods.
- 02 — Marketing & Social: social strategy, content and publishing operations.
- 04 — Rights & Distribution: rights, provenance, metadata, distribution and release safety.
- 06 — Technology: Analyzer implementation, automation, integrations, Control Center and local technical infrastructure.
- 00 — CURADET MERKEZ: shared architecture, prioritization, orchestration and cross-unit coordination.

No unit duplicates another unit's system.

## Owner Today screen
Default Control Center view must reduce operational burden. It should summarize:
- productions analyzed
- candidates eliminated
- selected master candidate + confidence
- critical listening segment
- rights/metadata status
- cover/social package status
- release schedule
- performance results
- revenue summary
- local-core/system health
- ONLY decisions that genuinely require Owner authority

## Autonomy safety
Initial target is controlled autonomy, not blind autonomous publishing.
Automatic release authority remains closed until selection and operational reliability are measured and approved.
Owner intervention is required for irreversible publication/deletion, rights transfer, significant cost, critical security decisions and low-confidence/high-risk cases.

## Implementation priority
P0 — MUSIC ANALYZER
P1 — AI CORE + CURADET MEMORY foundation
P2 — CONTROL CENTER foundation
P3 — Master / rights / metadata operation chain
P4 — Public music catalog + protected listening
P5 — Social + publishing automation
P6 — Performance + revenue + learning
P7 — Full TODAY / Owner decision surface

## Non-negotiable principle
AI may change. Renderers may change. External services may change.
CURADET memory, rules, data, audit trail and decision system remain CURADET-owned.
