const jwt = require("jsonwebtoken");
const jwt_sec = process.env.JWT_SEC;
const User = require("../Models/User");

module.exports = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Token not found !!!" });
  }

  try {
    const { type, _id } = jwt.verify(token, jwt_sec);
    console.log("_id: " + _id + " type: " + type);

    try {
      const user = await User.findOne({ _id }, { _id: 1, role: 1 });
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized." });
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. Not Authorized." });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server internal error" });
  }
};
