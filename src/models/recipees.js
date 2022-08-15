const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipees = new Schema({
  name: String,
  serve_time: String,
  user_id: String,
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, required: false },
  cover_image_id: String,
});

const model = mongoose.model("Recipees", recipees);

module.exports = model;
