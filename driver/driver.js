'use strict';
  
const io = require('socket.io-client');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const socket = io(`http://${host}:${port}/caps`);

const { pickupHandler } = require('./socketHandler');

socket.on('connect', () => {
  console.log('Driver is connected to Server! ..');
});

socket.on('pickup', (payLoad) => {
  pickupHandler(socket, payLoad);
});
socket.on('disconnect', () => {
  console.log('driver is disconnected');
});