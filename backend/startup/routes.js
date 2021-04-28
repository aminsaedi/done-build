const express = require("express");
const payments = require("../routes/payments");
const receivers = require("../routes/receiver");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/payments", payments);
  app.use("/api/receivers", receivers);
  app.use("/api/user", users);
  app.use("/api/auth", auth);
};
