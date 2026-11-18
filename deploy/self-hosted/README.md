# CURADET HOLDİNG — bağımsız sunucu yayını

Bu paket curadet.com kurumsal sitesini kendi Linux sunucunuzda çalıştırır. Wix veya GitHub Pages çalışma zamanında kullanılmaz. GitHub yalnızca kaynak kodunun isteğe bağlı yedeğidir. Caddy açık kaynak web sunucusudur; Docker kurulumu taşınabilir kılar. Fiziksel sunucu/VPS, internet bağlantısı, DNS ve sertifika otoritesi yine gereklidir.

## Mevcut kapsam
Kurumsal sayfalar, kendi logo ve görselleri, gezinme ve tarayıcı içi arama. Yönetim paneli, kimlik doğrulama, veritabanı ve üyelik bu pakette yoktur. Depodaki müzik/ticaret backend'i HOLDİNG sitesine bağlanmamış ve bu pakete alınmamıştır. Paket yalnızca halka açık dosyaları içerir; depo, yapılandırma sırları ve kaynak belgeleri public klasörüne kopyalanmaz.

## Kaynaktan paket
Depo kökünde:

    python3 scripts/site_integrity.py
    python3 scripts/package_self_hosted.py /tmp/curadet-holding-release

Tar arşivini sunucuya aktarın ve /opt altında açın. Hedef dizin yeni olmalıdır; eski sürümü silmeyin. Docker Engine ve Compose kurulu olmalıdır.

## Alan adını değiştirmeden kontrol
Paket klasöründe:

    docker compose run --rm --no-deps web caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
    docker compose run --rm --publish 127.0.0.1:8080:8080 web caddy file-server --root /srv --listen :8080

İkinci komut geçici HTTP testi içindir; üretim servisi değildir. Sunucuda başka terminalden http://127.0.0.1:8080 adresini kontrol edin. SSH tüneliyle kendi bilgisayarınızdan da inceleyin. Bitirince Ctrl+C ile durdurun.

## Canlı geçiş
Önce mevcut A, AAAA, CNAME ve e-posta kayıtlarının dökümünü güvenli yerde saklayın. curadet.com A kaydını yeni sunucunun IPv4 adresine; www kaydını curadet.com'a yönlendirin. AAAA varsa yeni sunucunun çalışan IPv6 adresiyle eşleştirin veya geçiş planında düzeltin. MX, SPF, DKIM, DMARC ve e-posta doğrulama kayıtlarını koruyun. Alan adı sunucularını topluca değiştirmeyin.

Sunucuda 80/TCP ve 443/TCP erişilebilir olmalıdır; HTTP/3 için 443/UDP isteğe bağlıdır. DNS hedefe ulaştığında paket klasöründe:

    ./start.sh
    docker compose ps
    curl --fail https://curadet.com/healthz
    curl --fail --head https://www.curadet.com/

Caddy alan adları için HTTPS sertifikası alma/yenileme işlemini yürütür. caddy_data hacmini koruyun. Gerçek sunucu, DNS ve HTTPS sonucu doğrulanmadan geçiş tamamlandı sayılmaz.

## Güncelleme ve geri dönüş
Yeni sürümü ayrı dizinde hazırlayın; önceki public klasörünü ve release.json dosyasını saklayın. Durdurma ve yeniden başlatmayı bakım aralığında yapın. `docker compose down` veri hacimlerini varsayılan olarak silmez; `-v` kullanmayın. Geri dönüşte önceki public içeriğini geri yükleyip servisi yeniden başlatın. Sunucu sorunu varsa kaydedilmiş eski web DNS kayıtlarına dönün; e-posta kayıtlarını değiştirmeyin.

## Doğrulama sınırı
Bu çalışma ortamında Docker/Caddy yok: gerçek container başlatma, sertifika alma ve sunucu testi burada yapılmadı. Paket içeriği, dosya bütünlüğü ve site bağlantıları yerel olarak kontrol edilebilir. Üretimde kullanılan image digest'i sunucuda kaydedilip sabitlenmelidir.

Kaynaklar: https://caddyserver.com/docs/quick-starts/https ve https://docs.docker.com/reference/compose-file/services/
