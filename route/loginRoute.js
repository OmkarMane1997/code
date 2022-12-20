const route = require("express").Router();
const loginController = require('../controller/loginController')
const auth = require('../middleware/auth')
route.post(`/login`, loginController.login);
route.get(`/logout`, loginController.logout);
route.get(`/refreshToken`, loginController.refreshToken);
route.post(`/resetPassword`,auth, loginController.resetPassword);
module.exports = route;