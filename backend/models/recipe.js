const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: String,
  description: String,
  ingredients: [{ name: String, amount: Number }]
});

module.exports = mongoose.model('Recipe', recipeSchema);
