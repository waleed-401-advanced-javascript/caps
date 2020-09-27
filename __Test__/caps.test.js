const events = require('../events');
require('../caps');
require('../driver');
let item = {
  event: 'pickup',
  time: '2020202020202',
  payload:
{
  store: 'Novmber rain',
  orderID: 'c3eec4dcb-85312c',
  firstName: 'barham',
  address: 'atlas',
},
};
it('should log pickup', () => { 
  console.log = jest.fn(); 
  events.emit('pickup', item);  
  expect(console.log).toHaveBeenCalledTimes(1);});
it('should log in-transit', () => {
  console.log = jest.fn();
  events.emit('in-transit', item);  
  expect(console.log).toHaveBeenCalledTimes(1);});
it('should log delivered', () => {
  console.log = jest.fn();  
  events.emit('delivered', item); 
  expect(console.log).toHaveBeenCalledTimes(2);});