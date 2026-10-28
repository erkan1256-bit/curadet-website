# CURADET — LIVING MUSIC INTERFACE & VISUAL DNA v1

Status: CORE / BINDING DESIGN & PRODUCT ARCHITECTURE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ + CURADET AI

## Ana karar
CURADET PUBLIC bir müzik platformudur; ancak genel amaçlı üçüncü taraf katalog toplayıcısı değildir. Platformun temel kataloğunu **CURADET'in kendi ürettiği, hak/provenance kontrolünden geçirdiği ve yayınladığı müzikler** oluşturur.

Ana değer zinciri:
**CURADET ÜRETİR → ANALİZ EDER → SEÇER → MASTER/Hak/PROVENANCE KONTROLÜ → KATALOĞA ALIR → CURADET PLATFORMUNDA YAYINLAR → DİNLENİR → ABONELİK/GELİR → PERFORMANS VERİSİ → ÖĞRENME → YENİ ÜRETİM.**

CURADET böylece yalnız bir web sitesi veya player değil; üretim, katalog, yayın, dinleme, abonelik, hak/lisanslama ve öğrenme döngüsünü kendi kontrol katmanında birleştiren dikey müzik ekosistemidir.

## Katalog sahipliği ve yayın ilkesi
- Ana katalog CURADET üretimlerinden oluşur.
- Bir eser yayınlanmadan önce Music Analyzer/human QC, master, metadata, hak ve provenance kapılarından geçer.
- Üretim dosyası otomatik olarak yayınlanmış eser sayılmaz.
- Yayınlanabilir master ile deney/aday üretimler ayrıdır.
- Müzik Pınarı platformun tek doğru katalog kaynağına evrilir; paralel katalog kurulmaz.
- İleride üçüncü taraf sanatçı/içerik kabulü düşünülürse bu ayrı Owner kararı, hak modeli ve kalite kapısı gerektirir; mevcut çekirdek karar bunu varsaymaz.

## Abonelik sistemi — ürün kararı
CURADET platformunda kullanıcı hesabı ve abonelik sistemi kurulacaktır. Abonelik yalnız ödeme ekranı değildir; dinleme ürün mimarisinin parçasıdır.

Hedef yetenekler:
- kullanıcı hesabı / güvenli oturum;
- ücretsiz erişim katmanı olup olmayacağı ayrıca iş modeli doğrulamasıyla kesinleştirilir;
- ücretli abonelik planı/planları;
- abonelik durumu ve yetkilendirme;
- ödeme sağlayıcısı entegrasyonu (sağlayıcı henüz kilitli değildir);
- yenileme, iptal, başarısız ödeme ve erişim durumları;
- kullanıcı kütüphanesi, favoriler ve dinleme geçmişi;
- uygun olduğunda playlist/queue ve kişiselleştirilmiş keşif;
- abonelik haklarının web ve ilerideki uygulama yüzlerinde ortak hesapla çalışabilmesi;
- gelir, abonelik, churn/retention ve dinleme analitiğinin özel Control Center'da izlenmesi.

Fiyat, ücretsiz/ücretli katman sınırları, deneme süresi ve ödeme sağlayıcısı henüz bağlayıcı değildir; pazar, maliyet, vergi, ödeme altyapısı ve hak modeli doğrulanmadan çekirdeğe sabit rakam yazılmaz.

## Public platform bilgi mimarisi
- Ana Sayfa / Keşfet
- Ara
- Müzik Pınarı / Kütüphane
- Yeni Çıkanlar
- Seçkiler
- Türler / Duygular / Dünyalar
- Albümler / Eserler / CURADET projeleri
- Favoriler / kullanıcı kütüphanesi
- Dinleme geçmişi
- Queue / Now Playing
- Hesap / Abonelik
- Sync & Lisanslama
- CURADET kurumsal bilgisi ikincil alanda

## Metin ve slogan disiplini
Ana platform ekranlarında büyük sloganlar, manifesto paragrafları ve dekoratif pazarlama metinleri arayüzü işgal etmez. Metin; navigasyon, eser/album/proje bilgisi, arama, filtre, player, hesap/abonelik, hak/lisans ve gerekli bağlam için kullanılır. Büyük tipografi slogan olmak zorunda değildir; eser, albüm, seçki veya işlevsel başlık olabilir.

**ÖNCE MÜZİK. SONRA ARAYÜZ. EN SON KURUMSAL ANLATI.**

