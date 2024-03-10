const User = require("../Models/User");
const bcrypt = require("bcrypt");
const genToken = require("../Services/jwtTokenService");
const { verifyOTP, sendOTP } = require("../Services/otpService");

exports.UserSignUp = async (req, res) => {
  try {
    const { username, email, password, cfmpassword, role, otp } = req.body;

    const exist = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "User with this Username or email already exists.",
      });
    }
    const is_verified = verifyOTP(email, otp);
    if (is_verified) {
      if (password !== cfmpassword) {
        return res.status(400).send({
          success: false,
          message: "Password and Confirm Password do not match.",
        });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Save the user data to the User schema
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
      });
      await newUser.save();
      const payload = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      };

      const authToken = genToken(payload);

      res.status(200).send({
        success: true,
        result: authToken,
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      });
    } else res.status(400).send({ success: false, message: "Wrong OTP" });
  } catch (error) {
    console.error("Error in UserSignup:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while registering the user.",
    });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email address is not registered",
      });
    }
    console.log(user.email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const authToken = genToken(payload);
      res.status(200).send({
        success: true,
        result: authToken,
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Not able to Login - Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in UserLogin:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while loging in the user.",
    });
  }
};

exports.UserSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    try {
      await sendOTP(email);
      res.status(200).send({ success: true, message: "OTP sent" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Error sending OTP !!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Verfying the email.",
    });
  }
};
