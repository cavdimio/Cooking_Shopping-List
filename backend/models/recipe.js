const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true},
  //id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  ingredients: [{
    name: { type: String, required: true },
    amount: {type: Number, required: true },
  }]
});

module.exports = mongoose.model("Recipe", recipeSchema);
