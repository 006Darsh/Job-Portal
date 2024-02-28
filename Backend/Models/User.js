const mongoose = require("mongoose");
const CompanyProfile = require("./Company");
const ApplicantProfile = require("./Applicant");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Company", "Applicant"],
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "role",
  },
});

const User = mongoose.model("User", userSchema);
User.discriminator("Company", CompanyProfile);
User.discriminator("Applicant", ApplicantProfile);
module.exports = User;
