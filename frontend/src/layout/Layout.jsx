import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header/PublicHeader'
import { useAuth } from '../context/AuthContext'
import PrivateHeader from '../common/Header/PrivateHeader'
import PublicHeader from '../common/Header/PublicHeader'

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
