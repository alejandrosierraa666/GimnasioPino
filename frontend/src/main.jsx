import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRouter from './AppRouter.jsx'
import { BrowserRouter } from 'react-router-dom'


//En este caso el BrowserRouter se tiene que quedar aqui o deberia de incluirlo el AppRouter?

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)