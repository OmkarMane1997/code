import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <h1 className='display-4 text-primary'>Welcome To Your Dashboard</h1>
        <p> {localStorage.getItem("user")} </p>
    </div>
  )
}

export default Dashboard