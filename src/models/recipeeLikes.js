const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeLikes = new Schema({
  recipee_id: String,
  user_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("RecipeLikes", recipeLikes);

module.exports = model;
