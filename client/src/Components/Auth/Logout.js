import React,{useState}from 'react'


function logout() {
    localStorage.clear();
    window.location.href = '/login';
}

export default logout;