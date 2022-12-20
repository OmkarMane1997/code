const route = require("express").Router();
const userRegistrationController = require('../controller/userRegistrationController')


route.post(`/register`, userRegistrationController.register);


module.exports = route;