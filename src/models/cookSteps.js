const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let cookSteps = new Schema({
  step: String,
  description: String,
  video_url: String,
  video_title: String,
  recipee_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("CookSteps", cookSteps);

module.exports = model;
