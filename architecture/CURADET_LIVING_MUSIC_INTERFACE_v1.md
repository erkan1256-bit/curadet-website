# CURADET — LIVING MUSIC INTERFACE & VISUAL DNA v1

Status: CORE / BINDING DESIGN & PRODUCT ARCHITECTURE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ + CURADET AI

## Ana karar
CURADET PUBLIC bir müzik platformudur ve CURADET aynı zamanda bir müzik üretim ekosistemidir. Platform iki ana üretim kaynağını birlikte destekler:
1. **CURADET'in kendi eserleri / kendi kataloğu**;
2. **dışarıdan gelen sanatçı, yorumcu, söz yazarı, besteci, yapımcı, marka, kurum ve proje sahipleri için CURADET tarafından üretilen veya birlikte geliştirilen müzikler.**

CURADET üçüncü taraf kataloglarını kör biçimde toplayan genel amaçlı bir agregatör değildir. Dışarıdan gelen kişi/kurumun mevcut eserini kabul etmek ile CURADET'in onlar için yeni müzik üretmesi farklı süreçlerdir. Her iki durumda da hak, sözleşme, katkı, provenance, metadata ve yayın yetkisi açıkça doğrulanmadan katalog/yayın yapılmaz.

Ana değer zinciri:
**İHTİYAÇ / FİKİR → CURADET ÜRETİMİ veya ORTAK ÜRETİM → ANALİZ → İNSAN QC → MASTER → HAK / SÖZLEŞME / KATKI / PROVENANCE → METADATA → KATALOĞA ALMA KARARI → CURADET PLATFORMUNDA YAYIN → DİNLEME / ABONELİK / LİSANSLAMA → GELİR / PERFORMANS → ÖĞRENME → YENİ ÜRETİM.**

## Müzik her yerde — üretim kapsamı
CURADET yalnız kendi adı altında şarkı çıkaran bir yapı değildir. Müzik ihtiyacının bulunduğu alanlarda üretim yapabilecek bir müzik zekâsı, üretim ve hak yönetim sistemi olarak gelişir. Kapsam örnekleri:
- CURADET Originals ve CURADET katalog eserleri;
- bağımsız sanatçı / yorumcu için özgün eser ve prodüksiyon;
- söz yazarı / besteci ile ortak geliştirme;
- müşteri veya kurum için özel üretim;
- film, dizi, reklam, fragman, oyun, marka, etkinlik ve kurumsal projeler için özgün müzik;
- sync/B2B ihtiyaçları için brief tabanlı üretim;
- uygun projelerde farklı dil, kültür, tür ve coğrafyalara yönelik üretim.

**MÜZİK NEREDE GEREKİYORSA CURADET ORADA ÜRETEBİLİR; ANCAK HER ÜRETİM AYNI HAK, KALİTE VE PROVENANCE KAPILARINDAN GEÇER.**

## Katalog sınıfları ve sahiplik ayrımı
Müzik Pınarı tek doğru katalog kaynağı olarak korunur fakat her kayıt kaynak ve hak sınıfını açıkça taşır. Minimum sınıflar:
- `curadet_original`: CURADET'in kendi üretimi/kataloğu;
- `client_original`: dış müşteri/sanatçı için CURADET tarafından üretilen eser;
- `co_production`: CURADET + dış yaratıcı/kurum ortak üretimi;
- `licensed_or_external`: ileride kabul edilirse hakları doğrulanmış dış kaynak eser.

Bu sınıflar kullanıcıya teknik etiket olarak gösterilmek zorunda değildir; hak motoru, metadata, gelir paylaşımı, yayın ve lisanslama için iç sistemde zorunludur.

Bir eserin CURADET tarafından üretilmiş olması master/yayın/telif haklarının otomatik olarak CURADET'e ait olduğu anlamına gelmez. Hak sahipliği ve gelir paylaşımı sözleşme/proje bazında açıkça kaydedilir.

## Dışarıdan gelen üretim talebi
Public platform yalnız dinleme yüzeyi değildir; uygun ayrı bir yol üzerinden dışarıdan üretim talebi/brief alınabilir. Dinleyici deneyimi ile profesyonel üretim talebi birbirine karıştırılmaz.

Hedef akış:
**BAŞVURU / BRIEF → İHTİYAÇ SINIFLANDIRMA → KAPSAM / HAK / BÜTÇE / TESLİM MODELİ → ÜRETİM → REVİZYON / QC → MASTER → SÖZLEŞME / HAK / METADATA → TESLİM ve/veya CURADET YAYINI → LİSANSLAMA / GELİR / RAPORLAMA.**

Fiyatlandırma, komisyon, hak devri, gelir paylaşımı, revizyon sınırı ve yayın zorunluluğu tek tip varsayılmaz; ürün/hizmet modeli ve sözleşme sistemi ayrıca tasarlanıp doğrulanacaktır.

