const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  companyName: {
    type: String,
    required: true,
  },
  company_email: {
    type: String,
    required: true,
    unique: true,
  },
  industry: {
    type: String,
    required: true,
  },
  companySize: {
    type: String,
  },
  location: {
    type: String,
  },
  contactInfo: {
    type: String,
  },
  companyDescription: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CompanyProfile = mongoose.model("Company", companyProfileSchema);
module.exports = CompanyProfile;
