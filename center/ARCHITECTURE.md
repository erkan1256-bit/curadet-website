# CURADET Merkez — İletişim Merkezi Mimarisi

## Durum

Bu klasör yalnızca güvenli arayüz prototipidir. Canlı Spacemail posta içeriği henüz bağlanmamıştır.

## Amaç

CURADET Merkez'in üç ana posta kutusunu tek özel arayüzden görmesi:

- info@curadet.com — genel/kurumsal iletişim
- sync@curadet.com — 05 Sync & B2B
- rights@curadet.com — 04 Haklar & Lisanslama

Aliaslar:

- hello@curadet.com -> info@curadet.com
- support@curadet.com -> info@curadet.com
- licensing@curadet.com -> rights@curadet.com

## Güvenlik ilkeleri

1. Posta parolaları, TOTP secret'ları ve backup kodları hiçbir zaman frontend koduna, GitHub deposuna veya tarayıcı localStorage'a yazılmaz.
2. Canlı posta bağlantısı yalnızca sunucu tarafında çalışan güvenli bir connector/service üzerinden yapılır.
3. CURADET Merkez arayüzü kullanıcı girişi ve yetkilendirme olmadan mesaj içeriği göstermez.
4. 04 ve 05 birim erişimleri görev sınırlarıyla kısıtlanır; Merkez tüm kutuların üst denetimini taşır.
5. Okuma, yanıtlama, yönlendirme, silme ve yetki değişikliği gibi işlemler audit log'a yazılır.
6. Gizli bilgiler environment secret / secrets manager üzerinden yönetilir; repoya commit edilmez.
7. CSRF, XSS, session fixation ve brute-force korumaları zorunludur.
8. Oturum çerezleri Secure + HttpOnly + SameSite ile tutulur.

## Entegrasyon katmanları

### 1. Frontend

- Posta kutusu özeti
- Okunmamış sayıları
- Mesaj listesi
- Mesaj detayı
- Yanıtla / yönlendir
- Arama / filtre
- Birime ata
- Merkez notu / durum etiketi

### 2. Backend API

Örnek uçlar:

- GET /api/mailboxes
- GET /api/mailboxes/:id/messages
- GET /api/messages/:id
- POST /api/messages/:id/reply
- POST /api/messages/:id/forward
- POST /api/messages/:id/assign

### 3. Mail connector

Tercih sırası:

1. Spacemail resmi API/OAuth desteği varsa onu kullan.
2. Resmi API yoksa TLS zorunlu IMAP/SMTP sunucu tarafı connector kullan.
3. Uygulama şifresi / ayrı teknik kimlik destekleniyorsa normal kullanıcı şifresi yerine onu kullan.

Bu seçenekler resmi güncel Spacemail belgeleri doğrulanmadan uygulanmaz.

### 4. Yetkilendirme

- 00 CURADET MERKEZ: üç kutu üzerinde yönetim ve görünürlük
- 04 Haklar & Dağıtım: rights kutusu ve ilgili atamalar
- 05 Sync & B2B: sync kutusu ve ilgili atamalar
- info kutusu: Merkez ana sorumluluğu

## Doğrulama seviyesi

- UI prototipi: HAZIR
- Gerçek e-posta gönder/al: Spacemail üzerinde doğrulandı
- SPF: PASS
- DKIM: PASS
- DMARC: eklendi; DNS yayılımı ayrı doğrulama gerektirir
- 3 ana hesapta 2FA: kullanıcı tarafından tamamlandı
- CURADET Merkez canlı posta entegrasyonu: HENÜZ YAPILMADI
- Özel giriş/yetkilendirme: HENÜZ YAPILMADI

## Sonraki teknik adım

Spacemail'in güncel resmi entegrasyon yöntemini doğrula. API/OAuth varsa onunla; yoksa sunucu tarafı IMAP/SMTP connector tasarla. Kimlik bilgilerini hiçbir aşamada frontend'e koyma.
