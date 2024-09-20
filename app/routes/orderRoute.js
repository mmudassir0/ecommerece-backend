const express = require("express");
const { isAdmin } = require("../../middleware");
const {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require("../controller/order");
const orderRoute = express.Router();

orderRoute
  .route("/")
  .post(createOrder)
  .get(isAdmin, getAllOrder);

orderRoute
  .route("/:id")
  .get(getOrderById)
  .patch(isAdmin, updateOrderById)
  .delete(isAdmin, deleteOrderById);

module.exports = orderRoute;
