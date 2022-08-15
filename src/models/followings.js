const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let followings = new Schema({
  follower_id: String,
  following_id: String,
  inserted_at: Date,
  updated_at: Date,
});

const model = mongoose.model("Followings", followings);

module.exports = model;
