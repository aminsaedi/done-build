const express = require("express");
const { Receiver } = require("../modules/receiverSchema");
const { Payments } = require("../modules/paymentsSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  const receivers = await Receiver.find().sort("name");
  res.send(receivers);
});

router.get("/withTotal", async (req, res) => {
  let receivers = await Receiver.find().sort("name");
  for (let i = 0; i < receivers.length; i++) {
    const thatReceiver = await Payments.find({ receiver: receivers[i] });
    let totalPrice = 0;
    thatReceiver.forEach((payment) => (totalPrice += payment.price));
    let chache = { ...receivers[i]._doc, total: totalPrice };
    receivers[i] = chache;
  }
  res.send(receivers);
});

router.post("/", async (req, res) => {
  let receiver = new Receiver({
    name: req.body.name,
  });
  receiver = await receiver.save();
  res.send(receiver);
});

router.delete("/:id", async (req, res) => {
  const result = await Receiver.deleteOne({ _id: req.params.id });
  if (!result) res.status(404).send("Receiver not found");
  res.status(200).send(result);
});

module.exports = router;
