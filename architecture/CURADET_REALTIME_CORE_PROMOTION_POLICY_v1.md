# CURADET — ANLIK ÇEKİRDEK GÜNCELLEME VE BİLGİ TERFİ POLİTİKASI v1

Status: CORE / BINDING EXECUTION RULE
Owner: CURADET
Coordination: 00 — CURADET MERKEZ

## Owner görevi
Owner talimatı: CURADET kapsamında yapılan çalışmalar sırasında ortaya çıkan anlamlı öneriler, kurallar, araştırma sonuçları, doğrulanmış kararlar ve kalıcı kurumsal öğrenmeler bekletilmeden değerlendirilir ve uygun çekirdek/kurumsal tek-doğru-kaynak katmanına güncellenir.

Bu görev yeni bir sohbet veya yeni bir alt görev başladığında sıfırlanmaz.

## Yanıt öncesi çekirdek güncelleme kuralı
Owner'ın açık talimatı gereği, CURADET kapsamında bir kullanıcı mesajına cevap verilmeden önce o mesajın veya hemen önceki işlemin ortaya çıkardığı kalıcı ve doğrulanmış kurumsal öğrenme olup olmadığı kontrol edilir. Varsa önce uygun kurumsal çekirdek/SSOT kaynağı güncellenir, sürüm/hash/commit alınır ve geri okunarak doğrulanır; kullanıcıya cevap bundan sonra verilir.

Bu kural `her mesajı çekirdeğe yaz` anlamına gelmez. Geçici sohbet, ham fikir, doğrulanmamış araştırma ve tek kullanımlık ayrıntılar çekirdeğe terfi ettirilmez. Ancak kalıcı hata dersi, bağlayıcı Owner talimatı, tekrar kullanılacak kalite kapısı veya mimari karar varsa yanıt öncesi terfi zorunludur.

## Temel kural
ANLIK KAYIT ≠ KÖRÜ KÖRÜNE ÇEKİRDEĞE YAZMA.

Her bilgi önce sınıflandırılır ve doğrulanır. Çekirdek; sohbet günlüğü, ham araştırma deposu veya geçici fikir çöplüğü değildir.

## Zorunlu akış
İŞ / ARAŞTIRMA / ÖNERİ → SINIFLANDIR → KAYNAK DOĞRULA → ÇATIŞMA KONTROLÜ → KALICILIK / YENİDEN KULLANILABİLİRLİK TESTİ → UYGUN KATMANI GÜNCELLE → SÜRÜM / HASH / COMMIT → GERİ OKU / DOĞRULA → DEVAM NOKTASINI KAYDET → KULLANICIYA CEVAP.

## Çekirdeğe terfi edecek bilgi
Aşağıdakiler doğrulanmış ve kurumsal olarak kalıcıysa çekirdeğe/SSOT'a terfi edilir:
- Owner tarafından kesinleştirilen bağlayıcı ilkeler ve görevler;
- CURADET mimarisini veya çalışma biçimini değiştiren kararlar;
- tekrar kullanılacak kalite kapıları ve standartlar;
- doğrulanmış platform/entegrasyon mimarisi;
- önemli hata dersleri ve tekrarını önleyen kurallar;
- kaynak, sürüm, hak, güvenlik ve yayın açısından kalıcı kurumsal gerçekler;
- birden fazla CURADET birimini etkileyen doğrulanmış ortak bilgi;
- gelecekteki görevlerin doğru devam etmesi için zorunlu devam noktaları.

## Doğrudan çekirdeğe yazılmayacak bilgi
- ham ve doğrulanmamış web araştırması;
- geçici fiyat, kota veya sık değişen platform parametresi (gerekirse tarihli registry/watch kaydında tutulur);
- başarısız deneylerin tüm ayrıntıları (yalnız kalıcı ders terfi edilir);
- tek kullanımlık sohbet ayrıntıları;
- tahmin, varsayım veya çıkarım doğrulanmış gerçekmiş gibi;
- parola, token, recovery code, API secret veya benzeri gizli kimlik bilgileri;
- aynı bilginin tekrar kopyaları;
- Owner'ın iptal ettiği/reddettiği varlıkların onaylı kaynak gibi kullanımı.

