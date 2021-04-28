const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    requierd: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.methods.generateAuthtoken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    config.get("DonePrivateKey")
  );
  return token;
};

const User = new mongoose.model("user", UserSchema);

module.exports.User = User;
