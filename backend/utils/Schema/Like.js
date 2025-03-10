const mongoose = require("mongoose");
const { Schema } = mongoose;

var model = new Schema({
  email: {
    type: String,
    require: true,
  },
  product_id: {
    type: [String],
    require: true,
  },
});

const Like = mongoose.models.like || mongoose.model("like", model);
module.exports = Like;
