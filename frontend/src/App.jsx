import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './features/auth/Login'
import Layout from './layout/Layout'
import UserRegister from './features/auth/UserRegister'
import PrivateHome from './features/home/PrivateHome'
import Publicroutes from './routes/Publicroutes'
import Privateroutes from './routes/Privateroutes'
import Safety from './pages/Safety'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import SupportPage from './pages/SupportPage'
import CaptainRegisterForm from './features/captain/CaptainRegisterForm'
import CaptainLogin from './features/captain/CaptainLogin'
import CaptainHome from './features/captain/CaptainHome'

function App() {
  return (
    <>
    <Routes>

      <Route element={<Layout/>}>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/services' element={<ServicesPage/>}/>
      <Route path='/pricing' element={<PricingPage/>}/>
      <Route path='/support' element={<SupportPage/>}/>
      <Route path='/safety' element={<Safety/>}/>

      <Route element={<Publicroutes/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<UserRegister/>}/>
       <Route path='/captain/register' element={<CaptainRegisterForm/>}/>
      <Route path='/captain/login' element={<CaptainLogin/>}/>

      </Route>
      <Route element={<Privateroutes/>}>
      <Route path='/dashboard' element={<PrivateHome/>}/>
        <Route path='/captain/dashboard' element={<CaptainHome/>}/>

      </Route>
    </Route>
    </Routes>
    </>
  )
}

export default App