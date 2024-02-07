const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  requiredSkills: [{ type: String }],
  experienceLevel: {
    type: String,
    enum: ["entry-level", "mid-level", "senior"],
  },
  educationRequirements: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

module.exports = JobPosting;
