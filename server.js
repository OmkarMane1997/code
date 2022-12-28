require('dotenv').config()
const express = require('express')

const cors = require('cors');
const cookieParser = require('cookie-parser')
const assert = require('assert')
const { StatusCodes } = require('http-status-codes')
const connection = require('./db/db')
const path = require('path')
const { OAuth2Client } = require('google-auth-library')

// port
const PORT = process.env.PORT
// ref
const app = express();

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(process.env.TOKEN_SECRET))
//middleware
app.use(cors())



// route modules
const registrationRoute = require('./route/registrationRoute');
const userLoginController = require('./route/loginRoute')
//Google login object
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


function upsert(array, item) {
    const i = array.findIndex((_item) = _item.email === item.email);
    if (i > -1) array[i] = item
    else array.push(item)
}
const users = []
app.post('http://localhost:4000/api/v1/google-login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })
    const { name, email } = ticket.getPayload()
    upsert(users, { name, email })
    res.status(201)
    res.json({ name, email })

});




// primary Router  
app.use(`/api/v1/registration`, registrationRoute);
app.use(`/api/v1/login`, userLoginController);



// default route "mysql2": "^2.3.3",
app.all(`*`, (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `the Request route path Not Found` })
})


const start = async () => {
    try {
        // await connection;
        app.listen(PORT, () => {
            console.log(`server is listening at http://localhost:${PORT}`)
        })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}

start()
