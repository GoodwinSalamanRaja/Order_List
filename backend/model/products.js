const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product = new schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    totalPrice:{type:String,required:true},
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:"orders"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", product);