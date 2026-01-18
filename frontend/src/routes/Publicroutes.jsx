import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Publicroutes = () => {
    const {isAuth}=useAuth();
  return (
  isAuth?<Navigate to="/dashboard"/>:<Outlet/>
  )
}

export default Publicroutes
