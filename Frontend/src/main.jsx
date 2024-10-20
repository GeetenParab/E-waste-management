import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './SignIn/AuthContext.jsx'
import { AdminContextProvider } from './Admin/AdminContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <AdminContextProvider>
    <App />
    </AdminContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
