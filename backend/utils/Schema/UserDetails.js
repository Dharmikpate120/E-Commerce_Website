const mongoose = require("mongoose");
const { Schema } = mongoose;

var data = new Schema({
  email: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  address: {
    type: String,
  },
  mobilenumber: {
    type: String,
  },
  Birthdate: {
    type: String,
  },
  Gender: {
    type: String,
  },
  seller: {
    type: String,
  },
  image: {
    type: String,
  },
});

const UserDetails =
  mongoose.models.userdetails || mongoose.model("userdetails", data);
module.exports = UserDetails;
