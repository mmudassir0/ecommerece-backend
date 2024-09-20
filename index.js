const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./app/routes/userRoutes");
const productRoute = require("./app/routes/productRoute");
const { protectedRoute, isAdmin } = require("./middleware");
const orderRoute = require("./app/routes/orderRoute");
const cartRoute = require("./app/routes/cartRoute");

const app = express();
const port = process.env.PORT;
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/e-commerece");
mongoose.connection.on("connected", () => console.log("db connected"));

app.use("/", router);
app.use("/product", protectedRoute, productRoute);
app.use("/order", protectedRoute, orderRoute);
app.use("/cart", protectedRoute, cartRoute);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
