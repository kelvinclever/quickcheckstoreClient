import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/cart/Cartcontext.jsx'
// import { UIContextProvider } from './admin/admincontext/Context.jsx'
import { UIContextProvider } from './components/product/shopContext.jsx'
import { AdminContextProvider } from './admin/admincontext/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<AdminContextProvider>
 <UIContextProvider>
    <CartProvider> 
      <App />
      </CartProvider>
   </UIContextProvider>
   </AdminContextProvider>
  </React.StrictMode>,
)
