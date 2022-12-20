const jwt = require('jsonwebtoken')
require("dotenv").config();
const createAccessToken = (user)=>{
    return jwt.sign(user, process.env.TOKEN_SECRET,{expiresIn:'1h'})
};
module.exports = {createAccessToken}