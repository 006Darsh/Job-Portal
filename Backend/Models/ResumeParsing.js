const mongoose = require("mongoose");

const resumeParsingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInformation: {
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
  skills: [{ type: String }],
  certificationsOrLicenses: [{ type: String }],
  additionalInformation: {
    type: String,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ResumeParsing = mongoose.model("ResumeParsing", resumeParsingSchema);

module.exports = ResumeParsing;
