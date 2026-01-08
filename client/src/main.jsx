import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router'
import router from '../routes/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>
);
