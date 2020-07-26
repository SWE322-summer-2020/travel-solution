const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");

const dummy = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Field is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    lower: true,
    unique: true,
  },
  verificationToken: {
    type: String,
    select: false,
  },
});

let token;
dummy.pre("save", function(next) {
  token = crypto.randomBytes(32).toString("hex");
  this.verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  next();
});

dummy.methods.getVerifyToken = function() {
  return token;
};

const DummyUser = mongoose.model("DummyUser", dummy);
module.exports = DummyUser;
