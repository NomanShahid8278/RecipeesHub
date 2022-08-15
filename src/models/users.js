const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let users = new Schema({
  username: String,
  age: { type: Number, required: false },
  fullname: String,
  email: String,
  password: String,
  inserted_at: { type: Date, default: Date.now },
});

const model = mongoose.model("Users", users);

module.exports = model;
