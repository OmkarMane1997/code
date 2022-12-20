const route = require("express").Router();
const loginController = require('../controller/loginController')
route.post(`/login`, loginController.login);
route.get(`/logout`, loginController.logout);
route.get(`/refreshToken`, loginController.refreshToken);
module.exports = route;