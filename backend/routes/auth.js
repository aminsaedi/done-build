const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User } = require("../modules/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email and/or password is incorrenct");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Email and/or password is incorrenct");
  const token = user.generateAuthtoken();
  res.send(token).status(200);
});

module.exports = router;
