'use strict';
  
/* eslint-disable no-use-before-define */
require('dotenv').config('.env');

const storeName = process.env.STORE_NAME;

const io = require('socket.io-client');

const Order = require('./models/Order');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const socket = io(`http://${host}:${port}/caps`);

const { deliveredHandler } = require('./socketHandler');

socket.emit('join', storeName);

socket.on('connect', () => {
  console.log('Vednor is connected to Server! ..');
});

socket.on('delivered', (payLoad) => {
  deliveredHandler(payLoad);
});
socket.on('disconnect', () => {
  console.log('Vednor is disconnected');
});

setInterval(() => {
  const order = new Order();
  socket.emit('pickup', order);
}, 5000);