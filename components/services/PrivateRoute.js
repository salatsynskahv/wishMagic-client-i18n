import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { userIsAuthegetUsernticated } = useAuth()
  return userIsAuthenticated() ? children : <Navigate to="/login" />
}

export default PrivateRoute