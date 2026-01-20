import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Layout from './Layout'
import UserRegister from './components/UserRegister'
import { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext'
import PrivateHome from './components/PrivateHome'
import Publicroutes from './routes/Publicroutes'
import Privateroutes from './routes/Privateroutes'
import Safety from './pages/Safety'
function App() {
  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route element={<Publicroutes/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<UserRegister/>}/>
      
      </Route>
      <Route element={<Privateroutes/>}>
      <Route path='/dashboard' element={<PrivateHome/>}/>
         <Route path='/safety' element={<Safety/>}/>
      </Route>
    </Route>
    </Routes>
    </>
  )
}

export default App
