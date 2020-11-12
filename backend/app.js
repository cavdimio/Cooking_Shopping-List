require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const Recipe = require("./models/recipe");

const app = express();

mongoose.connect("mongodb://localhost:27017/recipesDB",
                { useNewUrlParser: true,
                  useUnifiedTopology: true })
                .then(() => {
                    console.log("Connected to database!");
                })
                .catch(() => {
                  console.log("Connection failed!");
                });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.post("/recipes", (req, res, next) => {
  const recipe = new Recipe({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    imagePath: req.body.imagePath,
    ingredients: req.body.ingredients
  });

  recipe.save();

  res.status(201).json({
    message: "Recipe added sucessfully"
  });
});

app.get("/recipes", (req, res, next) => {

  Recipe.find().then(documents => {
    res.status(200).json({
      message: "Success",
      recipes: documents
    });
  });
});

module.exports = app;
