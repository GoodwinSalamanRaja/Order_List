const mongoose = require("mongoose");
const schema = mongoose.Schema;

const order = new schema(
  {
    grandTotal: { type: String, required: true },
    coupon: { type: String, required: true },
    discountPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", order);