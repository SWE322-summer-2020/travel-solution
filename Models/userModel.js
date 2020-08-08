const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: 4,
    unique: true,
    required: [true, "Username field is required"],
  },
  email: {
    type: String,
    unique: [true, "This email already exist"],
    lowercase: true,
    required: [true, "Email field is required"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    min: [6, "Minimum 6 charecter"],
    max: [20, "Maximum 20 charecter"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password field is required"],
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: "Passwords did not matched",
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetTokenExp: Date,
  activeStatus: {
    type: Boolean,
    default: true,
    select: false,
  },
  bio: {
    type: String,
    maxLength: [200, "Maximum length 200 charecter"],
    trim: true,
  },
  avatar: String,
  name: {
    type: String,
    minLength: [4, "Minumum length 4 cherecter"],
    maxLength: [20, "Maximum length 20 charecter"],
  },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});
userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExp = Date.now() + 600000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
