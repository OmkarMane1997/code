import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'


function App(props) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Register />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/dashboard`} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  )

}



export default App