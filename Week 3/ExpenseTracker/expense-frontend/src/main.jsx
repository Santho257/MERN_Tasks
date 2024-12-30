import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContextProvider>
      <ThemeContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
)
