var express = require("express");
var router = express.Router();
var userModel = require("../models/users");
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sign-up", async function (req, res) {
  var userExist = await userModel.findOne({
    email: req.body.emailFromFront,
  });
  // console.log(userExist);
  if (userExist) {
    res.json({ result: false, reason: "ce user est déja enregistré en base" });
  } else if (req.body.usernameFromFront == "" || req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    res.json({ result: false, reason: "vérifiez les informations saisies" });
  } else {
    var salt = uid2(32);
    var user = new userModel({
      userName: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      salt: salt,
      password: SHA256(req.body.passwordFromFront + salt).toString(encBase64),
      token: uid2(32),
    });
    user = await user.save();
  }
  let token = user.token;
  console.log(token);
  res.json({ result: true, token });
});

router.post("/sign-in", async function (req, res) {
  var userExists = await userModel.findOne({
    email: req.body.emailFromFront,
  });
  console.log(userExists);
  let token = userExists.token;
  var hash = SHA256(req.body.passwordFromFront + userExists.salt).toString(encBase64);

  if (
    userExists &&
    req.body.emailFromFront !== "" &&
    req.body.passwordFromFront !== "" &&
    hash === userExists.password
  ) {
    res.json({ result: true, token });
  } else {
    res.json({ result: false });
  }
});

router.get("/updateuser", async function (req, res, next) {});

router.put("/addlanguage", async function (req, res, next) {
  console.log(req.body);
  res.json({ message: "Addlanguage" });
});

module.exports = router;
