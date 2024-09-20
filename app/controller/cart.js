const Product = require("../model/product");
const Cart = require("../model/cart");
const createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        products: [{ productId, quantity }],
        totalAmount: product.price * quantity,
      });
    } else {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      cart.totalAmount += product.price * quantity;
    }

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne(req.user._id).populate(
      "product.productId",
      "name, price"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const productInfo = await Product.findById(productId);
    cart.totalAmount -= product.quantity * productInfo.price;
    product.quantity = quantity;
    cart.totalAmount += product.quantity * productInfo.price;

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};
const deleteCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove product and recalculate total amount
    const productInfo = await Product.findById(productId);
    cart.totalAmount -=
      cart.products[productIndex].quantity * productInfo.price;
    cart.products.splice(productIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};

module.exports = {
  createCart,
  deleteCart,
  getCart,
  updateCart,
};
