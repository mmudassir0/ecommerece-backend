const Order = require("../model/order");
const Product = require("../model/product");
const jwt = require("jsonwebtoken");
const { getAllProduct } = require("./product");
const Cart = require("../model/cart");
const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId",
      price
    );
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      userId: req.user._Id,
      products: cart.products,
      totalAmount: cart.totalAmount,
      orderStatus: "Pending",
    });
    cart.products = [];
    cart.totalAmount = 0;

    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json({ allOrders });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate(
      "products.productId",
      "name price"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};
const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  try {
    const updateOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updateOrder });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};
const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    await Order.findByIdAndDelete({ _id: id }, req.body);
    res.status(200).json({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
