var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://admin:admindatabase87@cluster0.uqtso.mongodb.net/morningnews?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);
