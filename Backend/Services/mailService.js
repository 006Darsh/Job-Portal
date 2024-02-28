const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAILER,
    pass: process.env.EMAILPASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.MAILER,
      to: to,
      subject: subject,
      text: text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info.messageId);
    return { error: null, info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
