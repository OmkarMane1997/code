const { StatusCodes} = require('http-status-codes')
const validator = require("validator");
const DBconnection = require('../db/db')
const bcrypt = require('bcryptjs')


const userRegistrationController={
    register: async (req,res)=>{
        try {
            const {name,email,password} = req.body;
            const encPassword = await bcrypt.hash(password,10);
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


                let findData = `SELECT * FROM register WHERE email='${email}'`;
                              // console.log(findData)
                              let exitID = await DBconnection(findData);
                              console.log(exitID)
                              if (exitID.length==0) {
                                // console.log('yes')
                                 //   Insert Query
                              let insertData = `INSERT INTO register (name, email, password,created_at) VALUES ("${name}","${email}","${encPassword}","${date2}")`;
                              console.log(insertData);
                              let result = await DBconnection(insertData);
                              // console.log(result.insertId);
                               
                              } else {
                                // console.log('No')
                              return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email id is already Exits!" });
                                
                              }

                res.status(StatusCodes.OK).json({ msg: " Registration SuccessFull"}); 
      
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
            
        }
          
       

    }
    
    
}

module.exports= userRegistrationController;