'use client'
import React, {createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser)
        }

    }, [])

    const getUser = () => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('user'));
        }
    }

    const userIsAuthenticated = () => {
        if (typeof window !== 'undefined') {
            let storedUser = localStorage.getItem('user')
            if (!storedUser) {
                return false;
            }
            console.log(storedUser);
            storedUser = JSON.parse(storedUser)

            // if user has token expired, logout user
            if (Date.now() > storedUser.data.exp * 1000) {
                userLogout()
                return false;
            }
            return true;
        }
        return false;
    }

    const userLogin = user => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
        }
    }

    const userLogout = () => {
        //send Request to server
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user')
        }
        setUser(null);
    }

    const contextValue = {
        user,
        getUser,
        userIsAuthenticated,
        userLogin,
        userLogout,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}

export {AuthProvider}