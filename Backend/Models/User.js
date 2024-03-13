const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
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
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Number,
  },
  resetTokenUsed: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
