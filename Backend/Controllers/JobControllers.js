const CompanyProfile = require("../Models/Company");
const Job = require("../Models/Job");

exports.CreateJob = async (req, res) => {
  try {
    const UserId = req.user._id;
    const role = req.user.role;
    if (role === "Company") {
      const {
        title,
        description,
        requirements,
        responsibilities,
        employmentType,
        experienceLevel,
        educationLevel,
        location,
        salaryRange,
        applicationDeadline,
      } = req.body;
      const companyId = await CompanyProfile.findOne(
        { user_id: UserId },
        { _id: 1 }
      );
      const newJob = new Job({
        company_id: companyId,
        title,
        description,
        requirements,
        responsibilities,
        employmentType,
        experienceLevel,
        educationLevel,
        location,
        salaryRange,
        applicationDeadline,
      });
      await newJob.save();
      return res.status(200).send({
        success: true,
        Job: newJob,
        message: "New Job Added Successfully",
      });
    } else {
      return res
        .status(401)
        .send({ success: false, message: "Not Authorized." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.GetAllJobs = async (req, res) => {
  try {
    var jobs = await Job.find(
      {},
      {
        title: 1,
        description: 1,
        requirements: 1,
        responsibilities: 1,
        employmentType: 1,
        experienceLevel: 1,
        educationLevel: 1,
        location: 1,
        salaryRange: 1,
        applicationDeadline: 1,
        company_id: 1,
      }
    ).populate("company_id", "companyName company_email");
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "company_id",
      select: "companyName company_email industry companySize location",
    });
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job details not found." });
    }
    res.status(200).json({ success: true, jobDetails: job });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
