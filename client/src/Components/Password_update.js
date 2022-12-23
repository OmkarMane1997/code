import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import "./RegisterStyle.css";
import sideImage from "../assets/image.png";
import axios from "axios";

function Password_update() {

    const [userRegData, setUserRegData] = useState({
        password: "",
        confirmPassword:"",

      });
      const [buttonStatus, setButtonStatus] = useState(false)
      const URL =`http://localhost:4000`
    
      const navigate = useNavigate();
      const params = useParams(); // to read router params
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserRegData({ ...userRegData, [name]: value });
      };

      const  handleSubmit =async (e)=>{
            e.preventDefault();
          // password 
      if (validator.isStrongPassword(userRegData.password)===false) {
        return toast.error("Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20")
      }
      // password match
      if (validator.equals(userRegData.confirmPassword,userRegData.password)===false) {
        return toast.error("Password is didn't Match")
      }

          console.log(userRegData)
          console.log(params)
        //   console.log(`${URL}/api/v1/login/forgot-password/${params.id}/${params.token}`)

          try {
            setButtonStatus(true)
            // console.log(`${URL}/register`)
            const result = await axios.post(`${URL}/api/v1/login/forgot-password/${params.id}/${params.token}`, userRegData);
            console.log('result:-',result.data.msg);
            toast.success(result.data.msg);
            setButtonStatus(false)

          } catch (err) {
            console.log('err:-',err.response.data.msg)
            if (err.response.data.msg==='jwt expired') {
                toast.error('Link Expired ! ')
            }  else  if (err.response.data.msg=== 'invalid signature') {
                toast.error('Link Used For Reset Password ! ') 
            }else  if (err.response.data.msg=== 'invalid token') {
                toast.error('Invalid Link ! ') 
            }
            else {
                toast.error(err.response.data.msg)
            }

           
           
            
            setButtonStatus(false)

          }
      }
  return (
    <div className="container shadow">
    <div className="row mt-5">
      <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 image-wrap p-0  d-lg-block d-none">
        <img src={sideImage} className="img-fluid" alt="side"></img>
      </div>

      <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
        <div className="row">
          <div className="col-12">
            <div className="login-register-wrap float-end mt-3">
              <button
                type="button"
                className="btn btn-dark mx-1 rounded-pill"
              >
                Login
              </button>
              {/* <button
                type="button"
                className="btn btn-primary mx-1 rounded-pill"
              >
                Register
              </button> */}
            </div>
          </div>
          <div className="text-center mt-5">
            <h2> Reset Password</h2>
          </div>
          <div className="form-wrap col-12 mx-auto">
            <form onSubmit={handleSubmit} autoComplete="off">
             
            <div className="form-group my-3 mx-5">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                    onChange={handleInputChange}
                    required
                  />
                 
                </div>

                <div className="form-group my-3 mx-5">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control form-control-lg"
                    onChange={handleInputChange }
                    required
                  />
                  
                </div>

              <div className="form-group my-3 mx-5">
                <input
                  type="Submit"
                  disabled={buttonStatus}
                  value="Reset Password"
                  className="form-control form-control-lg btn btn-dark"
                />
              </div>

              <br></br>
              
              <br></br>
            </form>
          </div>
        </div>

        <br />
      </div>
    </div>
  </div>
  )
}

export default Password_update