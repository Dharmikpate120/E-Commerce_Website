const mongoose = require("mongoose");
const { Schema } = mongoose;

var model = new Schema({
  email: {
    type: String,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  product_id: {
    type: String,
    require: true,
  },
  image: {
    type: [String],
    require: true,
  },
});

const Product = mongoose.models.product || mongoose.model("product", model);
module.exports = Product;
