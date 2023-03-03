const express = require("express");
const app = express();
const path = require("path");
//integrate Mongoose
const mongoose = require("mongoose");
//Remember to run Mongo in the background
const methodOverride = require("method-override");

// require model from product.js
const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Add home page
app.get("/", (req, res) => {
  res.render("home"); //neglect .ejs
});

// Add product index route
app.get("/products", async (req, res) => {
  const products = await Product.find({}); //we swait some mongoose operation lik find/update/delete
  // let respond with a template
  res.render("products/index", { products }); //it is possible to neglect .ejs at the end of index
});

// Add a route for add new product and render a form
app.get("/products/new", (req, res) => {
  res.render("products/new"); //neglect .ejs
});

//Set up route to submit add product form
app.post("/products", async (req, res) => {
  // when we want information from post request body
  // we don't have access to request body immediately-it is UNDEFINED-it's not going to be parsed
  // we need to tell express to use that middleware
  // app.use(express.urlencoded({ extended: true }));
  const newProduct = new Product(req.body);
  // (req.body)={ name: 'onion', price: '1', category: 'vegetable' }
  await newProduct.save();
  res.redirect(`/products/${newProduct.id}`);
});

// route for editing product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params; //destructuring object
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

//route for updating form - USE method-override HELP:
// npm install method-override
// var methodOverride = require('method-override')
// app.use(methodOverride('X-HTTP-Method-Override'))
// <form action="/products/<%= product._id %>?_method=PUT" method="POST"> in edit.ejs
app.put("/products/:id", async (req, res) => {
  const { id } = req.params; //destructuring object
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// Add product details route
// we cannot use the name of products for finding process, due to the similarity and more inportance for spaces inside the names, it is not safe for url that includes space.
// we also should use a url that be unique and somehow readable for human. slugify
// Composing a short but descriptive slug for a URL of the web page can positively affect your page's SEO
// we ignore slugify here. OK!!!
app.get("/products/:id", async (req, res) => {
  const { id } = req.params; //destructuring object
  const product = await Product.findById(id);
  // render a template
  res.render("products/show", { product }); //neglect .ejs
});

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
}); //to test that nodemon index.js
