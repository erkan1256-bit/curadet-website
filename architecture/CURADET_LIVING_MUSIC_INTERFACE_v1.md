# CURADET — LIVING MUSIC INTERFACE & VISUAL DNA v1

Status: CORE / BINDING DESIGN & PRODUCT ARCHITECTURE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ + CURADET AI

## Ana karar
CURADET web sitesi klasik bir kurumsal broşür sitesi veya hazır müzik platformu kopyası olmayacaktır. CURADET'in public yüzü artık öncelikle **MÜZİK PLATFORMU** olarak tasarlanacaktır. Kurumsal anlatı ikincildir; kullanıcı siteye geldiğinde önce müziği görür, bulur, dinler, keşfeder, kaydeder ve gerektiğinde lisanslar.

## Metin ve slogan disiplini
Ana platform ekranlarında büyük sloganlar, manifesto paragrafları ve dekoratif pazarlama metinleri arayüzü işgal etmeyecektir. Metin; navigasyon, eser/artist/album bilgisi, arama, filtre, player, hak/lisans ve gerekli bağlam için kullanılır. Büyük tipografi kullanılabilir fakat slogan olmak zorunda değildir; müziğin adı, sanatçı, albüm, seçki veya işlevsel başlık olabilir.

**ÖNCE MÜZİK. SONRA ARAYÜZ. EN SON KURUMSAL ANLATI.**

## Küresel müzik platformu benchmark ilkesi
Spotify, Apple Music, TIDAL, Qobuz, SoundCloud, YouTube Music ve diğer güçlü müzik platformlarının güncel kullanıcı davranışları araştırılır; hiçbir platform görsel olarak kopyalanmaz. Kalıcı olarak incelenecek davranışlar:
- ana ekranda doğrudan müziğe erişim;
- güçlü arama ve keşif;
- kişisel/bağlamsal seçkiler;
- albüm, eser, sanatçı ve playlist hiyerarşisi;
- persistent mini-player + genişleyen Now Playing;
- sayfa değişirken kesintisiz playback;
- queue, favori/kütüphane ve dinleme geçmişi;
- responsive/adaptive layout; büyük ekranı sadece büyütmek yerine yeniden düzenleme;
- player açıkken paralel keşif;
- mobilde mini-player + alt ana navigasyon;
- ses kalitesi, credits ve eser metadata'sına gerektiğinde kolay erişim;
- CURADET'e özgü lisans/sync yolunun dinleme deneyimini bozmadan erişilebilir olması.

Araştırma notu: 2026 benchmarklarında Spotify keşif ve kullanım kolaylığı; Apple Music kürasyon ve sade katalog deneyimi; TIDAL temiz navigasyon ve yüksek kalite dinleme; Qobuz insan kürasyonu/yüksek kalite odağıyla güçlü referans alanlarıdır. Bunlar özellik/UX benchmarkıdır; CURADET bunların hiçbirinin görünümünü kopyalamaz.

## Platform bilgi mimarisi
Public ana omurga platform mantığında kurulacaktır:
- Ana Sayfa / Keşfet
- Ara
- Müzik Pınarı / Kütüphane
- Yeni Çıkanlar
- Seçkiler
- Türler / Duygular / Dünyalar
- Sanatçılar / Projeler
- Albüm / Eser sayfaları
- Favoriler / kullanıcı kütüphanesi (hesap sistemi hazır olduğunda)
- Queue / Now Playing
- Sync & Lisanslama
- CURADET kurumsal bilgisi ikincil alanda

## Platform ana ekranı
Ana ekran bir reklam landing page gibi değil, çalışan müzik yüzeyi gibi davranır. İlk viewport'ta kullanıcı müzik keşfedebilmeli veya çalmaya başlayabilmelidir. Büyük hero zorunlu değildir. İçerik yoğunluğu kontrollü ama gerçek platform kullanımına yeterli olacaktır.

