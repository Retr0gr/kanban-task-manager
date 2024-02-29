const { 
    v4: uuidv4,
  } = require('uuid');

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.id = uuidv4()
    console.log(`${ws.id} connected.`);
    ws.on('message', function incoming(message) {

        console.log('received: %s', message);
        console.log('recieved message from: %s', ws.id);
        
        // Broadcast incoming message to all clients except the sender
        wss.clients.forEach(function each(client) {
            if (client.id !== ws.id && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message.toString()));
            }
        });
    });
});

console.log('WebSocket server started on port 8080');
