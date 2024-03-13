const {
  UserSignUp,
  UserSendOtp,
  UserLogin,
} = require("../Controllers/AuthControllers");
const { UserSendLink, resetPassword } = require("../Controllers/forgetPasswordController");

const AuthRoutes = (app) => {
  app.post("/user/signup", UserSignUp);
  app.post("/user/login", UserLogin);
  app.post("/user/sendOtp", UserSendOtp);
  app.post("/user/forget-password", UserSendLink);
  app.post(
    "/user/reset-password/:_id/:resetToken/:expirationTime",
    resetPassword
  );
};

module.exports = AuthRoutes;
