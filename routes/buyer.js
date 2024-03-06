const express = require("express");
const { getUsersByQuery } = require("../services/user.service");
const { getCatalogBySellerId } = require("../services/catalog.service");
const { getProductByQuery } = require("../services/product.service");
const { createOrder } = require("../services/order.service");
const router = express.Router();

router.get("/list-of-sellers", async (req, res) => {
  try {
    const sellers = await getUsersByQuery({ type: "seller" });
    res.json(sellers);
  } catch (error) {
    console.error(`ERROR: List of sellers failed: ${error}`);
    res.status(500).send("List of sellers failed");
  }
});

router.get("/seller-catalog/:seller_id", async (req, res) => {
  try {
    const catalog = await getCatalogBySellerId(req.params.seller_id);
    res.json(catalog);
  } catch (error) {
    console.error(`ERROR: Catalog retrieval failed: ${error}`);
    res.status(500).send("Catalog retrieval failed");
  }
});

router.post("/create-order/:seller_id", async (req, res) => {
  try {
    if (req.user.type !== "buyer")
      return res.status(403).json({ message: "Only buyers can create orders" });
    let total = 0;
    let products = req.body.products;
    for (let i = 0; i < products.length; i++) {
      const productDeatils = await getProductByQuery({
        _id: products[i].productId,
      });
      console.log(
        `purchsing ${products[i].quantity} ${productDeatils.name} at ${productDeatils.price}`
      );
      total += productDeatils.price * products[i].quantity;
    }

    await createOrder(req.user.userId, req.params.seller_id, products, total);

    res.json({ message: "Order created successfully" });
  } catch (error) {
    console.error(`ERROR: Order creation failed: ${error}`);
    res.status(500).json({ message: "Order creation failed" });
  }
});

module.exports = router;
