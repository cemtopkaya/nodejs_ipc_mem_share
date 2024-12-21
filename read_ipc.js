/**
 * @module read
 * @requires node-ipc
 * @description IPC client module for requesting and receiving shared data from the server
 * 
 * @property {Object} ipc.config - IPC configuration object
 * @property {string} ipc.config.appspace - Application namespace for IPC communication
 * @property {string} ipc.config.socketRoot - Root directory for socket files
 * @property {number} ipc.config.retry - Retry interval in milliseconds for reconnection attempts
 * @property {boolean} ipc.config.silent - When true, suppresses all console logs from IPC operations
 *    ipc.config.silent = false haliyle çalıştırılınca ayrıntılı çıktı veriyor
 *    $ node write.js 
 *    Service path not specified, so defaulting to ipc.config.socketRoot + ipc.config.appspace + id 
 *    requested connection to  server-socket /tmp/cem/ipc-ogreniyorumserver-socket
 *    Connecting client on Unix Socket : /tmp/cem/ipc-ogreniyorumserver-socket
 *    dispatching event to  server-socket /tmp/cem/ipc-ogreniyorumserver-socket  :  getSharedData , 
 *    retrying reset
 *    ## received events ##
 *    detected event sharedData { counter: 2, message: 'Hello from shared memory....!' }
 *    Received shared data: { counter: 2, message: 'Hello from shared memory....!' }
 *    connection closed server-socket /tmp/cem/ipc-ogreniyorumserver-socket Infinity tries remaining of Infinity
 *    PC-CEM-TOPKAYA exceeded connection rety amount of  or stopRetrying flag set.
*
 *    ipc.config.silent = true sadece console.log() çıktısını veriyor
 *    $ node write.js 
 *    Received shared data: { counter: 3, message: 'Hello from shared memory....!' }
 * 
 * @property {string} serverSocketName - Name of the server socket to connect to
 */
const ipc = require('node-ipc').default;

// Soket ayarları
ipc.config.appspace = 'ipc-ogreniyorum';
ipc.config.socketRoot = '/tmp/cem/';
// ipc.config.id = 'client-socket';
serverSocketName = 'server-socket';
// her 1000 milisaniyede bir yeniden bağlanmayı dene
ipc.config.retry = 1000;

ipc.config.silent = true;

ipc.connectTo(serverSocketName, () => {
  ipc.of[serverSocketName].on('connect', () => {
    ipc.of[serverSocketName].emit('getSharedData');
  });

  ipc.of[serverSocketName].on('sharedData', (data) => {
    console.log('Received shared data:', data);
    ipc.disconnect(serverSocketName);
  });
});
