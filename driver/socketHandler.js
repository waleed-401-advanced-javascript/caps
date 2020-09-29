'use strict';


const isTest = process.env.NODE_ENV === 'testing';

const pickupHandler = (socket, payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    !isTest && socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.orderId}`);
    !isTest && socket.emit('delivered', payload);
  }, 3000);
};

module.exports.pickupHandler = pickupHandler;