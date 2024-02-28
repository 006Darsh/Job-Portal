const User = require("../Models/User");

exports.UserSignUp = async (req, res) => {
  const { username, email, password, cfmpassword, role } = req.body;
  const exist = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (exist) {
    return res.status(400).send({
      success: false,
      message: "User with this Username or email already exists.",
    });
  }
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
    user_name: user_name,
    email: email,
    password: hashedPassword,
    role: role,
  });
  await newUser.save();
  const payload = {
    _id: newUser._id,
    user_name: newUser.user_name,
    email: newUser.email,
    password: newUser.password,
    role: newUser.role,
  };

  const authToken = genToken(payload);
  try {
    await sendOTP(email);
    res.status(200).send({ success: true, message: "OTP sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error sending OTP !!!" });
  }

  res.status(200).send({
    success: true,
    result: authToken,
    _id: newUser._id,
    user_name: newUser.user_name,
    email: newUser.email,
    role: newUser.role,
  });
};
