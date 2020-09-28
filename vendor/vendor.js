'use strict';
const faker = require('faker');
require('dotenv').config();
// const inquirer = require('inquirer');

const net = require('net');
const client = new net.Socket();
const host =  process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;



function Event(eventType){
  this.event = eventType;
  this.time =  faker.date.recent();
  this.payload = new Payload;
}

function Payload(){
  this.store = process.env.StoreName;
  this.orderID = faker.random.uuid();
  this.firstName = faker.name.firstName();
  this.address = faker.address.city();
}


function handleOrder(){
  let item = new Event('pickup');
  let sentPickUp = JSON.stringify(item);
  client.write(sentPickUp);

}

setInterval(handleOrder,5000);

client.connect(port, host, ()=> {
  console.log(' Connected to Server! ..');
});

client.on('data', function(data) {
  let jsonData = JSON.parse(data);
  if (jsonData.event === 'delivered'){
    setTimeout(()=> {console.log(`Thank delivered ${jsonData.payload.orderID}`);});
  }
});




