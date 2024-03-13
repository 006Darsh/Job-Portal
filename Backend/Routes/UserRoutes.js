const {
  AddApplicantProfile,
  AddCompanyProfile,
  getCompanyProfile,
  getApplicantProfile,
  GetAllCompany,
} = require("../Controllers/UserControllers");
const AuthMiddlewares = require("../Middlewares/AuthMiddlewares");

const UserRoutes = (app) => {
  app.post(
    "/user/applicant/create-profile",
    AuthMiddlewares,
    AddApplicantProfile
  );
  app.put("/user/applicant/edit-profile", AuthMiddlewares);
  app.get("/user/applicant/profile/:id", getApplicantProfile);
  // app.get("/user/applicant/allapplicant",AuthMiddlewares,GetAllApplicant);
  app.post("/user/company/create-profile", AuthMiddlewares, AddCompanyProfile);
  app.put("/user/company/edit-profile", AuthMiddlewares);
  app.get("/user/company/profile/:id", getCompanyProfile);
  app.get("/user/company/allcompany",AuthMiddlewares,GetAllCompany);
};

module.exports = UserRoutes;
