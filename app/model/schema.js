const mongoose = require("mongoose");

const USER = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const USERSchema = mongoose.model("user", USER);

module.exports = USERSchema;
