# CURADET Platform Backend

Bu dizin, CURADET.com'un kurumsal siteden ana ticari platforma dönüşmesinin güvenli sunucu çekirdeğidir.

## Kilit kurallar
- Final WAV/stem sadece aktif lisans + kesinleşmiş ödeme + aktif entitlement ile açılır.
- Private Vault dosyaları public URL olmaz; kısa ömürlü signed download ile teslim edilir.
- Exclusive eserler korumalı müzikal kimlik kaydıyla tutulur ve yeni üretimler benzerlik eşiğine karşı kontrol edilir.
- Müşteri kimliği, brief, demo, ses, sözleşme ve satın alma kaynağı varsayılan olarak gizlidir.
- Kart verisi CURADET sunucusunda tutulmaz; ödeme sağlayıcısından yalnız token/işlem durumu saklanır.
- Sahte auth/ödeme yoktur. Bağlanmamış güvenli servisler 501 döndürür.

## Yerel geliştirme
1. `npm install`
2. `npm test`
3. `npm run typecheck`
4. `npm run dev`

`DATABASE_URL`, `APP_ORIGIN`, `PORT`, `HOST`, `NODE_ENV` ortam değişkenleriyle yapılandırılır.

## Sıradaki bağlanacak gerçek servisler
Kimlik doğrulama + 2FA, PostgreSQL migration çalıştırıcısı, S3-uyumlu private object storage, ödeme sağlayıcı adapteri, e-sözleşme/e-imza adapteri, audit log ve rate-limit katmanı.
