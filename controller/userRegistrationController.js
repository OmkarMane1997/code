const { StatusCodes} = require('http-status-codes')
const validator = require("validator");
const DBconnection = require('../db/db')
const bcrypt = require('bcryptjs')
require("dotenv").config();
const jwt = require('jsonwebtoken');
const EmailVerificationLink = require('../template/EmailVerificationLink')
const sendMail = require('../middleware/mail');
const userRegistrationController={
    register: async (req,res)=>{
        try {
            const {name,email,password,confirmPassword} = req.body;
            // console.log(req.body);
            
            const encPassword = await bcrypt.hash(password,10);
            const emailVerificationSecreteText =await bcrypt.hash(name,10)
                const date = new Date()
                let date2 = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                        .toISOString()
                        .split("T")[0];
                        //  where check the email is in DB or not.

                    
               // Validation of Name
               if (validator.isLength(name,{min:2 }) == false) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Enter min 3 Characters" });
                }
                    // Validation of Email
                if (validator.isEmail(email)== false) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: " Enter Only Valid Email" }); 
                }
                // PassWord Validation and Return Password Score.
                if (validator.isStrongPassword(password,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})==false) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: `minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1` });    
                }

                if (validator.equals(confirmPassword,password)===false) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: `Password is didn't Match` });    
                
                  }

                let findData = `SELECT * FROM register WHERE email='${email}'`;
                            //   console.log(findData)
                              let exitID = await DBconnection(findData);
                            //   console.log(exitID)
                              if (exitID.length==0) {
                                // console.log('yes')
                                 //   Insert Query
                              let insertData = `INSERT INTO register (name, email, password,created_at,email_verification_secrete) VALUES ("${name}","${email}","${encPassword}","${date2}","${emailVerificationSecreteText}")`;
                              // console.log(insertData);
                              let result = await DBconnection(insertData);
                              // console.log(result);
                              let insert = await DBconnection(findData);
                              // console.log(insert)

                              const Secrete =  process.env.JWT_FORGOT_PASSWORD_LINK_GENERATE_SECRET+ insert[0].email_verification_secrete;
                              // console.log("S:-",Secrete)
                              const userId =insert[0].id;
                                const payload ={
                                  id: userId,
                                  emailId : insert[0].email
                                }
                                // console.log(payload)
                                const token =jwt.sign(payload,Secrete,{expiresIn:'10m'});

                                //  const link = `http://localhost:4000/api/v1/registration/register/email-verification/${userId}/${token}`;
                                 const link = `http://localhost:3000/EmailVerification/${userId}/${token}`;
                                 console.log(link);

                                //  mail sending code here 
                                const template = EmailVerificationLink(insert[0].name,link)
                                const subject = `Email Verification Link`;
                              //  await sendMail(email,subject,template)
                      


                      return   res.status(StatusCodes.OK).json({ msg: " Registration SuccessFull"}); 
                              } else {
                                // console.log('No')
                              return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email id is already Exits!" });
                                
                              }

                            //   res.status(StatusCodes.OK).json({ msg: " Registration SuccessFull"}); 
      
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
            
        }
          
       

    },
    registerEmailVerification : async (req,res)=>{
      try {
        const {id,token} =req.params;

        let findUser = `SELECT * FROM register WHERE id='${id}'`;
        // console.log(findUser);
        let result = await DBconnection(findUser)
        if (result.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"User is not Registered!"})
        }

        const Secrete = process.env.JWT_FORGOT_PASSWORD_LINK_GENERATE_SECRET+ result[0].email_verification_secrete;

        try {
          const payload = jwt.verify(token,Secrete)
          let UpdateQuery = `UPDATE register SET  email_verification_status="1" , email_verification_secrete="DONE" WHERE id="${id}"`;
          // console.log(UpdateQuery);
          let result = await DBconnection(UpdateQuery);
                  // console.log(result);
          return  res.status(StatusCodes.OK).json({msg:"Email Verification Done"})
        } catch (err) {
          // console.log(err)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }

        
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
      }
    },
    regWithGoogleLogin:async (req,res)=>{
      try {
        const {name,email}= req.body;
         console.log(req.body);
         const date = new Date()
                let date2 = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                        .toISOString()
                        .split("T")[0];
        if (validator.isLength(name,{min:2 }) == false) {
          return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Enter min 3 Characters" });
          }
              // Validation of Email
          if (validator.isEmail(email)== false) {
          return res.status(StatusCodes.BAD_REQUEST).json({ msg: " Enter Only Valid Email" }); 
          }
          let findData = `SELECT * FROM register WHERE email='${email}'`;

          let exitID = await DBconnection(findData);
            console.log(exitID)
            if (exitID.length==0) {
              // console.log('yes')
               //   Insert Query
            let insertData = `INSERT INTO register (name, email,created_at,email_verification_status,email_verification_secrete) VALUES ("${name}","${email}","${date2}","1","DONE")`;
            console.log(insertData);
            let result = await DBconnection(insertData);
            console.log(result);
             return   res.status(StatusCodes.OK).json({ msg: " Registration SuccessFull"}); 
            } else {
              // console.log('No')
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email id is already Exits process login!" });
            }
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
    }
    
    
}

module.exports= userRegistrationController;