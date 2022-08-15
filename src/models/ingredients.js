const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ingredients = new Schema({
  recipee_id: String,
  description: String,
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, required: false },
});

const model = mongoose.model("Ingredients", ingredients);

module.exports = model;
