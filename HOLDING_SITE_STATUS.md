# CURADET HOLDİNG — yayın durumu

Son doğrulama: 18 Kasım 2026, Türkiye saati.

## Güncel yayın
Kurumsal site Spaceship Standard 1 VPS üzerinde bağımsız olarak yayımlanıyor. Sunucu curadet-holding, Ubuntu 24.04, genel IP 153.79.249.162. Yayındaki kaynak sürümü 2756793318a8d9b2cf74ed0f66dc72fdfd37ed8a. Kaynak /opt/curadet-source; taşınabilir yayın /opt/curadet-holding-release; 44 public dosya. Caddy Docker Compose ile çalışıyor ve yeniden başlatma politikası unless-stopped.

Kullanıcı root parolasını kendisi oluşturdu; parola kaynakta veya bu kayıtta tutulmaz. Standard 1 denemesi 25 Kasım 2026'da aylık 247,17 TL olarak yenilenecek; kullanıcı aylık planı onayladı. Ücretli AutoBackup seçilmedi.

## Doğrulananlar
- Paket bütünlüğü kontrolü: 21 HTML sayfası kalite kontrolünden geçti; Caddy yapılandırması geçerli.
- Sunucu yerel ön testi kurumsal ana sayfa başlığını döndürdü.
- Let's Encrypt sertifikası başarıyla alındı; sertifika denetimi kapatılmadan doğrudan yeni IP üzerinden HTTPS /healthz yanıtı ok.
- Normal DNS çözümlemesiyle https://curadet.com/ HTTP 200; uzak IP 153.79.249.162.
- https://www.curadet.com/ HTTPS üzerinden https://curadet.com/ adresine yönleniyor; son yanıt HTTP 200.
- Ayrı tarayıcı oturumunda canlı ana sayfa ve yeni soyut kurumsal görsel doğrulandı.

## DNS ve geri dönüş
Güncel: @ A 153.79.249.162; www CNAME curadet.com; TTL 30 dakika. Eski üç ek GitHub A kaydı kaldırıldı. İki MX, SPF, DKIM, otomatik yapılandırma SRV ve DMARC değiştirilmedi. Ad sunucuları launch1.spaceship.net ve launch2.spaceship.net olarak korundu.

Gerekirse önce eski yayın içeriğini doğrulayarak geri dön: @ için 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 A kayıtlarını; www için erkan1256-bit.github.io CNAME kaydını geri yükle. E-posta kayıtlarını değiştirme. Git geçmişi ve eski yayın korunur.

## Kapsam
Müzik odaklı ana sayfa kurumsal HOLDİNG sitesine dönüştürüldü. Onaylı logo korundu; eski müzik fotoğrafları ana sayfadan kaldırıldı. Hakkımızda, projeler, yönetim, ilkeler, sosyal fayda ve iletişim sayfaları bulunur. Holding kuruluş hazırlığı açıkça belirtilir; tescil tamamlanmış sayılmaz.

Yönetim paneli/veritabanı ve otomatik sunucu yedeği kurulmuş değildir. E-posta teslimatı bu geçişte test edilmedi; DNS kayıtları korundu. DNS önbellekleri nedeniyle bazı ziyaretçiler bir süre eski sunucuyu görebilir. Sonraki kod değişiklikleri GitHub'a kaydedilse bile VPS'ye ayrıca dağıtılmalıdır.

## Premium ve geniş proje sunumu — 18 Kasım 2026
Kurumsal ana sayfa özgün lacivert/altın editorial tasarımla yenilendi. Koç ve Tata, ardından kullanıcının isteğiyle Tesla, SpaceX ve xAI resmî siteleri incelendi. Açılış için orijinal SVG ufuk görseli ve teknoloji/ses alanları için CSS konsept görselleri oluşturuldu; başka markaların medya varlıkları kullanılmadı. Görseller ürün ekranı veya gerçek tesis iddiası taşımaz. Araştırma/geliştirme durumları ve şirket kuruluş hazırlığı korunur.

Canlı VPS'ye yeni paket aktarıldı; önceki public dizini /opt/curadet-before-frontier-20261118 altında korundu. 21 HTML sayfasında yerel bağlantı kalite kontrolü başarılı. Canlı masaüstü görünümü, proje alanına geçiş ve 390px srcdoc önizlemesinde ana sayfa/proje bölümü ve menü doğrulandı; bu fiziksel telefon testi değildir. Mobil menü yüksekliği sorunu giderildi. Geçici QA dosyası kaldırıldı. Yeni SVG oklar font eksikliğini önler. Otomatik tam tarayıcı testi ve gerçek cihaz performans ölçümü yapılmadı.
