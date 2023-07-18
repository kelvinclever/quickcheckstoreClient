import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/cart/Cartcontext.jsx'
import { UIContextProvider } from './admin/admincontext/Context.jsx'
import { UIShopProvider } from './components/product/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<UIShopProvider>
 <UIContextProvider>
    <CartProvider> 
      <App />
      </CartProvider>
   </UIContextProvider>
   </UIShopProvider>
  </React.StrictMode>,
)
