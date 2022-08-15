const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeeTags = new Schema({
  recipee_id: String,
  tag_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("RecipeeTags", recipeeTags);

module.exports = model;
