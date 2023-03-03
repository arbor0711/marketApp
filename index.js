const express = require("express");
const app = express();
const path = require("path");
//integrate Mongoose
const mongoose = require("mongoose");
//Remember to run Mongo in the background

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

// Add product index route
app.get("/products", async (req, res) => {
  const products = await Product.find({}); //we swait some mongoose operation lik find/update/delete
  // let respond with a template
  res.render("products/index", { products }); //it is possible to neglect .ejs at the end of index
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
