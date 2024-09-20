const mongoose = require("mongoose");
const dashboardSchema = mongoose.Schema({
  totalSales: Number,
  totalOrders: Number,
  totalProducts: Number,
  totalCustomers: Number,
  totalCategories: Number,
  orders: [],
  topSellingProducts: [],
  lowStockProducts: [],
  recentCustomers: [],
  analytics: {},
  returnRate: Number,
  feedback: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Dashboard = mongoose.model("dashboard", dashboardSchema);

module.exports = Dashboard;
