# Node.js IPC (Süreçler Arası İletişim) Örneği

Bu proje, `node-ipc` paketini kullanarak Node.js'de Süreçler Arası İletişimin (IPC) nasıl uygulanacağını göstermektedir. Birden fazla süreç arasında basit bir paylaşılan bellek uygulamasını sergiler.

## Proje Genel Bakış

Proje, IPC'yi göstermek için birlikte çalışan üç ana JavaScript dosyasından oluşur:

1. `index.js` - Ana orkestratör
2. `create_ipc.js` - IPC sunucusu
3. `read_ipc.js` - IPC istemcisi

## Nasıl Çalışır

### Sunucu Kurulumu (`create_ipc.js`)
- Belirli bir yapılandırma ile IPC sunucusu oluşturur:
  ```javascript
  ipc.config.appspace = 'ipc-ogreniyorum';
  ipc.config.socketRoot = '/tmp/cem/';
  ipc.config.id = 'server-socket';
  ```
- Şunları içeren paylaşılan bir veri nesnesi tutar:
  - Bir sayaç
  - Bir mesaj dizisi
- İstemci isteklerini dinler ve paylaşılan veriyle yanıt verir

### İstemci Uygulaması (`read_ipc.js`)
- Eşleşen yapılandırmayı kullanarak sunucuya bağlanır
- 'getSharedData' olayını kullanarak paylaşılan veriyi talep eder
- Paylaşılan veriyi alır ve görüntüler
- Veriyi aldıktan sonra bağlantıyı keser

### Ana Süreç (`index.js`)
- Hem sunucu hem de istemci süreçlerini başlatır
- Sunucu ve istemci başlangıcı arasında 1 saniyelik gecikme uygular
- Süreç çıktı günlüklemesini yönetir

## Projeyi Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Uygulamayı başlatın:
   ```bash
   node index.js
   ```

## Temel Özellikler

- Asenkron IPC iletişimi
- Paylaşılan bellek yönetimi
- Süreç senkronizasyonu
- Olay tabanlı mimari
- Yapılandırılabilir yeniden deneme mekanizmaları
- Unix soket tabanlı iletişim

## Teknik Detaylar

- İletişim için Unix soketleri kullanır
- Bağlantı kararlılığı için yeniden deneme mantığı uygular
- `ipc.config.silent` ile yapılandırılabilir günlükleme
- Düzgün süreç yönetimi ve hata işleme

## Bağımlılıklar

- `node-ipc`: ^12.0.0

## Notlar

Uygulama, `/tmp/cem/` dizininde soket dosyaları oluşturur ve iletişim için 'ipc-ogreniyorum' ad alanını kullanır.

```shell
cemt@PC-CEM-TOPKAYA:/tmp/cem$ ll
total 8
drwxr-xr-x  2 cemt cemt 4096 Dec 21 14:35 ./
drwxrwxrwt 18 root root 4096 Dec 21 14:33 ../
srwxr-xr-x  1 cemt cemt    0 Dec 21 14:35 ipc-ogreniyorumserver-socket=
```