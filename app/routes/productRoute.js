const express = require("express");
const { isAdmin } = require("../../middleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProduct,
} = require("../controller/product");
const productRoute = express.Router();

productRoute
  .route("/")
  .post(isAdmin, createProduct)
  .get(getAllProduct);

productRoute
  .route("/:id")
  .get(getProductById)
  .patch(isAdmin, updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = productRoute;
