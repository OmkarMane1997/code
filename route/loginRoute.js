const route = require("express").Router();
const loginController = require('../controller/loginController')
const auth = require('../middleware/auth')
route.post(`/login`, loginController.login);
route.get(`/logout`, loginController.logout);
route.get(`/refreshToken`, loginController.refreshToken);
route.post(`/resetPassword`,auth, loginController.resetPassword);
route.get(`/profile`,auth, loginController.profile);
route.post(`/forgot-password`, loginController.generateForgotPasswordLink);
route.get(`/forgot-password/:id/:token`, loginController.verify_link_and_password);
route.post(`/forgot-password/:id/:token`, loginController.Updating_By_Link_password);
route.post('/code-s',loginController.loginWithCodeSApi)

module.exports = route;
