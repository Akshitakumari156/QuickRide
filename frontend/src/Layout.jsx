import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/PublicHeader'
import { useAuth } from './context/AuthContext'
import PrivateHeader from './components/Header/PrivateHeader'
import PublicHeader from './components/Header/PublicHeader'

const Layout = () => {
  const {isAuth}=useAuth();
  return (
   <>
  {isAuth?<PrivateHeader/>:<PublicHeader/>}
   <Outlet/>
   </>
  )
}

export default Layout
