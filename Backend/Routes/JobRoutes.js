const {
  CreateJob,
  GetAllJobs,
  getJobDetails,
} = require("../Controllers/JobControllers");
const AuthMiddlewares = require("../Middlewares/AuthMiddlewares");

const JobRoutes = (app) => {
  app.post("/job/create-job", AuthMiddlewares, CreateJob);
  app.put("/job/edit-job/:id", AuthMiddlewares);
  app.delete("/job/remove-job/:id", AuthMiddlewares);
  app.get("/job/alljobs", GetAllJobs);
  app.get("/job/:id", getJobDetails);
  app.post("/job/applyforjob/:jobid", AuthMiddlewares);
  app.post("/job/company/change-status/:applicationid", AuthMiddlewares);
  app.get("/job/yourappliedjobs", AuthMiddlewares);
  // app.post("/job/search");
  // app.get("/job/recommendations/:id", AuthMiddlewares);
};

module.exports = JobRoutes;
