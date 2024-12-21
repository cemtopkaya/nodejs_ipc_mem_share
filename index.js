const { spawn } = require('child_process');
const path = require('path');

// Start the IPC server
const server = spawn('node', [path.join(__dirname, 'create_ipc.js')]);

server.stdout.on('data', (data) => {
  console.log('Server:', data.toString());
});

server.stderr.on('data', (data) => {
  console.error('Server Error:', data.toString());
});

// Wait for 1 second to ensure server is ready, then start the client
setTimeout(() => {
  const client = spawn('node', [path.join(__dirname, 'read_ipc.js')]);

  client.stdout.on('data', (data) => {
    console.log('Client:', data.toString());
  });

  client.stderr.on('data', (data) => {
    console.error('Client Error:', data.toString());
  });
}, 1000);