import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PrivateHeader from '../common/Header/PrivateHeader'
import PublicHeader from '../common/Header/PublicHeader'
import Footer from '../common/Footer'

const Layout = () => {
  const { isAuth } = useAuth()
  return (
    <>
      {isAuth ? <PrivateHeader /> : <PublicHeader />}
      <Outlet />
      {!isAuth && <Footer />}
    </>
  )
}

export default Layout
