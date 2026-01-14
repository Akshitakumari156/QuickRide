import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Layout from './Layout'
import UserRegister from './components/UserRegister'

function App() {
  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
    
    <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<UserRegister/>}/>
          </Route>
    </Routes>
    </>
  )
}

export default App
