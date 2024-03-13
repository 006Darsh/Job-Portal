const speakeasy = require("speakeasy");
const sendMail = require("./mailService");
const generatePasswordResetEmail = require("./mails/Templates/mailForgotPassLink");

exports.sendLink = async (email, _id, resetToken, expirationTime, name) => {
  // send mail using sendMail service
  const link = `http://localhost:5000/user/reset-password/${_id}/${resetToken}/${expirationTime}`;
  try {
    const mailRes = await sendMail(
      (to = email),
      (subject = "Change Your Password"),
      (hrml = generatePasswordResetEmail(name, link, "Job-Portal"))
    );

    console.log("Email response:", mailRes);
    return mailRes;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
