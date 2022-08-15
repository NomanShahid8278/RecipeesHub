const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let savedRecipees = new Schema({
  user_id: String,
  recipee_id: String,
  category_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("SavedRecipees", savedRecipees);

module.exports = model;
