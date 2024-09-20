const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
