const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  productId: String,
  productName: String,
  quantity: Number,
  price: Number,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
