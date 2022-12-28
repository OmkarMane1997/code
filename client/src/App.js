import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Auth/Dashboard'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import { ToastContainer } from 'react-toastify'


function App(props) {

  return (
    <BrowserRouter>
    <ToastContainer autoClose={5000} position={'top-right'} />
      <Routes>
        <Route path={`/`} element={<Register />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/dashboard`} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  )

}



export default App