const { UserSignUp, UserSendOtp, UserLogin } = require("../Controllers/authControllers");

const AuthRoutes = (app) => {
  app.post("/user/signup", UserSignUp);
  app.post("/user/login", UserLogin);
  app.post("/user/sendOtp", UserSendOtp);
};

module.exports = AuthRoutes;
