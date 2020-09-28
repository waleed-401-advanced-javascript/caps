'use strict';

const net = require('net');

const client = new net.Socket(); // create a socket connection 
// connect it to server.js : localhost port: 4000;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

client.connect(port, host, ()=> {
  console.log('connecting .............. ');
});

client.on('data', (data)=> {
  let jsonData = JSON.parse(data);
  if (jsonData.event === 'pickup'){
    setTimeout(()=> {console.log(`Driver: picking up ${jsonData.payload.orderID}`);
      jsonData.event = 'in-transit';
      let trans = JSON.stringify(jsonData);
      client.write(trans);},1000);}
  if(jsonData.event ==='in-transit'){
    setTimeout(()=>{
      jsonData.event = 'delivered';
      let delivered = JSON.stringify(jsonData);
      console.log(`delivered${jsonData.payload.orderID}`);
      client.write(delivered);},3000);
    
  }
 
});

client.on('close', function () {
  console.log('connection is closed!!');
});

