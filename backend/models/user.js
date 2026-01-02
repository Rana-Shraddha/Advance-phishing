
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String, // plaintext ONLY for demo (mention in viva)
  otp: String,
  otpExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
