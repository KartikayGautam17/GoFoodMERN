import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_details: {
    type: Array,
    required: true,
  },

  time: {
    type: String,
    default: Date().toString(),
  },
});

export default mongoose.model("Orders", OrdersSchema);
