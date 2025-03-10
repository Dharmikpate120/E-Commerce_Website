const mongoose = require("mongoose");
const { Schema } = mongoose;

var Authentication = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const authModel =
  mongoose.models.Authentication ||
  mongoose.model("Authentication", Authentication);
module.exports = authModel;
