// to making a mongoose model we need mongoose require
// there is no need to connect database here, because it will be required in index.js
const mongoose = require("mongoose");

// make Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
});

// compiling model
const Product = mongoose.model("Product", productSchema);

// export from this file
module.exports = Product;
