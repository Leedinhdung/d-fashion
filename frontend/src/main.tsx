import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { CartProvider } from './contexts/clients/CartContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <CartProvider>
      <QueryClientProvider client={queryClient} >
        <App />
      </QueryClientProvider>
    </CartProvider>

  </StrictMode>,
)
