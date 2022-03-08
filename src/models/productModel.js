const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["enquired", "pending", "resolved"],
      default: "enquired",
    },
    productName: { type: String, required: true },
    productQuantity: { type: Number, max: 100, min: 1, required: true },
    productDescription: { type: String, required: true },
    remarks: { type: String },
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
