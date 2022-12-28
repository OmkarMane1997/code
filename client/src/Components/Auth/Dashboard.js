import React from 'react'
import logout from './Logout'

const Dashboard = () => {
  return (
    
    <div>
        <h1 className='display-4 text-success text-center m-3 p-3'>"Welcome To Your Dashboard"</h1>
        <p> {localStorage.getItem("user")} </p>
        <button type="button" class="btn btn-danger float-end mx-5 " onClickCapture={logout}>Logout</button>
   
    </div>
  )
}

export default Dashboard