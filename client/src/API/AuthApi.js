import React, { useState, useEffect } from 'react'

function AuthApi(token) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isStudent, setIsStudent] = useState(false)


    return {
        currentUser:[currentUser, setCurrentUser],
        isLogged:[isLogged, setIsLogged],
        isAdmin:[isAdmin, setIsAdmin],
        isStudent:[isStudent, setIsStudent]

}
}

export default AuthApi