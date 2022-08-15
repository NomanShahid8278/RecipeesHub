const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let cookBookCategories = new Schema({
  title: String,
  user_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("CookBookCategories", cookBookCategories);

module.exports = model;
