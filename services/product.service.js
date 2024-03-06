const Product = require("../models/Product");

async function createProducts(products) {
  try {
    const result = await Product.insertMany(products);
    console.log(`Products created successfully`);
    return result;
  } catch (error) {
    console.error(`ERROR: productService -> Product creation failed: ${error}`);
    throw error;
  }
}

async function getProductByQuery(query) {
  try {
    console.log(query);
    const products = await Product.findOne(query);
    return products;
  } catch (error) {
    console.error(
      `ERROR: productService -> getProductByQuery failed: ${error}`
    );
    throw error;
  }
}

module.exports = { createProducts, getProductByQuery };
