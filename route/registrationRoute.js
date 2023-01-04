const route = require("express").Router();
const userRegistrationController = require('../controller/userRegistrationController')


route.post(`/register`, userRegistrationController.register);
route.post(`/email-verification/:id/:token`, userRegistrationController.registerEmailVerification);
route.post(`/regWithGoogle`, userRegistrationController.regWithGoogleLogin);


module.exports = route;