const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const crypto = require("crypto");

const Recipee = require("../models/recipees");

// Create Recipee
const createRecipees = async (req, res) => {
  res.send("Reached");
};

module.exports = {
  createRecipees,
};
