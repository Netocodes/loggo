import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/userProvider'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <UserProvider>
    <App />
    </UserProvider>
  </StrictMode>
)
