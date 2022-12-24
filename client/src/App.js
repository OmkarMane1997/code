import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './Components/Forgot_Password'
import PasswordUpdate from './Components/Password_update'
import EmailVerification from './Components/EmailVerification'

function App(props) {

  return (
    
    <BrowserRouter>
     <ToastContainer autoClose={5000} position={'top-right'} />
      <Routes>
     
        <Route path={`/`} element={<Register />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/dashboard`} element={<Dashboard />} />
        <Route path={`/Forgot_password`} element={<ForgotPassword/>} />
        <Route path={`/Forgot_password/:id/:token`} element={<PasswordUpdate/>}></Route>
        <Route path={'/EmailVerification/:id/:token' }  element={<EmailVerification/>}/>
      </Routes>
    </BrowserRouter>

  )

}



export default App