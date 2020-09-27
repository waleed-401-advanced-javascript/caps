'use strict';

const events = require('./events');



events.on('in-transit', handleTransit);

/**
 * 
 * @param {*this item will come from the cconstructor we made to hold the fake data} item 
 */
function handleTransit(item) {
  console.log(item);
  setTimeout(() => {
        
    console.log(`Driver: delivered up ${item.payload.orderID}`,'\n',`VENDOR: thank you for delivering ${item.payload.orderID}`);
    item.event = 'delivered';
    events.emit('delivered', item);
  }, 3000);
  //     setTimeout(() =>{console.log(`Driver: picked up ${item.payload.orderID}`),1000})
    
    
}

events.on('delivered', handleDeliver);

/**
 * 
 * @param {*this will take the same item with delivered as an event} item 
 */
function handleDeliver(item) {
  console.log(item);
  console.log(`...`);
}

