import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import "./RegisterStyle.css";
import sideImage from "../../assets/image.png";
import axios from "axios";
import { useCookies } from "react-cookie"
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'

// import { LinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

function Login() {
  const [userLogData, setUserLogData] = useState({
    email: "",
    password: ""
  });

  //login with google login data hook
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  )

  const [cookies, setCookie] = useCookies(['user']);

  const [buttonStatus, setButtonStatus] = useState(false)
  const URL = `http://localhost:4000/api/v1/login/login`

  const navigate = useNavigate();


  //login with social media  - login done
  const handleLogin = async (googleData) => {
    const res = await fetch('http://localhost:4000/api/v1/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,

      }),
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await res.json()
    setLoginData(data)
    localStorage.setItem('loginData', JSON.stringify(data))
  }

  //login failure - social media
  const handleFailure = (result) => {
    console.log(result)
  }
  //logeed out google login
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null)
  }





  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogData({ ...userLogData, [name]: value });
  };

  const handleSubmit = async (e) => {

    // dispatch(loginUser({email,password }))
    e.preventDefault();

    //email
    if (validator.isEmail(userLogData.email) === false) {
      return toast.error("Enter valid Email")
    }
    // password 
    if (validator.isStrongPassword(userLogData.password) === false) {
      return toast.error("Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20")
    }

    // console.log(userLogData);cls



    try {
      // console.log('user = ', userLogData)
      await axios.post(`${URL}`, userLogData)
        .then(res => {
          console.log('After login token = ', res.data);
          localStorage.setItem('loginToken', res.data.accessToken)
          setCookie('loginToken', res.data.accessToken, { path: '/' });
          console.log("The login token is:", localStorage.loginToken);
          toast.success(res.data.msg)
          navigate('/dashboard')
        }).catch(err => {
          toast.error(err.data.response.msg)
          console.log('error=', err)
        })

    } catch (err) {
      toast.error(err.message)
    }

  };

  useEffect(() => {
    const clientId = (process.env.REACT_APP_GOOGLE_CLIENT_ID)
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId })
    })
  }, [])

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
            <div className="text-center">
              <h2>Sign In</h2>
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
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                    onChange={handleInputChange}
                    required
                  />

                </div>


                <div className="form-check my-3 mx-3">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="mx-2"
                    required
                  />
                  <label htmlFor="terms" className="text-secondary">

                    Remember Me
                  </label>
                </div>

                <div className="form-group my-3 mx-5">
                  <input
                    type="Submit"
                    disabled={buttonStatus}
                    value="Login"
                    className="form-control form-control-lg btn btn-dark"
                  />
                </div>

                <br></br>
                <div className="fw-bold text-secondary mx-5">
                  If no any account?{" "}
                  <NavLink to={"/"} className="td-none">
                    signup
                  </NavLink>
                </div>
                <br></br>
                <div>
                  {
                    loginData ? (
                      <div>
                   
                       <h3>{navigate('/dashboard')}</h3> 
                            <h3>You logged in as:{loginData.email}</h3>

                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    ) : (
                      <center>
                        <GoogleLogin className="google_login"
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          buttonText="Log in with Google"
                          onSuccess={handleLogin}
                          onFailure={handleFailure}
                          cookiePolicy={'single_host_origin'}
                        >
                        </GoogleLogin>
                      </center>

                    )

                  }

                </div>
                {/* //login with linkedin */}
                {/* <div>
                  <LinkedIn className="linkedin_login"
                        clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
                        buttonText="Log in with Linkedin"
                        onSuccess={handleLinkLogin}
                        onFailure={handleLinkFailure}
                        cookiePolicy={'single_host_origin'}
                  ></LinkedIn> */}
                {/* </div> */}
              </form>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;