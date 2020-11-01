const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Recipe = require('./models/recipe');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useUnifiedTopology: true , useNewUrlParser: true});

module.exports = app;
