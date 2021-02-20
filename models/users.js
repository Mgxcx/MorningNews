var mongoose = require("mongoose");

var wishlistSchema = mongoose.Schema({
  image: String,
  title: String,
  content: String,
  description: String,
});

var userSchema = mongoose.Schema({
  myarticles: [wishlistSchema],
  userName: String,
  email: String,
  salt: String,
  password: String,
  token: String,
});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
