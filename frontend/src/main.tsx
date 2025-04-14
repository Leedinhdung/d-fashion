import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { CartProvider } from './contexts/clients/CartContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <CartProvider>
        <App />
      </CartProvider>
    
  </StrictMode>,
)
