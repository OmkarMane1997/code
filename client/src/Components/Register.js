import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import './RegisterStyle.css'
import sideImage from '../assets/image.png'



function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };


  const handleSubmit = async () => {
    // const { name, email, password, cpassword } = user;
    if (name === '' || name === undefined || name === null) return toast.warning("username cannot be empty");
    if (email === '' || email === undefined || email === null) return toast.warning("email can't be empty");
    if (password === '' || password === undefined || password === null) return toast.warning("password cannot be empty");
    if (confirmPassword === '' || confirmPassword === undefined || confirmPassword === null) return toast.warning("Password confirmation field can't be empty");
    if (confirmPassword !== password) return toast.error("Password & Confirm Password doesn't matches.")
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        cpassword: confirmPassword,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/registration/register",
        requestOptions
      );

      const data = await response.json();
      if (response.status === 400) {
        setTimeout(() => window.location.reload(), 5000);
        // console.log("The registration failed", JSON.stringify(data));
        return toast.error(`Registration Failed \n ${JSON.stringify(data)}`);
      }

      if (response.status === 404) {
        setTimeout(() => window.location.reload(), 5000);
        return toast.error(
          "Registration failed, bad request",
          JSON.stringify(data)
        );
      }

      toast.success("Successfully registered", JSON.stringify(data));
      // console.log("Successfully Registration", JSON.stringify(data));
      navigate("/login");

    } catch (err) {
      setTimeout(() => window.location.reload(), 5000);
      if (err.response.status === 404) {
        return toast.error("Registration Failed from server");
      }
      if (err.response.status !== 500) {
        return toast.error("Registration Failed");
      }
      toast.error("Internal Server Error..");
    }
  };


  return (

    <div className="container shadow">

      <div className="row mt-5">
        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 image-wrap p-0  d-lg-block d-none">
          <img src={sideImage} className='img-fluid' alt="side"></img>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
          <div className='row'>
            <div className='col-12'>
              <div className='login-register-wrap float-end mt-3'>
                <button type="button" className="btn btn-dark mx-1 rounded-pill">Login</button>
                <button type="button" className="btn btn-primary mx-1 rounded-pill">Register</button>
              </div>
            </div>

            <div className="text-center">
              <h2>Create Your Account</h2>
            </div>

            <div className='form-wrap col-12 mx-auto'>
              <form action="" autoComplete='off'>
                <div className="form-group my-3 mx-5">
                  <input type="text" name="name" id="name" size={10} placeholder="Your Name" className="form-control form-control-lg" value={name} onChange={(e)=>handleInputChange(e)} required />
                </div>

                <div className="form-group my-3 mx-5">
                  <input type="email" name="email" placeholder="Email id" id="email" className="form-control form-control-lg" value={email} onChange={(e)=>handleInputChange(e)} required />
                </div>

                <div className="form-group my-3 mx-5">
                  <input type="password" name="password" id="password" placeholder='Password' className="form-control form-control-lg" value={password} onChange={(e)=>handleInputChange(e)} required />
                </div>

                <div className="form-group my-3 mx-5">
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' className="form-control form-control-lg" value={confirmPassword} onChange={(e)=>handleInputChange(e)} required />
                </div>

                <div className="form-check my-3 mx-3">
                  <input type="checkbox" name="terms" id="terms" className='mx-2' />
                  <label htmlFor="terms" className='text-secondary'> Accept Terms and Conditions</label>
                </div>

                <div className="form-group my-3 mx-5">
                  <input type="button" value="Register" className="form-control form-control-lg btn btn-dark" onClick={()=>handleSubmit()} required />
                  {/* <button className="btn btn-dark px-5" type="submit">Register</button> */}
                </div>

                <br></br>
                <div className="fw-bold text-secondary mx-5">Already have account <NavLink to={"/login"} className="td-none">Login</NavLink></div>
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

export default Register