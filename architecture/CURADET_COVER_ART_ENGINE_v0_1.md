# CURADET — COVER ART ENGINE v0.1

Status: CORE / ACTIVE DEVELOPMENT ARCHITECTURE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ

## Karar
CURADET kendi Cover Art sistemini geliştirecektir. Cover Art yalnız bir görsel üretici değildir; şarkıyı/albümü anlayan, özgün görsel kavram geliştiren, üretim motorlarını değiştirilebilir araçlar olarak kullanan ve platforma uygun doğrulanmış görsel ailesi üreten CURADET modülüdür.

## Temel ilke
GÖRSELİN SAHİBİ CURADET'TİR. GÖRÜNTÜ MODELİ YALNIZ RENDER ARACIDIR.

MUSIC BRAIN / RENDER ENGINE ayrımının görsel karşılığı:
COVER ART BRAIN → IMAGE RENDERER(S) → VISUAL ANALYZER/QC.

## Amaç
Her şarkı/albüm için sıradan AI resmi veya hazır şablon değil; eserin kimliğini taşıyan, mümkün olduğunca tek bakışta hatırlanabilir ve platformlar arasında tutarlı bir görsel dünya oluşturmak.

## Zorunlu akış
ŞARKI/ALBÜM KAYNAĞI → MUSIC ANALYZER VERİSİ → SÖZ/MÜZİK/DUYGU/BAĞLAM ANALİZİ → COVER ART BRAIN → KAVRAM/İKONOGRAFİ → İÇ ALTERNATİF ELEME → IMAGE RENDERER → VISUAL ANALYZER/QC → TYPOGRAPHY/BRAND LAYER → PLATFORM-NATIVE TÜREVLER → DOĞRULAMA → KAYIT.

## Cover Art Brain girdileri
- eser adı ve doğrulanmış yazımı
- gerçek audio/master kimliği
- sözler mevcutsa söz kaynağı
- ana ve ikincil duygu
- tür/alt tür
- dönem/kültürel bağlam
- tempo/enerji/dinamik yapı
- motif/hook/zirve bölümü
- insan hikâyesi ve alt metin
- albüm bağlamı
- CURADET marka ilkeleri
- reddedilmiş/kullanılması yasak görsel varlıklar
- hedef mecra ve format

## Kavram motoru
Sistem ilk promptu doğrudan render etmez. Önce birden fazla görsel yaklaşım üretir ve şu ölçütlerle eler:
- esere özgülük
- hatırlanabilirlik / ikoniklik
- klişe riski
- başka şarkılara kolayca taşınamayacak kadar eserle bağ
- duygusal doğruluk
- kültürel doğruluk
- kompozisyon gücü
- platform türetilebilirliği
- CURADET kimliğiyle uyum

## Anti-klişe kapısı
Varsayılan eşlemeler yasaktır:
- aşk = el ele çift / kalp
- hüzün = yağmurda ağlayan kişi
- müzik = nota / kulaklık / equalizer
- teknoloji = robot / çip / neon / uzay
- premium = her şeyi altın yapmak
- fırtına = yalnız yıldırım ve dev dalga
- başlık = başlığın sözlük anlamını doğrudan resmetmek

Bunlar ancak eserin özgün bağlamı gerçekten gerektiriyorsa kullanılabilir.

## Renderer bağımsızlığı
CURADET tek bir görüntü modeline bağlanmaz. Yerel/open-weight veya harici görüntü motorları adapter olarak kullanılabilir. Motor değişse bile Cover Art Brain, kavram kayıtları, kalite kriterleri, prompt/parametre geçmişi ve doğrulanmış çıktılar CURADET'te kalır.

## Visual Analyzer / QC
Minimum kapılar:
1. eser kimliği ve yazım doğruluğu
2. kavram-eser bağı
3. ikoniklik/hatırlanabilirlik
4. klişe ve tekrar kontrolü
5. anatomi/nesne/fizik/perspektif/yansıma/gölge kusurları
6. tipografi doğruluğu
7. marka kaynağı doğruluğu
8. kompozisyon/hiyerarşi/safe-area
9. format/çözünürlük
10. eski veya reddedilmiş varlığın yanlışlıkla yeniden kullanılmaması
11. görselin müziği bastırmaması
12. benzer CURADET kapaklarıyla gereksiz tekrar kontrolü

NO PASS → NO FINAL COVER.

## Tipografi
Görüntü modelinin ürettiği metin nihai doğru kaynak kabul edilmez. Mümkün olduğunda görsel temiz üretilir; eser adı, CURADET kimliği ve diğer metinler kontrollü gerçek tipografi katmanında uygulanır ve yazım yeniden doğrulanır.

## Çıktı ailesi
Tek eser için tek kör crop yoktur. Onaylanan sanat dünyasından en az şu türevler üretilebilir:
- ana kare cover master
- Instagram Reel/Story 9:16
- YouTube full-video/thumbnail 16:9
- katalog/site kartı
- gerektiğinde platforma özgü ek varyantlar

Kompozisyon her oran için yeniden düzenlenebilir; ana kavram ve eser kimliği korunur.

## Öğrenme döngüsü
Yayın sonrası performans verileri tek başına sanat kararını belirlemez. CTR, izlenme, kaydetme/paylaşma ve insan değerlendirmesi birlikte kullanılarak hangi görsel özelliklerin işe yaradığı öğrenilir. Öğrenme Cover Art Brain'e geri beslenir; tek bir başarılı kapağın şablon olarak sonsuza kadar kopyalanmasına izin verilmez.

## Hak/provenance
Her final için mümkün olduğunda renderer/model, kaynak referanslar, üretim/düzenleme tarihi, insan müdahalesi, lisans/ticari kullanım durumu ve final dosya hash'i kayıt altına alınır. Hak/provenance belirsizliği yayın kapısında görünür blok oluşturur.

## CURADET entegrasyonu
COVER ART ENGINE, CURADET AI/COOS içinde görsel üretim katmanıdır ve mevcut CURADET_VISUAL_PRODUCTION_GATE_v1.md ile CURADET_SOCIAL_MUSIC_PUBLISHING_STANDARD_v1.md kurallarını ihlal edemez.

## Geliştirme aşamaları
P0: veri modeli + Cover Art Brief + kavram/anti-klişe puanlama + çıktı manifesti.
P1: renderer adapter arayüzü + çoklu aday üretim + Visual Analyzer/QC.
P2: kontrollü typography/brand composer + platform-native türetme.
P3: katalog benzerlik kontrolü + performans/insan geri beslemesi + öğrenme.
P4: yerel renderer seçenekleri ve maliyet/kalite yönlendirme.

## Başarı ölçütü
Başarı 'güzel AI resmi' değildir. Başarı: doğru eseri temsil eden, başka bir şarkıya kolayca yapıştırılamayan, hatırlanabilir, teknik olarak temiz, hakları izlenebilir ve CURADET'in sanat yönetimini taşıyan görsel sistemidir.
