const route = require("express").Router();
const userRegistrationController = require('../controller/userRegistrationController')


route.post(`/register`, userRegistrationController.register);
route.post(`/login`, userRegistrationController.login);
route.get(`/logout`, userRegistrationController.logout);

module.exports = route;