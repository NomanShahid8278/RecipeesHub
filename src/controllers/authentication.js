const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/users");
const Token = require("../models/token");
const {
  userRegister,
  login,
  forgot_Password,
  reset_Password,
} = require("../validations/authentication");
const sendMail = require("../utilities/sendMail");

const resgisterUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  //   Validating Data
  const { error } = userRegister.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   Checking if User already exist
  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res
      .status(400)
      .send({ message: "User already exist with same email" });

  // Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Saving User
  const user = new User({
    username,
    fullname,
    email,
    password: hashedPassword,
  });

  try {
    const saveUser = await user.save();
    const { _id, username, fullname, email } = saveUser;
    const returningUser = { _id, username, fullname, email };
    res.send(returningUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //   Validating Data
  const { error } = login.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  //   Checking if User is valid
  const validUser = await User.findOne({ email: email });
  if (!validUser) return res.status(400).send({ message: "Email is invalid" });

  // Checking Password belong to the user
  const validPassword = await bcrypt.compare(password, validUser.password);
  if (!validPassword)
    return res.status(400).send({ message: "Password is wrong" });

  // Assigning JWT
  const token = jwtToken.sign({ id: validUser._id }, process.env.TOKEN_KEY);
  res.header("auth-token", token).send({ message: "Login Successfull" });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //   Validating Data
    const { error } = forgot_Password.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //   Checking if User is valid
    const validUser = await User.findOne({ email: email });
    if (!validUser)
      return res.status(400).send({ message: "Email is not found" });

    let token = await Token.findOne({ userId: validUser._id });
    if (!token) {
      token = await new Token({
        userId: validUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `${process.env.FRONT_END_URL}/resetPassword/${validUser._id}/${token.token}`;
    await sendMail(validUser.email, "Password Reset", link);
    res.send({ message: "Password reset link send to your email address" });
  } catch (error) {
    res.status(400).send({ message: "An error Occured" });
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, userId, resetToken } = req.body;

    //   Validating Data
    const { error } = reset_Password.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validating User
    const validUser = await User.findById(userId);
    if (!validUser)
      return res.status(400).send({ message: "Invalid link or expired" });
    const token = await Token.findOne({
      userId: validUser._id,
      token: resetToken,
    });
    if (!token)
      return res.status(400).send({ message: "Invalid link or expired" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    validUser.password = hashedPassword;

    await validUser.save();
    await token.delete();

    res.send({ message: "Password updated successfully" });
  } catch (error) {
    res.send({ message: "An error occured" });
    console.log(error);
  }
};

module.exports = {
  resgisterUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
