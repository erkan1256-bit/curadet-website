"""
CURADET — SOURCE FIDELITY GATE v1
Status: CORE / BINDING EXECUTION RULE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ

Amaç:
Onaylı/kaynak varlık mevcutken hafızadan, tahminden veya generatif yeniden
çizimden kaynak sapmasını engellemek. Özellikle logo, marka varlığı, dosya,
sürüm ve 'aynısı/birebir' taleplerinde zorunlu kalite kapısıdır.

Temel kural:
KAYNAK VARSA -> ÜRETME, KAYNAĞI KULLAN.
AYNISI/BİREBİR İSTENDİYSE -> YORUMLAMA.
DOĞRULANMADIYSA -> TESLİM ETME.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


class Intent(str, Enum):
    EXACT = "EXACT"          # aynısı, birebir, aynı logo/dosya
    EDIT = "EDIT"            # mevcut kaynağı kontrollü düzenle
    REDESIGN = "REDESIGN"    # açıkça yeni tasarım
    GENERATE = "GENERATE"    # yeni üretim


class Verification(str, Enum):
    VERIFIED = "VERIFIED"
    UNVERIFIED = "UNVERIFIED"
    SOURCE_MISSING = "SOURCE_MISSING"
    REJECTED = "REJECTED"


@dataclass
class SourceAsset:
    asset_id: str
    name: str
    canonical: bool
    approved: bool
    available: bool
    version: Optional[str] = None
    sha256: Optional[str] = None


@dataclass
class Task:
    instruction: str
    intent: Intent
    source: Optional[SourceAsset] = None
    generative_ai_requested: bool = False


@dataclass
class GateResult:
    allowed: bool
    verification: Verification
    method: str
    reasons: List[str] = field(default_factory=list)
    required_checks: List[str] = field(default_factory=list)


EXACT_WORDS = ("aynısı", "birebir", "aynı logo", "aynı dosya", "exact", "identical")
REDESIGN_WORDS = ("yeni logo", "yeniden tasarla", "redesign", "yeni tasarım")


def classify_intent(instruction: str) -> Intent:
    text = instruction.casefold()
    if any(word in text for word in EXACT_WORDS):
        return Intent.EXACT
    if any(word in text for word in REDESIGN_WORDS):
        return Intent.REDESIGN
    return Intent.EDIT


def source_fidelity_gate(task: Task) -> GateResult:
    src = task.source

    # 1) 'Aynısı/birebir' hiçbir zaman generatif yorum değildir.
    if task.intent == Intent.EXACT:
        if src is None or not src.available:
            return GateResult(
                allowed=False,
                verification=Verification.SOURCE_MISSING,
                method="STOP_AND_FIND_CANONICAL_SOURCE",
                reasons=["EXACT intent requires the real source asset."],
            )
        if not (src.canonical and src.approved):
            return GateResult(
                allowed=False,
                verification=Verification.UNVERIFIED,
                method="VERIFY_SOURCE_FIRST",
                reasons=["Available asset is not verified canonical+approved."],
            )
        return GateResult(
            allowed=True,
            verification=Verification.VERIFIED,
            method="DIRECT_SOURCE_OR_DETERMINISTIC_VECTOR_RECONSTRUCTION",
            reasons=["No generative reinterpretation permitted."],
            required_checks=[
                "geometry",
                "letterforms",
                "spacing",
                "proportions",
                "colors",
                "tagline",
                "alignment",
                "dimensions",
                "source/version/hash",
                "pixel_or_vector_comparison",
            ],
        )

    # 2) Kaynak varken EDIT işlemi kaynağın kendisinden başlar.
    if task.intent == Intent.EDIT:
        if src is None or not src.available:
            return GateResult(
                allowed=False,
                verification=Verification.SOURCE_MISSING,
                method="STOP_AND_FIND_SOURCE",
                reasons=["Do not reconstruct an existing asset from memory."],
            )
        return GateResult(
            allowed=True,
            verification=Verification.VERIFIED if src.canonical and src.approved else Verification.UNVERIFIED,
            method="EDIT_FROM_SOURCE",
            required_checks=["requested_delta_only", "source_integrity", "visual_qc"],
        )

    # 3) REDESIGN/GENERATE eski varlığı 'aynısı' diye sunamaz.
    return GateResult(
        allowed=True,
        verification=Verification.UNVERIFIED,
        method="NEW_CONCEPT_SEPARATE_FROM_CANONICAL_ASSET",
        reasons=["New concept must be labeled as concept until Owner approval."],
        required_checks=["visual_gate", "anti_cliche", "brand_fit", "owner_approval_before_canonical_promotion"],
    )


def delivery_allowed(result: GateResult, claimed_as_exact: bool = False) -> bool:
    """Fail closed: exact claims require VERIFIED gate pass."""
    if not result.allowed:
        return False
    if claimed_as_exact and result.verification != Verification.VERIFIED:
        return False
    return True


BINDING_RULES = [
    "Instruction classification happens before production.",
    "Single Source of Truth is opened before any exact/edit task.",
    "Missing source blocks exact reproduction; no guessing or look-alike substitution.",
    "Generative AI is forbidden for exact reproduction of an approved logo/brand asset.",
    "Exact reproduction uses source bytes or deterministic vector reconstruction.",
    "Before/after comparison is mandatory for geometry, spacing, color, typography and alignment.",
    "NO PASS -> NO DELIVERY. The user is not the QA layer.",
    "Rejected outputs never become canonical sources.",
    "New concepts remain separate from historical/canonical assets until explicit Owner approval.",
    "Audit record stores source, version/hash, method, verification result and continuation point.",
]