## Araştırma güncelleme kuralı
Araştırma sonucunda değişebilir dış bilgi bulunursa iki katman kullanılır:
1. KALICI İLKE: çekirdeğe yazılır. Örnek: yayın öncesi platformun güncel resmi kuralları yeniden doğrulanır.
2. ANLIK PARAMETRE: tarih/sürüm/kaynakla registry veya araştırma kaydında tutulur; evrensel değişmez gerçek gibi çekirdeğe gömülmez.

## Öneri güncelleme kuralı
Asistanın her önerisi otomatik olarak bağlayıcı karar değildir.
- Düşük riskli, geri döndürülebilir, mevcut ilkelere uygun teknik/operasyonel iyileştirme uygulanıp test edilirse doğrulanmış sonuç olarak kaydedilebilir.
- Stratejik yön, önemli maliyet, hak devri, güvenlik yetkisi, geri döndürülemez yayın/silme veya Owner yetkisi gerektiren öneri Owner kararı olmadan bağlayıcı çekirdek kararı yapılamaz.
- Owner açıkça kabul ettiği anda karar uygun kaynağa sürümlenir.

## Tasarım bağımsızlığı — kalıcı hata dersi
CURADET çekirdeğini korumak, mevcut bir CURADET web sayfasının layout'unu veya görsel kompozisyonunu kopyalamak anlamına gelmez.

Owner `bağımsız`, `yeni`, `farklı`, `birkaç örnek` veya eşdeğer bir tasarım talebi verdiğinde:
- mevcut sitenin hero yerleşimi, kart sistemi, navigasyon biçimi, renk dağılımı ve kompozisyonu varsayılan şablon olarak taşınmaz;
- önce birbirinden yapısal olarak ayrışan tasarım aileleri oluşturulur;
- alternatifler yalnız içerik/görsel değişimiyle değil bilgi mimarisi, kompozisyon, etkileşim, tipografi, ritim, boşluk, hareket ve keşif modeli açısından ayrışmalıdır;
- CURADET'in bağlayıcı kimlik, kaynak, hak, erişilebilirlik, Music/Visual DNA ve kalite ilkeleri korunur;
- reddedilmiş tasarımlar yeni üretime gizli referans/başlangıç noktası yapılmaz.

**ÇEKİRDEĞİ KORU ≠ MEVCUT TASARIMI KOPYALA.**
**BAĞIMSIZ TASARIM = AYNI İLKEYİ YENİ BİR GÖRSEL/ETKİLEŞİM MİMARİSİYLE ÇÖZMEK.**

## Çatışma kuralı
Yeni bilgi eski kilitli kararla çatışırsa eski karar sessizce üzerine yazılmaz. Kaynaklar karşılaştırılır; yeni kanıt/Owner kararı belirtilir; eski kararın neden değiştiği audit izinde korunur; yeni sürüm oluşturulur.

## Güncelleme kapsamı
Kurumsal GitHub architecture/registry kaynakları mevcut erişimle güncellenebilir. Fiziksel notebook üzerindeki çalışan CURRENT çekirdeğe doğrudan yazma ve test yetkisi yoksa, kurumsal kaynak güncellenir fakat fiziksel CURRENT güncellendi denmez. Fiziksel çekirdek bağlantısı sağlandığında aynı politika CURRENT promotion gate'e bağlanacaktır.

## Görev sonu self-lock
Her maddi işlem sonunda sistem şu soruya cevap verebilir olmalıdır:
“CURADET bu işlemden sonra neyi kesin biliyor, neyi bağlayıcı kabul ediyor, hangi kaynak/sürüm bunu kanıtlıyor, ne açık kaldı ve bir sonraki çalışma nereden devam edecek?”

## Değişmez operasyon ilkesi
TRUTH > CLAIM.
VERIFIED > REMEMBERED.
ONE SOURCE > DUPLICATE SOURCES.
PERMANENT KNOWLEDGE > CHAT NOISE.

## Son karar
CURADET kapsamında anlamlı yeni bilgi bekletilmez; doğrulanır, sınıflandırılır ve doğru kurumsal katmana anlık olarak işlenir. Kalıcı ve doğrulanmış öğrenme varsa bu terfi kullanıcıya cevap verilmeden önce tamamlanır. Ancak çekirdek hiçbir zaman doğrulanmamış araştırma, geçici parametre, sır veya fikir çöplüğü ile kirletilmez.