## Kimlik sabit, içerik atmosferi değişken
CURADET kimliği sabittir; eserlerin Music/Color/Visual DNA'sı kart, Now Playing, eser/album sayfası ve kontrollü arka plan atmosferinde değişken olabilir. Kurumsal renk sistemi içeriğin önüne geçmez.

## Player çekirdeği
Player dekoratif widget değildir. Web uygulamasının route'lardan bağımsız yaşayan çekirdek ürün katmanıdır.
- persistent mini-player;
- full Now Playing;
- play/pause, ileri/geri, scrub, ses;
- queue;
- eser/artist/album bağlamı;
- lyrics/credits/metadata uygun olduğunda;
- favori/kütüphane;
- lisansla bağlantısı;
- sayfalar arasında kesintisiz playback;
- background/media-key davranışları teknik aşamada değerlendirilir.

## Keşif sistemi
Keşif yalnız tür kartlarından oluşmaz. Kullanıcı müziğe farklı kapılardan ulaşabilmelidir: yeni çıkan, editoryal seçki, tür, duygu, kültür/coğrafya, dönem, enstrümantal/vokal, benzer eser, proje, dinleme geçmişi ve ileride kişiselleştirilmiş öneri. Music Analyzer verisi kullanıcıya teknik gürültü olarak gösterilmez; keşif zekâsını besler.

## Müzik Pınarı
`muzik-pinari.html` tek doğru müzik katalog kaynağı olarak korunur ve platform kütüphanesine evrilir. Paralel katalog kurulmaz.

## Living Music Interface
Living Music Interface platform işlevinin üzerine kurulur; onun yerine geçmez. Şarkı çalarken Color/Visual/Motion DNA kontrollü atmosfer yaratabilir. Logo, navigasyon, player kullanılabilirliği, kontrast ve erişilebilirlik sabit kalır. Gösterişli equalizer/neon/AI klişesi varsayılan değildir.

## Teknoloji görünmez
Public yüz AI gösterisi değildir. CURADET AI, Music Brain, Analyzer, Rights Engine, Cover Art Brain, Social Engine ve COOS arkada çalışır. Kullanıcı müziği ve platformu deneyimler.

## Lisanslama farkı
CURADET yalnız dinleme platformu değildir. Hakları uygun eserlerde eser/album/Now Playing bağlamından doğal bir `Lisansla / Sync` yolu sunabilir. Bu yol tüketici dinleme akışını baskılamaz.

## Görsel üretim zinciri
**MUSIC ANALYZER → EMOTION/COLOR ANALYSIS → COVER ART BRAIN → VISUAL DNA → IMAGE RENDERER → VISUAL ANALYZER/QC → TYPOGRAPHY/BRAND → PLATFORM TÜREVLERİ → KAYIT → ÖĞRENME**

## Tasarım bağımsızlığı
Benchmarklardan davranış ve kalite öğrenilir; layout kopyalanmaz. Yeni adaylar aynı hero + kartlar + alt player şablonunun renk varyasyonu olamaz. Platformun bilgi mimarisi, keşif modeli, player davranışı, responsive yapısı ve CURADET Music/Visual DNA birlikte yeni bir sistem oluşturmalıdır.

## Tek site, iki yüz
PUBLIC CURADET = müzik platformu.
PRIVATE CURADET CONTROL CENTER = üretim, Analyzer, master, hak/metadata, Visual DNA, sosyal/yayın, performans, sistem sağlığı/audit yönetimi.

## Kalite kapısı
Final platform minimum olarak gerçek müzik keşfi, arama, katalog, eser/album sayfası, persistent player, queue, responsive/adaptive davranış, erişilebilirlik/kontrast, performans, playback devamlılığı, logo/kaynak doğruluğu, hak/provenance ve gerçek cihaz/tarayıcı testlerinden geçmelidir.

**NO PASS → NO FINAL RELEASE.**

## Çekirdek özeti
**CURADET PUBLIC = LANDING PAGE DEĞİL, YAŞAYAN MÜZİK PLATFORMU.**
**SLOGAN DEĞİL MÜZİK; DEKOR DEĞİL PLAYER; VİTRİN DEĞİL KEŞİF.**
