const validator = require("validator");
const DBconnection = require('../db/db')
const bcrypt = require('bcryptjs')
const { StatusCodes} = require('http-status-codes')
const { createAccessToken } = require('../util/token')

const userLoginController={
   
    login: async (req,res)=>{

        const {email,password}= req.body;
          console.log(req.body)
        if (validator.isEmail(email)== false) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: " Enter Only Valid Email" }); 
            }
            // PassWord Validation and Return Password Score.
            if (validator.isStrongPassword(password,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})==false) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: `minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1` });    
            }


                 let findUser = `SELECT * FROM register WHERE email='${email}'`;
                const result = await DBconnection(findUser)
                // console.log(result);
                // finding user in DB .
                if (result.length > 0) {
                    //  console.log(result[0].password)
                    // checking the Password 
                    const isMatch = await bcrypt.compare(password ,result[0].password)
                    if (!isMatch) {
                      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password Did not Match" });
                    }
                    
                        // generate token 
               const accessToken = createAccessToken({id:result[0].id})
                      // console.log(accessToken);

                      res.cookie('refreshToken', accessToken ,{
                        httpOnly : true,
                        signed: true,
                        path : '/api/v1/login/refreshToken',
                        maxAge: 1 * 2 * 60 * 60 * 1000
        
                    })
        

                return res.status(StatusCodes.OK).json({ msg: "Login SuccessFull",accessToken })
                }else{
               return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User Doesn't exists.." })
                }
    },
    logout: async (req,res)=>{
             try {
                  res.clearCookie('refreshToken',{path:'/api/v1/login/refreshToken'})
                  res.status(StatusCodes.OK).json({ msg: "Logout Successful" })
                 } catch (err) {
                  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
                 }
    },
    refreshToken: async (req,res)=>{
      res.status(StatusCodes.OK).json({ msg: "refreshToken Controller" })
    }
    
}

module.exports= userLoginController;