const faker = require('faker');

const storeName = process.env.STORE_NAME;

class Order {
  /**
   * @class Order
   * @prop storeName
   * @prop orderId
   * @prop customerName
   * @prop address
   */
  constructor() {
    this.storeName = storeName;
    this.orderId = faker.random.uuid();
    this.customerName = faker.name.findName();
    this.address = faker.address.city();
  }
}

module.exports = Order;