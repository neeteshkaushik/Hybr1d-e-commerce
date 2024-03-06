const Catalog = require("../models/Catalog");

async function createCatalog(sellerId, products) {
  try {
    const catalog = new Catalog({ seller: sellerId, products });
    await catalog.save();
    console.log(`Catalog created successfully`);
  } catch (error) {
    console.error(`ERROR: Catalog creation failed: ${error}`);
    throw error;
  }
}

async function getCatalogBySellerId(sellerId) {
  try {
    const catalog = await Catalog.findOne({ seller: sellerId }).populate(
      "products"
    );
    return catalog;
  } catch (error) {
    console.error(`ERROR: Catalog retrieval failed: ${error}`);
    throw error;
  }
}

module.exports = { createCatalog, getCatalogBySellerId };
