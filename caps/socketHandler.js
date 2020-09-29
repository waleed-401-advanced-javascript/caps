'use strict';

require('dotenv').config('.env');

const isTest = process.env.NODE_ENV === 'testing';

const storeName = process.env.STORE_NAME;

const joinHandler = (socket, roomId) => {
  console.log('joining------', roomId);
  !isTest && socket.join(roomId);
};

const pickupHandler = (socket, payload) => {
  logEvent('pickup', payload);
  !isTest && socket.broadcast.emit('pickup', payload);
};

const inTransitHandler = (socket, payload) => {
  !isTest && socket.to(storeName).emit('in-transit', payload);
  logEvent('in-transit', payload);
};

const deliveredHandler = (socket, payload) => {
  !isTest && socket.broadcast.to(storeName).emit('delivered', payload);
  logEvent('delivered', payload);
};

function logEvent(event, payload) {
  console.log(`
    EVENT { event: ${event},
      time: ${new Date().toISOString()},
      payload:
       { store: ${payload.storeName},
         orderID: ${payload.orderId},
         customer: ${payload.customerName},
         address: ${payload.address} } }`);
}

module.exports.joinHandler = joinHandler;
module.exports.pickupHandler = pickupHandler;
module.exports.inTransitHandler = inTransitHandler;
module.exports.deliveredHandler = deliveredHandler;
module.exports.logEvent = logEvent;