## Abonelik sistemi — ürün kararı
CURADET platformunda kullanıcı hesabı ve abonelik sistemi kurulacaktır. Abonelik dinleyici ürün mimarisinin parçasıdır; profesyonel müzik üretim hizmetiyle aynı ürün değildir.

Hedef yetenekler:
- güvenli hesap/oturum;
- ücretli abonelik planı/planları;
- abonelik durumu ve entitlement;
- ödeme sağlayıcısı entegrasyonu;
- yenileme, iptal, başarısız ödeme;
- favoriler, kullanıcı kütüphanesi, dinleme geçmişi;
- queue/playlist ve ileride kişiselleştirilmiş keşif;
- web ve ileride uygulamalarda ortak hesap;
- gelir, abonelik, churn/retention ve dinleme analitiği.

Fiyat, ücretsiz katman, deneme süresi ve ödeme sağlayıcısı araştırma/doğrulama tamamlanmadan kilitlenmez.

## Public ürünün iki ana yolu
### Dinleyici
Keşfet → Ara → Müzik Pınarı → Yeni Çıkanlar → Seçkiler → Tür/Duygu/Dünya → Albüm/Eser → Now Playing → Favori/Kütüphane → Hesap/Abonelik.

### Üretim / Profesyonel
Müzik Üretimi / Proje Talebi → Brief → proje türü → iletişim/hesap → teklif/sözleşme aşaması. Sync & Lisanslama da profesyonel yolun ayrı fakat bağlı bir parçasıdır.

Ana müzik deneyimi slogan ve satış metinleriyle boğulmaz. Profesyonel yol görünür fakat dinleme akışını baskılamaz.

## Player ve keşif
Player route'lardan bağımsız yaşayan çekirdek ürün katmanıdır: persistent mini-player, full Now Playing, queue, eser/album bağlamı, uygun olduğunda lyrics/credits/metadata, favori/kütüphane ve kesintisiz playback.

Keşif; yeni çıkan, editoryal seçki, tür, duygu, kültür/coğrafya, dönem, enstrümantal/vokal, benzer eser, proje ve dinleme geçmişi gibi kapılardan çalışır. Music Analyzer teknik gürültü olarak gösterilmez; keşif zekâsını besler.

## Living Music Interface
CURADET kimliği sabittir; eserlerin Music/Color/Visual DNA'sı kontrollü atmosfer yaratabilir. Living Music Interface platform işlevinin yerine geçmez. Logo, navigasyon, player kullanılabilirliği, kontrast ve erişilebilirlik sabit kalır. Gösterişli equalizer/neon/AI klişesi varsayılan değildir.

## Teknoloji görünmez
Public yüz AI gösterisi değildir. CURADET AI, Music Brain, Analyzer, Rights Engine, Cover Art Brain, Social Engine ve COOS arkada çalışır. Dinleyici müziği; sanatçı/müşteri ise üretim kalitesini ve hizmeti deneyimler.

## Hak ve gelir ayrımı
B2C abonelik, B2B üretim, sync/lisanslama ve dış yaratıcılarla gelir paylaşımı aynı finansal işlem değildir. Her gelir akışı ayrı hak/sözleşme/raporlama mantığına bağlanır. Bir eserin platformda bulunması tek başına CURADET'e sınırsız lisanslama hakkı vermez.

## Özel Control Center
PRIVATE CURADET CONTROL CENTER; kendi üretimleri ve dış projeleri ayrı kaynak/hak sınıflarıyla yönetir: brief/proje, üretim, Analyzer, master, katkıcılar, sözleşme/hak/provenance/metadata, katalog/yayın durumu, Visual DNA, sosyal/yayın, kullanıcı/abonelik, müşteri/proje operasyonları, gelir/royalty/lisans, performans/öğrenme, sistem sağlığı ve audit.

## Kalite kapısı
Hiçbir iç veya dış üretim yalnız üretildi diye yayınlanmaz. Minimum zincir:
**KAYNAK/BRIEF → ÜRETİM → ANALİZ → HUMAN QC → MASTER → HAK/SÖZLEŞME → PROVENANCE → METADATA → YAYIN YETKİSİ → KATALOG → PLATFORM.**

**NO PASS → NO FINAL RELEASE.**

## Çekirdek özeti
**CURADET = KENDİ MÜZİĞİNİ ÜRETEN + DIŞARIDAN GELEN SANATÇI/MÜŞTERİ/PROJELER İÇİN MÜZİK ÜRETEN + ORTAK ÜRETİM YAPABİLEN + HAKLARI AYRIŞTIRAN + KATALOĞUNU YAYINLAYAN + KENDİ DİNLEME/ABONELİK PLATFORMUNU İŞLETEN + SYNC/LİSANSLAMA VE GELİR KATMANINI YÖNETEN MÜZİK EKOSİSTEMİ.**

**MÜZİK HER YERDE → CURADET ÜRETİR → HAKKI DOĞRULAR → YAYINLAR / TESLİM EDER → DİNLENİR / LİSANSLANIR → GELİR → ÖĞRENME → YENİ MÜZİK.**
