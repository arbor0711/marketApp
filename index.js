const express = require("express");
const app = express();
const path = require("path");
//integrate Mongoose
const mongoose = require("mongoose");
//Remember to run Mongo in the background
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Add basic routes
app.get("/dog", (req, res) => {
  res.send("woof");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
}); //to test that nodemon index.js
