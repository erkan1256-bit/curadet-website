# CURADET — COVER ART / CURADET AI COORDINATION LOCK v1

Status: CORE / BINDING EXECUTION RULE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ

## Kesin karar
CURADET Cover Art Engine, CURADET AI'den bağımsız veya paralel bir yapay zekâ değildir. CURADET AI ile zorunlu, çift yönlü ve denetlenebilir koordinasyon içinde çalışan uzman görsel zekâ katmanıdır.

## Temel ilke
CURADET AI ORKESTRA EDER → COVER ART BRAIN GÖRSEL KARARI UZMANLAŞTIRIR → IMAGE RENDERER YALNIZ ÜRETİR → VISUAL ANALYZER/QC DOĞRULAR → SONUÇ CURADET AI/COOS'A GERİ DÖNER.

GÖRSELİN SAHİBİ CURADET'TİR. GÖRÜNTÜ MODELİ YALNIZ RENDER ARACIDIR.

## Zorunlu çalışma zinciri
CURADET AI → DOĞRULANMIŞ ESER/ALBÜM BAĞLAMI → MUSIC BRAIN/MUSIC ANALYZER → COVER ART CONTEXT → COVER ART BRAIN → KAVRAM/İKONOGRAFİ → ANTI-KLİŞE/ÖZGÜNLÜK ELEME → IMAGE RENDERER ADAPTER → VISUAL ANALYZER/QC → TYPOGRAPHY/BRAND COMPOSER → PLATFORM-NATIVE TÜREVLER → MANIFEST/HASH/PROVENANCE → CURADET AI/COOS → YAYIN KAPISI → PERFORMANS/İNSAN GERİ BİLDİRİMİ → CURADET AI → COVER ART BRAIN ÖĞRENMESİ.

## Veri sınırı
CURADET AI Cover Art Engine'e yalnız doğrulanmış/etiketlenmiş bağlam verir. Doğrulanmamış veri VERIFIED gibi aktarılamaz. Eksik zorunlu bağlam final kapağı bloke eder.

Cover Art Engine CURADET AI'ye en az şu kayıtları geri verir:
- brief ve sürüm kimliği
- kavram adayları ve puanları
- seçilen ikonografi ve gerekçe
- renderer/model/adapter kimliği
- kullanılan kaynak/referans kimlikleri
- Visual Analyzer/QC sonucu
- typography/brand doğrulaması
- platform türev manifesti
- rights/provenance durumu
- final dosya hash'leri
- yayın sonrası öğrenme sinyalleri

## Yetki ve güvenlik
- Cover Art Engine ayrı kurumsal hafıza veya paralel karar merkezi kuramaz.
- Renderer CURADET kararlarını değiştiremez.
- Reddedilmiş/yasak görsel varlıklar yeniden final kaynak olamaz.
- Hak/provenance belirsizliği yayın kapısını geçemez.
- Owner gerektiren geri döndürülemez yayın, hak devri, önemli maliyet veya kritik güvenlik kararı otomatik geçilemez.
- Parola, token, recovery code ve API secret çekirdek/manifest içine yazılmaz.

## Renderer bağımsızlığı
Görüntü üretim motorları adapter'dır ve değiştirilebilir. Model değişse bile CURADET AI bağlamı, Cover Art Brain, karar kayıtları, kalite kriterleri, provenance ve öğrenme CURADET kontrolünde kalır.

## Kurumsal bağ
Bu kilit aşağıdaki mevcut kaynaklarla birlikte uygulanır:
- CURADET_COVER_ART_ENGINE_v0_1.md
- CURADET_AI_CONTROL_CENTER_v0_1.md
- CURADET_VISUAL_PRODUCTION_GATE_v1.md
- CURADET_SOCIAL_MUSIC_PUBLISHING_STANDARD_v1.md

Çatışma halinde kaynaklar sessizce ezilmez; doğrulama ve sürümlü düzeltme yapılır.

## P0 uygulama hedefi
Bir sonraki teknik uygulama katmanı:
1. `cover_art_context.schema.json`
2. `cover_art_result.schema.json`
3. Cover Art Brief veri modeli
4. ikoniklik/özgünlük/anti-klişe puanlama motoru
5. output manifest + provenance/hash sözleşmesi
6. CURADET AI/COOS çağrı ve dönüş arayüzü

## Doğrulama kapısı
NO VERIFIED CONTEXT → NO FINAL COVER.
NO VISUAL QC PASS → NO FINAL COVER.
NO RIGHTS/PROVENANCE PASS → NO PUBLICATION.

## Süreklilik kaydı
WHAT CHANGED: Cover Art Engine ↔ CURADET AI koordinasyonu bağlayıcı çekirdek kuralına dönüştürüldü.
SOURCE: Owner kararı + CURADET_COVER_ART_ENGINE_v0_1.md.
LOCKED RESULT: Cover Art bağımsız AI değildir; CURADET AI orkestrasyonunda uzman görsel zekâdır.
VERIFICATION LEVEL: GitHub kurumsal çekirdek kaydı; fiziksel notebook CURRENT güncellemesi bu kayıtla iddia edilmez.
OPEN ITEMS: P0 gerçek schema ve kod uygulaması.
NEXT CONTINUATION POINT: P0 veri sözleşmelerini ve puanlama motorunu kodlamak/test etmek.
