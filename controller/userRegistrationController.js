const { StatusCodes} = require('http-status-codes')
const connection = require('../db/db')
const bcrypt = require('bcryptjs')
const assert = require("assert");
const {selectQuery,insertQuery} = require("../helper/sqlQuery");

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

                     const whereConditionS = "email='"+email+"'";
                    const querySqlCheck = await selectQuery("register",["id"],whereConditionS)
                    // console.log("querySqlCheck",querySqlCheck)

                    const rows = await connection({ querys: querySqlCheck, values: [] });
                    if (rows.length == 0) {
                            const today = new Date();
                            const insertObj = {
                                  "email":email,
                                  "password":encPassword,
                                  "name":name,
                                  "created_at":date2
                            }
                            const querySql = await insertQuery(insertObj,"register")
                            // console.log("querySql",querySql)
                            const insertData = await connection({ querys: querySql, values: [] });
                                if(insertData){
                                    res.status(StatusCodes.OK).json({ msg: "Register Controller"})
                                }else{
                                    return res.status(StatusCodes.BAD_REQUEST).json({msg:"In valid password and email"})
                                }
                             }
                            else{
                                return res.status(StatusCodes.BAD_REQUEST).json({msg:"Email is already exits."})
                              
                    }
   
      
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
            
        }
          
       

    },
    login: async (req,res)=>{
        res.status(StatusCodes.OK).json({ msg: "Login Controller" })
    },
    logout: async (req,res)=>{
        res.status(StatusCodes.OK).json({ msg: "Logout Controller" })

    }
    
}

module.exports= userRegistrationController;