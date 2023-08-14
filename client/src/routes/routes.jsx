import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Cart from '../components/cart/Cart';
import Contactus from '../components/contact-us/Contactus';
import AppLayout from '../layouts/AppLayout';
import Help from '../help/Help';
import Success from '../components/success/Success';
import Landingpage from '../components/landingpage/Landingpage';
import Admin from '../admin/Admin';
import Products from '../components/product/Products';
import Shop from '../components/product/Shop';
import LoginAdmin from '../admin/LoginAdmin';
import ProductDetails from '../components/product/Product';
import { Context } from '../admin/customerContext/customer.context';
import { useContext } from 'react';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Landingpage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="help" element={<Help />} />
        <Route path="/products/all" element={<Products apiurl={`http://localhost:8082/products`} />} />
        <Route path="success" element={<Success />} />
        <Route path="contact-us" element={<Contactus />} />
        <Route path="products">
          <Route index element={<Shop />} />
          <Route path="all" element={<Products apiurl="http://localhost:8082/products" />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
      </Route>
      <Route path="/admin">
        <Route path="" element={<Admin />} />
        <Route path="login" element={<AdminLoginRoute />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Route>
  )
);

function AdminLoginRoute() {
  const { user } = useContext(Context);
  const admin = user && user.username;

  console.log('User:', user);
  console.log('Admin:', admin);

  return admin ? <LoginAdmin /> : <Navigate to="/admin/login" />;
}
