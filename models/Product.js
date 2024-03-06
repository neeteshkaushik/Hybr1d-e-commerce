const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// combination of name and catalog should be unique, as a seller should not be able to add the same product to the same catalog
productSchema.index({ name: 1, seller: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);
