const authentication = require("../controllers/authentication");
const recipees = require("../controllers/recipee");

module.exports = (app) => {
  // Authentication
  app.route("/register").post(authentication.resgisterUser);
  app.route("/login").post(authentication.loginUser);
  app.route("/forgot-password").post(authentication.forgotPassword);
  app.route("/reset-password").post(authentication.resetPassword);

  // Recipees
  app.route("/create-recipee").post(recipees.createRecipees);
};
