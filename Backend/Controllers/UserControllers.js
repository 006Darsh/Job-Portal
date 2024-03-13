const CompanyProfile = require("../Models/Company");
const ApplicantProfile = require("../Models/Applicant");
const User = require("../Models/User");

exports.AddApplicantProfile = async (req, res) => {
  try {
    const UserId = req.user._id;
    const {
      firstName,
      lastName,
      dateOfBirth,
      contactNumber,
      address,
      education,
      experience,
      skills,
      // resume,
    } = req.body;
    const User = await User.findById({ UserId });
    const newApplicantProfile = new ApplicantProfile({
      user_id: UserId,
      firstName,
      lastName,
      email: User.email,
      dateOfBirth,
      contactNumber,
      address,
      education,
      experience,
      skills,
      // resume
    });

    await newApplicantProfile.save();
    const updatedUser = await User.findByIdAndUpdate(
      UserId,
      { profile: newApplicantProfile._id },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).send({
      success: true,
      Applicant: newApplicantProfile,
      message: "Applicant Profile Added Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.AddCompanyProfile = async (req, res) => {
  try {
    const UserId = req.user._id;
    const {
      companyName,
      company_email,
      industry,
      companySize,
      location,
      contactInfo,
      companyDescription,
    } = req.body;
    const newCompanyProfile = new CompanyProfile({
      user_id: UserId,
      companyName,
      company_email,
      industry,
      companySize,
      location,
      contactInfo,
      companyDescription,
    });

    await newCompanyProfile.save();
    const updatedUser = await User.findByIdAndUpdate(
      UserId,
      { profile: newCompanyProfile._id },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).send({
      success: true,
      Company: newCompanyProfile,
      message: "Company Profile Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getApplicantProfile = async (req, res) => {
  try {
    const applicantId = req.params.id;
    const applicant = await ApplicantProfile.findById(applicantId);
    if (!applicant) {
      return res
        .status(404)
        .json({ success: false, message: "Applicant Profile not found." });
    }
    res.status(200).json({ success: true, Applicant: applicant });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyProfile.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company Profile not found." });
    }
    res.status(200).json({ success: true, Company: company });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.GetAllCompany = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "Applicant") {
      return res
        .status(401)
        .send({ success: false, message: "Not Authorized." });
    }
    const companies = await CompanyProfile.find(
      {},
      {
        _id: 1,
        companyName: 1,
        company_email: 1,
        industry: 1,
        companySize: 1,
        contactInfo: 1,
      }
    );
    res.status(200).json({ success: true, companies: companies });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
