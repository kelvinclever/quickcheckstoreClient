import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/cart/Cartcontext.jsx'
import { apiurl } from './components/product/alliases.jsx'
// import { UIContextProvider } from './admin/admincontext/Context.jsx'
import { UIContextProvider } from './components/product/shopContext.jsx'
import { AdminContextProvider } from './admin/admincontext/Context.jsx'
import { ContextProvider } from './admin/customerContext/customer.context.jsx'
import { ProductProvider } from './components/product/ProductsContext.jsx'
import Productnav from './components/product/Productnav.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ProductProvider apiurl={apiurl}>
    <ContextProvider>
<AdminContextProvider>
 <UIContextProvider>
    <CartProvider> 
      <App />
      </CartProvider>
   </UIContextProvider>
   </AdminContextProvider>
   </ContextProvider>
   </ProductProvider>
  </React.StrictMode>,
)
