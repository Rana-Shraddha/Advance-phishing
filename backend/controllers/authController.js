const User = require("../models/User");

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Register + Send OTP
exports.registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({ message: "Invalid mobile number" });
  }

  const otp = generateOTP();

  const user = new User({
    name,
    email,
    mobile,
    password,
    otp,
    otpExpires: Date.now() + 2 * 60 * 1000 // 2 minutes
  });

  await user.save();

  console.log("OTP (Simulation):", otp); // shown in console

  res.json({
    message: "OTP sent (simulation)",
    otp // ⚠️ expose ONLY for demo
  });
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({ mobile });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "OTP verified successfully" });
};

