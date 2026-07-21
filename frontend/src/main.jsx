import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "leaflet/dist/leaflet.css";
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './common/Toast/ToastContext.jsx'
import ToastContainer from './common/Toast/ToastContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ToastProvider>
  <AuthProvider>
 <BrowserRouter>
    <App />
    <ToastContainer />
 </BrowserRouter>
  </AuthProvider>
  </ToastProvider>
  </StrictMode>,
)
