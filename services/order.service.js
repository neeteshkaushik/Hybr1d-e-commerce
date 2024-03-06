const Order = require("../models/Order");

async function createOrder(buyerId, sellerId, products, total) {
  try {
    const order = new Order({
      buyer: buyerId,
      seller: sellerId,
      products,
      total,
    });
    await order.save();
    console.log(`Order created successfully`);
  } catch (error) {
    console.error(`ERROR: Order creation failed: ${error}`);
    throw error;
  }
}

async function getOrdersByQuery(query) {
  try {
    const orders = await Order.find(query);
    return orders;
  } catch (error) {
    console.error(`ERROR: Order retrieval failed: ${error}`);
    throw error;
  }
}

module.exports = { createOrder, getOrdersByQuery };
