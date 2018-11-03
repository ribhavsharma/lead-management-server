// Server
const express = require('express');
const bodyParser = require("body-parser");
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);

server.use(bodyParser.urlencoded({ extended: false }));

server.use('/', express.static(__dirname + "/public/"));
server.use('/node_modules', express.static(__dirname + "/node_modules/"));

server.post('/api/calls', (req, res) => {
  const number = req.body.number;
  let status;
  switch (req.body.status) {
    case '0':
      status = 'started';
      break;
    case '1':
      status = 'stopped';
      break;
    case '2':
      status = 'paused';
      break;
    case '3':
      status = 'resumed';
      break;
    default:
      res.status(400).send('Invalid status');
      return;
  }
  io.emit('call status change', {
    number,
    status
  });
  res.send('Emitted message');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected.`);
  socket.on('disconnect', () => console.log(`${socket.id} disconnected.`));
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
})
