# CURADET — LIVING MUSIC INTERFACE & VISUAL DNA v1

Status: CORE / BINDING DESIGN & PRODUCT ARCHITECTURE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ + CURADET AI

## Ana karar
CURADET web sitesi klasik bir kurumsal broşür sitesi veya hazır müzik platformu kopyası olmayacaktır. Site, CURADET çekirdeğinin çalışan dış yüzü ve yaşayan müzik arayüzü olacaktır.

Temel ifade:
**SİTENİN RENGİNİ TASARIMCI SEÇMEZ. MÜZİK GETİRİR. CURADET O RENGİ SANATA DÖNÜŞTÜRÜR.**

## 1. Kimlik sabit, eserin dünyası değişken
Kurumsal arayüz omurgası sabit kalır:
- siyaha yakın / koyu antrasit temel yüzey,
- yüksek okunabilirlikte beyaz tipografi,
- CURADET altını yalnız kontrollü kurumsal vurgu olarak,
- sabit navigasyon, erişilebilirlik ve kullanılabilirlik.

Eser başladığında kurumsal kimlik bozulmaz; yalnız eserin doğrulanmış görsel/duygusal atmosferi arayüze kontrollü biçimde taşınır.

**KİMLİK SABİT → ESERİN DÜNYASI DEĞİŞKEN.**

## 2. Music Color Engine
Her eser için sabit tür-renk klişeleri kullanılmaz. `hüzün=mavi`, `rock=kırmızı`, `premium=altın` gibi otomatik eşlemeler yasaktır.

Music Analyzer ve eser bağlamından en az şu sinyaller değerlendirilir:
- tempo / ritmik karakter,
- tonalite / makam,
- enerji ve dinamik yapı,
- vokal karakteri,
- enstrümantasyon / tını,
- ana ve ikincil duygu,
- söz / semantik bağlam,
- kültürel ve dönemsel bağlam.

Bunlardan esere özgü `Color DNA` türetilir. Önerilen alanlar:
- primary_music_color,
- secondary_music_color,
- shadow_color,
- highlight_color,
- emotional_temperature,
- luminance,
- saturation,
- contrast,
- transition_character.

Color DNA sanat kararıdır; salt matematiksel eşleme değildir. Cover Art Brain ve Visual Analyzer ile birlikte doğrulanır.

## 3. CURADET Visual DNA
Her yayınlanabilir eser için tekrar kullanılabilir ama esere özgü görsel kimlik kaydı oluşturulur:

**MUSIC DNA → EMOTION DNA → COLOR DNA → VISUAL DNA → MOTION DNA → COVER → WEB → SOCIAL → YOUTUBE**

Visual DNA en az şunları taşıyabilir:
- ana/ikincil duygu,
- renk ailesi,
- ışık karakteri,
- doku/malzeme çağrışımı,
- görsel sıcaklık,
- kompozisyon karakteri,
- ikonografi,
- insanlık/alt metin,
- dönem/kültür bağlamı,
- kaçınılacak klişeler,
- tipografi davranışı,
- motion karakteri,
- platform türetme kuralları.

Amaç yüzlerce rastgele AI görseli üretmek değil; CURADET'in kendi görsel hafızasını ve sanat zekâsını geliştirmektir.

## 4. Living Music Interface
CURADET web arayüzü müzikle birlikte kontrollü olarak yaşayabilir.

Şarkı başlamadan arayüz sakin ve zamansızdır. Şarkı başladığında:
- Color DNA arka plan/ışık atmosferine kontrollü yansır,
- Motion DNA çok ölçülü hareket üretir,
- eser değiştiğinde atmosfer yumuşak geçişle değişir,
- logo, navigasyon, okunabilirlik, erişilebilirlik ve temel kimlik değişmez.

Gösterişli equalizer, BPM'e mekanik zıplama, anlamsız parçacık/neon efektleri varsayılan değildir. Kullanıcı mekanizmayı değil müziğin atmosferini hissetmelidir.

## 5. Müzik Pınarı merkezdedir
Mevcut `muzik-pinari.html` tek doğru müzik kütüphanesi kaynağı olarak korunur; paralel müzik sayfası kurulmaz.

Müzik Pınarı zamanla şu yaşayan deneyime evrilir:
- yeni çıkanlar,
- seçkiler,
- albümler,
- tür/duygu/kültür keşfi,
- eser sayfaları,
- kalıcı mini-player,
- lisanslama/sync yolu,
- eser Visual DNA'sıyla uyumlu atmosfer.

