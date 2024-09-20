const express = require("express");
const { isAdmin } = require("../../middleware");
const {
  createCart,
  getCart,
  deleteCart,
  updateCart,
} = require("../controller/cart");
const cartRoute = express.Router();

cartRoute
  .route("/")
  .post(createCart)
  .get(isAdmin, getCart);

cartRoute
  .route("/")
  .patch(isAdmin, updateCart)
  .delete(isAdmin, deleteCart);

module.exports = cartRoute;
