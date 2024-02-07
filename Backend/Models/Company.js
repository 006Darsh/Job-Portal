const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  email: {
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

const Company = mongoose.model("Company", companyProfileSchema);
module.exports = Company;
