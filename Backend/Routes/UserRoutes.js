const UserRoutes = (app) => {
    app.post("/user/applicant/create-profile");
    app.put("/user/applicant/edit-profile");
    app.get("/user/applicant/profile");
    app.post("/user/company/create-profile");
    app.put("/user/company/edit-profile");
    app.get("/user/company/profile");
 };

module.exports = UserRoutes;