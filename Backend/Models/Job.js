const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    default: [],
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  employmentType: {
    type: String,
  },
  experienceLevel: {
    type: String,
  },
  educationLevel: {
    type: String,
  },
  location: {
    type: String,
  },
  salaryRange: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  applicationDeadline: {
    type: Date,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
