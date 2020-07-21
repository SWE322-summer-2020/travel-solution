const mongoose = require("mongoose");
const validator = require("validator");

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
    max: 200,
  },
  avatar: String,
  Name: {
    type: String,
    min: 4,
    max: 20,
  },
});

const User = mongoose.model("User", userSchema);

module.export = User;
