const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function imcoming(data) {
    wss.clients.forEach(function each(client) {
      if(client !== ws && client.readyState == WebSocket.OPEN) {
        client.send(client.id.toString() + ` send ` + data.toString());
      }
    })
  })
})

server.listen(port, function(){
  console.log(`Server is listening on ${port} !`);
})

// server.addEventListener("message", event => {
//   // event.data is Blob
//   event.data.text().then(txt=>console.log(txt))   
// });