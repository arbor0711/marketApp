// to making a mongoose model we need mongoose require
// there is no need to connect database here, because it will be required in index.js
const mongoose = require("mongoose");

let categories = ["Fruit", "vegetable", "dairy"];
categories = categories.map((item) => item.toLowerCase()).sort();

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
    enum: categories,
  },
});

// compiling model
const Product = mongoose.model("Product", productSchema);

// export from this file
module.exports = Product;
module.exports.categories = categories;
