const config = require("config");
module.exports = function () {
  if (!config.get("DonePrivateKey"))
    throw new Error("Jwt key is not set ! plaese set DonePrivateKey.");
  if (!config.get("db"))
    throw new Error("db variable is not set! plase set db.");
};
