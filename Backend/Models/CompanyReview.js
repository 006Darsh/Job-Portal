const mongoose = require("mongoose");

const companyReviewSchema = new mongoose.Schema({
  reviewer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ApplicantProfile",
    required: true,
  },
  reviewed_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyProfile",
    required: true,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const CompanyReview = mongoose.model("CompanyReview", companyReviewSchema);
module.exports = CompanyReview;
