const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ApplicantProfile",
    required: true,
  },
  coverletter: {
    type: String,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
