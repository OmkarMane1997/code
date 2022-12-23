import React, { useState } from 'react'
import sideImage from "../assets/image.png";
import { toast } from "react-toastify";
import { useNavigate,NavLink } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async () => {
    // const { name, email, password, cpassword } = user;
    if (email === null || email === '' || email === undefined) return toast.warning("Email can't be empty");
    if (password === null || password === '' || password === undefined) return toast.warning("Password field can't be empty.");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/registration/login",
        requestOptions
      );
      const data = await response.json();
      if (response.status === 400) {
        setTimeout(() => window.location.reload(), 5000);
        console.log("The login failed", JSON.stringify(data));
        return toast.error(`Login Failed \n ${JSON.stringify(data)}`);
      }
      if (response.status === 404) {
        setTimeout(() => window.location.reload(), 5000);
        return toast.error(
          "login failed, bad request",
          JSON.stringify(data)
        );

      }
      toast.success("Successfully LoggedIn", JSON.stringify(data));
      console.log("Successfully LoggedIn", JSON.stringify(data));
      navigate("/dashboard");

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
  const handleCheckbox = async () => {
    setChecked(!checked);
    const user = {
      "email": email,
      "password": password
    }
    //persisting the user credentials in localStorage and session
    if (checked) {
      sessionStorage.setItem("user", user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
    }
  }
  return <div className="container-fluid">

    <div className="row justify-content-center p-2">
      <div className="col-md-5 col-xs-12">
        <img src={sideImage} alt="sideImage"
          className="d-block w-100 img-fluid" />
      </div>
      <div className=" col-md-5 col-xs-12  p-5 mt-5 ">
        <div className="text-center">
          <h3 className="text-dark">Sign In</h3>
        </div>
        <div className="p-4">
          <div className="input-group mb-3">
            <span className="input-group-text"><i
              className="bi bi-person-plus-fill text-white"></i></span>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><i
              className="bi bi-key-fill text-white"></i></span>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
            />
          </div>

          <div className=" form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheckbox} checked={checked} />
            <label className="form-check-label" for="flexCheckDefault">
              Remember Me
            </label>
          </div>
          <button className="btn btn-dark text-center mt-2" type="submit" onClick={() => handleSubmit()}>
            Login
          </button>
          <p className="text-center mt-5">Don't have an account?
            <span className="text-primary" onClick={() => navigate("/login")}>Sign Up</span>
          </p>
          <p className='text-center'><NavLink to={'/Forgot_password'} className=" text-primary">Forgot your password?</NavLink></p>
          
        </div>
      </div>
    </div>

  </div>


}

export default Login;