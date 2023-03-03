const mongoose = require("mongoose");
const Product = require("./models/product");
// Never start a file that wanna open by node with comment
// seed the database separately from the web App for development purposes.
// require the mongoose, model and connect to mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

const p = new Product({
  name: "Ruby Grapefruit",
  price: 0.99,
  category: "fruit",
});
p.save()
  .then((p) => {
    console.log(p);
  })
  .catch((err) => {
    console.log(err);
  });

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];

// pass seedProduct into insertMany
// Remember mongoose do not do this only if all items validated
// if we have validation and we fail, everything will fail to insert
Product.insertMany(seedProducts)
  // insertMany do not need to .save and do this automatically
  // However, it will take time so we need promisses
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
