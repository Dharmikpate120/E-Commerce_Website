const mongoose = require("mongoose");
const { Schema } = mongoose;

var model = new Schema({
  FirmName: {
    type: String,
    require: true,
  },
  FirmAddress: {
    type: String,
    require: true,
  },
  FirmPhone: {
    type: String,
    require: true,
  },
  FirmEmail: {
    type: String,
    require: true,
  },
  GSTNo: {
    type: String,
    require: true,
  },
  LogoName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  seller_id: {
    type: String,
    require: true,
  },
});

const SellerData =
  mongoose.models.sellerdata || mongoose.model("sellerdata", model);
module.exports = SellerData;