**TEK ŞARKI → TEK SANATSAL DÜNYA → PLATFORM-NATIVE CURADET ÇIKTILARI.**

## 6. Kesintisiz dinleme
Sayfa/gezinme değişimlerinde mümkün olduğunca müzik kesilmemelidir. Player deneyimi web mimarisinin çekirdek ürün gereksinimidir; sonradan eklenen dekoratif widget değildir.

## 7. Teknoloji görünmez, sonucu hissedilir
Public CURADET yüzü robot, çip, neon veya `AI music` estetiğine indirgenmez.

Arkada CURADET AI, Music Brain, Music Analyzer, Rights Engine, Cover Art Brain, Social Engine ve COOS çalışabilir; ziyaretçi öncelikle müziği, eseri ve duyguyu deneyimler.

**YAPAY ZEKÂ MÜZİĞİ DEĞİL, İNSAN MÜZİĞİ.**

## 8. Görsel üretim zinciri
Her eser için hedef zincir:

**MUSIC ANALYZER → EMOTION/COLOR ANALYSIS → COVER ART BRAIN → VISUAL DNA → IMAGE RENDERER → VISUAL ANALYZER/QC → TYPOGRAPHY/BRAND → WEB/SOCIAL/YOUTUBE TÜREVLERİ → KAYIT → ÖĞRENME**

Renderer sanat karar merkezi değildir. `CURADET_COVER_ART_ENGINE_v0_1.md` ve `CURADET_SOURCE_FIDELITY_GATE_v1.py` bağlayıcıdır.

## 9. Beş duyu + duygu
Dijital ortamda koku, tat veya dokunma varmış gibi sahte iddia kurulmaz. Görüntü ve ses; doku, sıcaklık, malzeme, hava, mekân ve hatıra çağrışımlarıyla insan deneyimini zenginleştirebilir.

Her eser için soru:
**İnsan ne görüyor, ne duyuyor, ne hissediyor, neyi hatırlıyor ve sonra neyi deneyimlemek istiyor?**

## 10. Sessizlik ve seçicilik
Premium kalite efekt yoğunluğu değildir. Boşluk, ritim, hiyerarşi, tipografi, güçlü tek görüntü ve kontrollü hareket bilinçli kullanılır. Görsel hiçbir zaman müziğin önüne geçmez.

**MÜZİK ASIL OLANDIR; GÖRSEL MÜZİĞİN GÖLGESİDİR.**

## 11. Tek site, iki yüz
CURADET web mimarisi iki yüzlü tek sistemdir:

### PUBLIC CURADET
- Ana Sayfa
- Müzik Pınarı
- Projeler
- Sync & Lisanslama
- CURADET
- İletişim

### PRIVATE CURADET CONTROL CENTER
Owner ve yetkili operasyon için:
- üretim durumu,
- Music Analyzer sonuçları,
- master adayları,
- hak/metadata,
- Cover Art/Visual DNA,
- sosyal/yayın hazırlığı,
- performans/öğrenme,
- sistem sağlığı ve audit.

Control Center çekirdeğin kendisi değildir; çekirdeğe güvenli yönetim arayüzüdür.

## 12. Kalite kapısı
`Living Music Interface` yalnız estetik başarıyla kabul edilmez. Minimum doğrulama:
- mobil/desktop responsive,
- performans ve yükleme süresi,
- erişilebilirlik ve kontrast,
- müzik devamlılığı,
- Color/Visual DNA'nın esere uygunluğu,
- logo/kaynak doğruluğu,
- platformlar arası görsel süreklilik,
- hak/provenance,
- kullanıcı deneyimi,
- gerçek cihaz/tarayıcı testleri.

**NO PASS → NO FINAL RELEASE.**

## 13. Başarı tanımı
Amaç `dünyanın en mükemmeli` iddiasını yazmak değil; bunu ölçülebilir kaliteye dönüştürmektir. CURADET; hız, erişilebilirlik, mobil deneyim, ses sürekliliği, görsel özgünlük, hatırlanabilirlik, lisanslama dönüşümü ve gerçek kullanıcı deneyimi üzerinden doğrulanır.

## Çekirdek özeti
CURADET sitesi CURADET'i anlatan statik bir site değil, CURADET'in çalışan bir parçasıdır.

**MÜZİK → ANALİZ → DUYGU → RENK → GÖRSEL → DİNLEME → HAK/LİSANS → YAYIN → PERFORMANS → ÖĞRENME → YENİ MÜZİK**
