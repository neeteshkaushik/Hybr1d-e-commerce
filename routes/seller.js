const express = require("express");
const { createProducts } = require("../services/product.service");
const { createCatalog } = require("../services/catalog.service");
const { getOrdersByQuery } = require("../services/order.service");
const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await getOrdersByQuery({ seller: req.user.userId });
    res.json(orders);
  } catch (error) {
    console.error(`ERROR: List of orders failed: ${error}`);
    res.status(500).json({ message: "Failed to get list of orders" });
  }
});

router.post("/create-catalog", async (req, res) => {
  try {
    if (req.user.type !== "seller")
      return res.status(403).json({ message: "Only sellers can create catalog" });

    let products = req.body.products;
    products = products.map((product) => {
      product.seller = req.user.userId;
      return product;
    });
    const createdProducts = await createProducts(req.body.products);
    const productIds = createdProducts.map((product) => product._id);
    await createCatalog(req.user.userId, productIds);
    res.json({ message: "Catalog created successfully" });
  } catch (error) {
    console.error(`ERROR: Catalog creation failed: ${error}`);
    res.status(500).json({ message: "Catalog creation failed" });
  }
});

module.exports = router;
