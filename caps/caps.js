'use strict';

const http = require('http');

const server = http.createServer();

const io = require('socket.io')(server);

const caps = io.of('/caps');

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`server is running on ${port}`));

const {
  joinHandler, pickupHandler, inTransitHandler, deliveredHandler,
} = require('./socketHandler');
//caps namespace on connection 
caps.on('connection', (socket) => {
  console.log('user is online!!!', socket.id);

  socket.on('join', (payload) => {
    joinHandler(socket, payload);
  });

  socket.on('pickup', (payload) => {
    pickupHandler(socket, payload);
  });

  socket.on('in-transit', (payload) => {
    inTransitHandler(socket, payload);
  });

  socket.on('delivered', (payload) => {
    deliveredHandler(socket, payload);
  });

  socket.on('error', (e) => {
    console.log('ERROR !!!!!!! ', e.message);
  });

  socket.on('close', (err) => {
    console.log(socket.id, ' closed ', err.message);
  });
});