const jwt = require("jsonwebtoken");
const Product = require("../model/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, images, stock } = req.body;
    let token = req.header("Authorization");
    token = token.split("Bearer ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    await Product.create({
      name,
      description,
      category,
      price,
      images,
      stock,
      userId: verifyToken.userId,
    });
    res.status(201).json("product created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { name, description, category, price, images, stock } = req.body;
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res
    .status(203)
    .json({ message: "product updated successfully", updatedProduct });
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete({ _id: id });
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully" });
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
