const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User } = require("../modules/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User aleready exist");
  user = new User(_.pick(req.body, ["email", "password", "name"]));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = user.generateAuthtoken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "email"]));
});

module.exports = router;
