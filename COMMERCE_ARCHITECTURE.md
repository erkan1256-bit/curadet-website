# CURADET Commerce & Rights Architecture v1

## Amaç
CURADET sitesini kurumsal vitrin + müzik kaynağı + white-label lisanslama + private vault + güvenli teslimat sistemine dönüştürmek.

## Birim sahipliği
- 02 Pazarlama & Sosyal: mağaza vitrini, kampanya, katalog sunumu, trafik ve dönüşüm.
- 03 Müzik Üretim: katalog eseri, özel eser, alternatif sürümler, WAV/stems/instrumental teslim kaynakları.
- 03A Deney Atölyesi: deneysel üretim araçları ve prototipler; ticari kataloğa ancak 03+04 onayıyla geçer.
- 04 Haklar & Dağıtım: hak zinciri, AI/insan katkı kaydı, lisans türü, sözleşme, metadata, Content ID/çakışma kontrolü.
- 05 Sync & B2B: confidential sanatçı, film/dizi/reklam/oyun ve özel teklif/negotiated license akışları.
- 06 Teknoloji: hesap, kimlik doğrulama, ödeme entegrasyonu, private vault, güvenli indirme, log, hash, erişim ve yedekleme.
- 00 Merkez: ortak politika, fiyatlama sınırları, kritik risk ve nihai koordinasyon.

## Zorunlu sipariş durumu
DRAFT -> RIGHTS_REVIEW -> QUOTED -> CONTRACT_READY -> PAYMENT_PENDING -> PAID -> PRODUCTION/READY -> LICENSE_ACTIVE -> DELIVERY_READY -> DELIVERED -> CLOSED

Hiçbir final dosya PAYMENT_PENDING veya RIGHTS_REVIEW durumunda açılamaz.

## Eser kaydı
Her eser için benzersiz work_id, version_id ve master_id tutulur. Kaynak dosyalar, yaratıcı katkılar, üretim araçları, hak sahipleri, söz/beste/aranje/master bilgileri ve ticari kullanım uygunluğu kayda bağlanır.

## Lisans modeli
- non_exclusive
- limited_exclusive
- exclusive
- negotiated_sync
- buyout_or_assignment (yalnız özel hukuk/hak incelemesiyle)

Hak devri, lisans olarak gösterilemez. Exclusive satış sonrası katalog görünürlüğü ve önceki lisanslar otomatik kontrol edilir.

## White-label gizlilik
- Final WAV üzerinde zorunlu duyulabilir CURADET ibaresi yoktur.
- Kamuya açık metadata yalnız sözleşmenin/hak zincirinin gerektirdiği bilgiyi taşır.
- Satın alma kaynağı üçüncü kişiye otomatik ifşa edilmez.
- İç sistemde müşteri, sözleşme, lisans, ödeme, teslim dosyası hash'i, IP/oturum güvenlik kayıtları ve zaman damgası yetkili erişimde tutulur.

## Profil / Private Vault
Hesapta şu bölümler bulunur:
- Satın Aldıklarım
- Özel Eserlerim
- Private Vault
- Siparişler / revizyonlar
- Lisanslar / sözleşmeler
- Ödemeler / faturalar
- Güvenli teslimatlar
- Destek / anlaşmazlık kaydı

## Ödeme ilkeleri
Kart verisi CURADET statik frontendinde tutulmaz. PCI kapsamı ödeme sağlayıcısında kalır. Backend yalnız sağlayıcı işlem kimliği, tutar, para birimi, durum ve doğrulanmış webhook kaydını tutar. Webhook imzası doğrulanmadan PAID durumuna geçilmez.

## Güvenli teslimat
Final WAV/stems public URL ile sunulmaz. Kısa ömürlü imzalı indirme URL'si kullanılır. Her teslim versiyonunun SHA-256 hash'i ve teslim zamanı kaydedilir. Müşteri yalnız lisansının izin verdiği dosyaları görür.

## Kimlik doğrulama
Parolalar düz metin tutulmaz. Güçlü parola hash'i, güvenli session/cookie, CSRF koruması, rate-limit, e-posta doğrulama ve opsiyonel/kurumsal 2FA uygulanır. Admin, rights, production ve customer rolleri ayrılır.

## Özel sanatçı akışı
Sanatçı veya temsilci confidential brief oluşturur -> 05 erişim seviyesi belirler -> 03 üretir -> 04 hak zincirini doğrular -> sanatçı private preview dinler -> revizyon -> sözleşme/ödeme -> final WAV/stems private vault'a açılır. Proje public katalog veya referans listesine ancak ayrıca izin verilirse girer.

## Yayına alma kapıları
1. Hak zinciri doğrulaması
2. Sözleşme şablonlarının hukuk/KVKK incelemesi
3. Ödeme sağlayıcısı ve webhook testi
4. Auth + yetki testi
5. Güvenli storage + signed download testi
6. E-posta/fatura akışı testi
7. Refund/cancel/dispute senaryoları
8. Gerçek cihaz ve erişilebilirlik testi
9. Yedekleme/geri yükleme testi
10. Penetrasyon/güvenlik kontrolü
