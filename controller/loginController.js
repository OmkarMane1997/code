const validator = require("validator");
const DBconnection = require('../db/db')
const bcrypt = require('bcryptjs')
const { StatusCodes} = require('http-status-codes')
const { createAccessToken,decodeToken } = require('../util/token')
const jwt = require('jsonwebtoken');
const sendMail = require('../middleware/mail');
const Forgot_Password_Template = require('../template/Forgot_Password_Template');
require("dotenv").config();

const userLoginController={
   
    login: async (req,res)=>{

        const {email,password}= req.body;
          // console.log(req.body)
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
      try {
        const rfToken = req.signedCookies.refreshToken;
        // console.log(rf);
        if(!rfToken)  {
          return res.status(StatusCodes.BAD_REQUEST).json({msg: "Session Expired , Login Again.."})
        }
       

        jwt.verify(rfToken,process.env.TOKEN_SECRET,(err)=>{
          if(err){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid Access Token.. Login again"})
          }else{
            const userId =decodeToken(rfToken) 
            console.log(userId.id)
            const accessToken = createAccessToken({id:userId.id})
            // console.log('o:-',rfToken)
           

            res.status(StatusCodes.OK).json({accessToken })
          }
         })
        } catch (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }
      
    },
    resetPassword: async (req,res)=>{
      try {
        const id = req.user.id;           
        const {oldPassword , newPassword} = req.body;
        // console.log(req.body,id);

        let findUser = `SELECT * FROM register WHERE id='${id}'`;
        // console.log(findUser)

        if (validator.isStrongPassword(oldPassword,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})==false) {
          return res.status(StatusCodes.BAD_REQUEST).json({ msg: `Old Password password Rules are not Match.` });    
          }
          if (validator.isStrongPassword(newPassword,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})==false) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: `New Password password Rules are not Match.` });    
            }

        let result = await DBconnection(findUser)
        console.log(result)

        if (result.length>0) {

          const isMatch = await bcrypt.compare(oldPassword ,result[0].password)
          if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password Did not Match" });
          }else{
            const encPassword = await bcrypt.hash(newPassword,10);
            const date = new Date()
            let date2 = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
            let UpdateQuery = `UPDATE register SET  password="${encPassword}", updated_at="${date2}" WHERE id="${id}"`;
            // console.log(UpdateQuery);
            let result = await DBconnection(UpdateQuery);
            return res.status(StatusCodes.OK).json({ msg: " Password reset",result })
          }
        } else {
          return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User Doesn't exists.." })
          
        }
        // 

      
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
      }
    },
    profile: async(req,res)=>{
      try {
          let id= req.user.id;
          let findUser = `SELECT id,name,email,created_at,updated_at FROM register WHERE id='${id}'`;
          let result = await DBconnection(findUser)
          console.log(result)
          res.status(StatusCodes.OK).json({result })
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
      }
    },
    generateForgotPasswordLink: async (req,res)=>{
      try {

        let email = req.body.email;
        // console.log(email)

        let findUser = `SELECT * FROM register WHERE email='${email}'`;
        // console.log(findUser);
        let result = await DBconnection(findUser)
        if (result.length === 0) {
         return res.status(StatusCodes.BAD_REQUEST).json({msg:"User is not Registered!"})
        }

        // console.log(result)
        const Secrete = process.env.JWT_FORGOT_PASSWORD_LINK_GENERATE_SECRET+ result[0].password;
        // console.log("S:-",Secrete)
          const payload ={
            id: result[0].id,
            emailId : result[0].email
          }
          // console.log(payload)
          const token = jwt.sign(payload,Secrete,{expiresIn:'10m'})
          // console.log(token)

          // const link = `http://localhost:4000/api/v1/login/forgot-password/${result[0].id}/${token}`;
          const link = `http://localhost:3000/Forgot_password/${result[0].id}/${token}`;
          console.log(link);
          // mail code from here

          const template = Forgot_Password_Template(result[0].name,link)
          const subject = `Password link verification`;
          // sendMail(email,subject,template)


        res.status(StatusCodes.OK).json({ msg: "Forgot Password Link Send!" })
       } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
       }
    },
    verify_link_and_password: async (req,res)=>{
             try {
                  console.log(req.params)
                  const {id,token} =req.params;

                  let findUser = `SELECT * FROM register WHERE id='${id}'`;
                    // console.log(findUser);
                    let result = await DBconnection(findUser)
                    if (result.length === 0) {
                    return res.status(StatusCodes.BAD_REQUEST).json({msg:"User is not Registered!"})
                    }
               const Secrete = process.env.JWT_FORGOT_PASSWORD_LINK_GENERATE_SECRET+ result[0].password;
                    try {
                      const payload = jwt.verify(token,Secrete)
                      res.status(StatusCodes.OK).json({ msg: "Link Active",payload})
                    } catch (err) {
                      console.log(err.message)
                      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
                    }
                  
                 } catch (err) {
                  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
                 }
    },
    Updating_By_Link_password: async (req,res)=>{
      try {
           console.log(req.params)
           const {id,token} =req.params;
           const {password, confirmPassword}=req.body;
              
              let findUser = `SELECT * FROM register WHERE id='${id}'`;
             // console.log(findUser);
             let result = await DBconnection(findUser)
             if (result.length === 0) {
             return res.status(StatusCodes.BAD_REQUEST).json({msg:"User is not Registered!"})
             }
        const Secrete = process.env.JWT_FORGOT_PASSWORD_LINK_GENERATE_SECRET+ result[0].password;
             try {
               const payload = jwt.verify(token,Secrete)
            
              console.log(req.body)
             
               // PassWord Validation and Return Password Score.
               if (validator.isStrongPassword(password,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})==false) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: `minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1` });    
                }

                if (validator.equals(confirmPassword,password)===false) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: `Password is didn't Match` });    
                  }
                  
                const encPassword = await bcrypt.hash(password,10);
            const date = new Date()
            let date2 = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
            let UpdateQuery = `UPDATE register SET  password="${encPassword}", updated_at="${date2}" WHERE id="${id}"`;
            // console.log(UpdateQuery);
            let result = await DBconnection(UpdateQuery);
                    console.log(result);
              
              res.status(StatusCodes.OK).json({ msg: " Password set successfully"})
             } catch (err) {
               console.log(err.message)
               return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
             }
           
          } catch (err) {
           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
          }
},


    
}

module.exports= userLoginController;