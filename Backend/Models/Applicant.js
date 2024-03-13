const mongoose = require("mongoose");

const applicantProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  education: [
    {
      degree: { type: String, required: true },
      fieldOfStudy: { type: String, required: true },
      university: { type: String, required: true },
      graduationYear: { type: Number, required: true },
    },
  ],
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  skills: [{ type: String }],
  resume: { type: String },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  recomndations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ApplicantProfile = mongoose.model("Applicant", applicantProfileSchema);
module.exports = ApplicantProfile;
