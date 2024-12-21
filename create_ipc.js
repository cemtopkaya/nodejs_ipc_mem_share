/**
 * @module create_ipc
 * @requires node-ipc
 * @description appspace, IPC iletişiminde kullanılan uygulamanın ad alanını (namespace) belirtir.
 * Bu, farklı uygulamaların IPC sunucularını ve istemcilerini birbirinden ayırmak için kullanılır.
 * İstemci tarafında da aynı appspace değeri belirtilmelidir, çünkü istemci ve sunucu arasındaki
 * iletişimin doğru şekilde eşleşmesi için bu değerin her iki tarafta da aynı olması gerekir.
 * Bu olmadan, istemci sunucuyu bulamaz ve bağlantı kurulamaz.
 */
const ipc = require('node-ipc').default;

// Soket ayarları
ipc.config.appspace = 'ipc-ogreniyorum';
ipc.config.socketRoot = '/tmp/cem/';
ipc.config.id = 'server-socket';
// her 1500 milisaniyede bir yeniden bağlanmayı dene
ipc.config.retry = 1500;
ipc.config.silent = true;

// Shared memory initialization
const sharedData = {
  counter: 0,
  message: `Hello from shared memory....!`
};

ipc.serve(() => {
  
  ipc.server.on('getSharedData', (data, socket) => {
    console.log('Received from client:', data);
    console.log('Shared data requested:', sharedData);
    sharedData.counter++; // Increment counter
    ipc.server.emit(socket, 'sharedData', sharedData);
  });
});


// console.log(ipc);
ipc.server.start();
console.log('Shared memory server started');
