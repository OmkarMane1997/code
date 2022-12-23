import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import "./RegisterStyle.css";
import sideImage from "../assets/image.png";
import axios from "axios";

function Forgot_Password() {
    const [userRegData, setUserRegData] = useState({
        email: ""
      });
      const [buttonStatus, setButtonStatus] = useState(false)
      const URL =`http://localhost:4000`
    
      const navigate = useNavigate();
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserRegData({ ...userRegData, [name]: value });
      };

      const  handleSubmit =async (e)=>{
            e.preventDefault();
        if (validator.isEmail(userRegData.email) === false) {
            return toast.error("Enter valid Email")
          }

          console.log(userRegData)

          try {
            setButtonStatus(true)
            // console.log(`${URL}/register`)
            const result = await axios.post(`${URL}/api/v1/login/forgot-password`, userRegData);
            // console.log('result:-',result.data.msg);
            toast.success(result.data.msg);
            setButtonStatus(false)

          } catch (err) {
            // console.log('err:-',err.response.data.msg)
            toast.error(err.response.data.msg)
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
              <button
                type="button"
                className="btn btn-primary mx-1 rounded-pill"
              >
                Register
              </button>
            </div>
          </div>
          <div className="text-center mt-5">
            <h2>Forgot Password</h2>
          </div>
          <div className="form-wrap col-12 mx-auto">
            <form onSubmit={handleSubmit} autoComplete="off">
             
              <div className="form-group my-3 mx-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email id"
                  id="email"
                  className="form-control form-control-lg"
                  onKeyUp={handleInputChange}
                  required
                />
                
              </div>

              <div className="form-group my-3 mx-5">
                <input
                  type="Submit"
                  disabled={buttonStatus}
                  value="Generate Link"
                  className="form-control form-control-lg btn btn-dark"
                />
              </div>

              <br></br>
              <div className="fw-bold text-secondary mx-5">
                Already have account{" "}
                <NavLink to={"/login"} className="td-none">
                  Login
                </NavLink>
              </div>
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

export default Forgot_Password