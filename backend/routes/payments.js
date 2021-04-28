const express = require("express");

const auth = require("../middleware/auth");
const delay = require("../middleware/delay");
const { Payments } = require("../modules/paymentsSchema");

const router = express.Router();

router.get("/", delay, async (req, res) => {
  const payments = await Payments.find().sort("-date");
  res.send(payments);
});
router.post("/", auth, async (req, res) => {
  let payment = new Payments({
    receiver: req.body.receiver,
    price: req.body.price,
    date: req.body.date,
    isCheque: req.body.isCheque,
    description: req.body.description,
  });
  payment = await payment.save();
  res.send(payment).status(201);
});
router.delete("/:id", async (req, res) => {
  const payment = await Payments.deleteOne({ _id: req.params.id });
  if (!payment) res.send("Nothing to delte").status(404);
  res.send(payment).status(200);
});

router.get("/cheques", async (req, res) => {
  const cheques = await Payments.find({ isCheque: true });
  if (!cheques) res.status(404).send("Nothing to display");
  res.status(200).send(cheques);
});

router.post("/filter", async (req, res) => {
  let filtered = await Payments.find().sort("-date");
  if (req.body.from && req.body.to && !req.body.receiver) {
    filtered = await Payments.find({
      date: { $gte: req.body.from, $lte: req.body.to || Date.now() },
    });
  } else if (req.body.receiver) {
    filtered = await Payments.find({
      receiver: req.body.receiver,
    }).sort("-date");
  } else if (req.body.receiver && req.body.from && req.body.to) {
    filtered = await Payments.find({
      date: { $gte: req.body.from, $lte: req.body.to || Date.now() },
      receiver: req.body.receiver,
    }).sort("-date");
  } else filtered = await Payments.find().sort("-date");
  let priceSum = 0;
  filtered.forEach((payment) => (priceSum += payment.price));
  res.send({ filtered, priceSum });
});

router.delete("/:id", async (req, res) => {
  const result = await Payments.deleteOne({ _id: req.params.id });
  if (!result) res.status(404).send("Nothing to delte");
  res.send(result).status(200);
});

module.exports = router;