## Küresel müzik platformu benchmark ilkesi
Spotify, Apple Music, TIDAL, Qobuz, SoundCloud, YouTube Music ve diğer güçlü müzik platformlarının güncel kullanıcı davranışları araştırılır; hiçbir platform görsel veya ürün olarak kopyalanmaz. Kalıcı olarak incelenecek davranışlar:
- ana ekranda doğrudan müziğe erişim;
- güçlü arama ve keşif;
- albüm, eser, katalog ve seçki hiyerarşisi;
- persistent mini-player + genişleyen Now Playing;
- sayfa değişirken kesintisiz playback;
- queue, favori/kütüphane ve dinleme geçmişi;
- responsive/adaptive layout;
- mobilde mini-player + ana navigasyon;
- ses kalitesi, credits ve metadata'ya gerektiğinde erişim;
- hesap, abonelik ve entitlement deneyiminin dinlemeyi bozmaması;
- CURADET'e özgü lisans/sync yolunun doğal biçimde erişilebilir olması.

Benchmark davranış/kalite içindir; CURADET başka platformların layout'unu, marka kimliğini veya katalog modelini kopyalamaz.

## Player çekirdeği
Player dekoratif widget değildir. Route'lardan bağımsız yaşayan çekirdek ürün katmanıdır: persistent mini-player, full Now Playing, play/pause, ileri/geri, scrub, ses, queue, eser/album bağlamı, uygun olduğunda lyrics/credits/metadata, favori/kütüphane ve kesintisiz playback.

## Keşif sistemi
Keşif yalnız tür kartlarından oluşmaz. Kullanıcı CURADET kataloğuna yeni çıkan, editoryal seçki, tür, duygu, kültür/coğrafya, dönem, enstrümantal/vokal, benzer eser, proje ve dinleme geçmişi gibi kapılardan ulaşabilir. Music Analyzer verisi teknik gürültü olarak gösterilmez; keşif zekâsını besler.

## Living Music Interface
CURADET kimliği sabittir; eserlerin Music/Color/Visual DNA'sı kontrollü atmosfer yaratabilir. Living Music Interface platform işlevinin yerine geçmez. Logo, navigasyon, player kullanılabilirliği, kontrast ve erişilebilirlik sabit kalır. Gösterişli equalizer/neon/AI klişesi varsayılan değildir.

## Teknoloji görünmez
Public yüz AI gösterisi değildir. CURADET AI, Music Brain, Analyzer, Rights Engine, Cover Art Brain, Social Engine ve COOS arkada çalışır. Kullanıcı müziği ve platformu deneyimler.

## Lisanslama farkı
CURADET yalnız abonelikle dinleme ürünü değildir. Hakları uygun eserlerde eser/album/Now Playing bağlamından doğal bir `Lisansla / Sync` yolu bulunabilir. B2C abonelik ve B2B lisanslama aynı hak/metadata kaynağına bağlanır fakat kullanıcı akışları birbirine karıştırılmaz.

## Özel Control Center
PRIVATE CURADET CONTROL CENTER; üretim, Analyzer, master, hak/provenance/metadata, katalog-yayın durumu, Visual DNA, sosyal/yayın, kullanıcı/abonelik operasyonları, gelir ve dinleme analitiği, performans/öğrenme, sistem sağlığı ve audit yönetimini birleştirir. Public platform ile yönetim yüzü güvenlik açısından ayrıdır.

## Tasarım bağımsızlığı
Benchmarklardan davranış ve kalite öğrenilir; layout kopyalanmaz. CURADET'in arayüzü kendi katalog sahipliği, kendi üretim zinciri, abonelik modeli, lisanslama avantajı ve Music/Visual DNA'sı etrafında kurulur.

## Kalite kapısı
Final platform minimum olarak gerçek katalog, arama/keşif, eser/album sayfası, persistent player, queue, hesap/oturum, abonelik entitlement mantığı, responsive/adaptive davranış, erişilebilirlik/kontrast, performans, playback devamlılığı, logo/kaynak doğruluğu, hak/provenance ve gerçek cihaz/tarayıcı testlerinden geçmelidir. Ödeme canlıya alınmadan önce güvenlik, vergi/faturalama ve sağlayıcı entegrasyonu ayrıca doğrulanır.

**NO PASS → NO FINAL RELEASE.**

## Çekirdek özeti
**CURADET = KENDİ MÜZİĞİNİ ÜRETEN + KENDİ KATALOĞUNU YAYINLAYAN + KENDİ DİNLEME PLATFORMUNU İŞLETEN + ABONELİK GELİRİ KURAN + HAK/LİSANSLAMA KATMANINI YÖNETEN MÜZİK EKOSİSTEMİ.**

**ÜRET → DOĞRULA → YAYINLA → DİNLET → ABONELİK → ÖLÇ → ÖĞREN → YENİDEN ÜRET.**
