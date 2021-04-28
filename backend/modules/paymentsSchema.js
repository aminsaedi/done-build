const mongoose = require("mongoose");
const { ReceiverSchema } = require("./receiverSchema");

const PaymentsSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  receiver: {
    type: ReceiverSchema,
  },
  isCheque: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const Payments = new mongoose.model("payment", PaymentsSchema);
module.exports.Payments = Payments;
