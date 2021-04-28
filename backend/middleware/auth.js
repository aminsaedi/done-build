const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("No token provided.");
  try {
    const decode = jwt.verify(token, config.get("DonePrivateKey"));
    req.user = decode;
    next();
  } catch (error) {
    res.send("Invalid token.").status(401);
  }
};
