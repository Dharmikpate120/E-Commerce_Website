const mongoose = require("mongoose");
const { Schema } = mongoose;

var model = new Schema({
  email: {
    type: String,
    require: true,
  },
  product_id: {
    type: [
      {
        id: { type: String, require: true },
        count: { type: String, require: true },
      },
    ],
    require: true,
  },
});

const Cart = mongoose.models.cart || mongoose.model("cart", model);
module.exports = Cart;
