const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./util/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

io.on('connection', socket => {
  console.log('New websocket connection');
  socket.emit('message', generateMessage('Welcome!'));
  socket.broadcast.emit('message', generateMessage('A new user has joined!'));

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed in this chatroom');
    }

    io.emit('message', generateMessage(message));
    callback('Delivered');
  });

  socket.on('sendLocation', ({ lat, long }, callback) => {
    io.emit(
      'locationMessage',
      generateMessage(`https://google.com/maps?q=${lat},${long}`)
    );

    callback('Location Shared!');
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left!'));
  });
});

server.listen(PORT, () => {
  console.log(`[app]: listening on port ${PORT}`);
});
