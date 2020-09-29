'use strict';

const deliveredHandler = (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
};
  
module.exports.deliveredHandler = deliveredHandler;