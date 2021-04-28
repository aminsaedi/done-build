const mongoose = require("mongoose");

const ReceiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Receiver = new mongoose.model("receiver", ReceiverSchema);
module.exports.ReceiverSchema = ReceiverSchema;
module.exports.Receiver = Receiver;
