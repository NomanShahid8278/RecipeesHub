const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let comments = new Schema({
  comment: String,
  recipee_id: String,
  user_id: String,
  parent_comment_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("Comments", comments);

module.exports = model;
