const speakeasy = require("speakeasy");

exports.sendOTP = async (email) => {
  const otp = speakeasy.totp({
    secret: email + process.env.OTPSEC,
    digits: 6,
  });
  try {
    const mailRes = await sendMail(
      email,
      "OTP verification",
      "Your One-time password is: " + otp
    );
    console.log("Email response:", mailRes);
    return mailRes;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
    }
};

exports.verifyOTP = (email, otp) => {
  const is_verified = speakeasy.totp.verify({
    secret: email + process.env.OTPSEC,
    token: otp,
    window: 2,
    encoding: "ascii",
  });

  console.log("otp : " + otp + " is_verified : " + is_verified);

  return is_verified;
};
