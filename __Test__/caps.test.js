process.env.NODE_ENV = 'testing';

const {
  joinHandler, pickupHandler, inTransitHandler, deliveredHandler, logEvent,
} = require('../caps/socketHandler');

const Order = require('../vendor/models/Order');

const payLoad = new Order();

jest.spyOn(global.console, 'log');

describe('Test', () => {
  it('test joinRoom handler', () => {
    joinHandler(null, 'roomId');
    expect(console.log).toHaveBeenCalled();
  });

  it('test pickupHandler handler', () => {
    pickupHandler(null, payLoad);
    expect(console.log).toHaveBeenCalled();
  });

  it('test inTransitHandler handler', () => {
    inTransitHandler(null, payLoad);
    expect(console.log).toHaveBeenCalled();
  });

  it('test deliveredHandler handler', () => {
    deliveredHandler(null, payLoad);
    expect(console.log).toHaveBeenCalled();
  });

  it('test logEvent handler', () => {
    logEvent('event', payLoad);
    expect(console.log).toHaveBeenCalled();
  });
});