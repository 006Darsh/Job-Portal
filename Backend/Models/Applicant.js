const mongoose = require("mongoose");

const applicantProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactInfo: {
    type: String,
  },
  educationHistory: [
    {
      degree: { type: String },
      institution: { type: String },
      graduationYear: { type: Number },
    },
  ],
  workExperience: [
    {
      jobTitle: { type: String },
      company: { type: String },
      duration: { type: String },
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  locationPreferences: {
    type: String,
  },
  jobPreferences: {
    desiredJobTitle: { type: String },
    industry: { type: String },
    type: {
      type: String,
      enum: ["Work From Home", "At Office", "Hybrid"],
    },
    salaryRange: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Applicant = mongoose.model("Applicant", applicantProfileSchema);
module.exports = Applicant;
