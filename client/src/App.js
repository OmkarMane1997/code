import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
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