const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeeImages = new Schema({
  image_url: String,
  recipee_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("RecipeeImages", recipeeImages);

module.exports = model;
