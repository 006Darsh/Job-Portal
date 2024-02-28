const AuthRoutes = (app) => {
    app.post('/user/signup', userSignUp);
}

export default AuthRoutes
