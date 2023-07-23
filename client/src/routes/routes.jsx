import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Cart from "../components/cart/Cart";
import Contactus from "../components/contact-us/Contactus";
import AppLayout from "../layouts/AppLayout";
import Checkout from "../components/checkout/Checkout";
import Help from "../help/Help";
import Success from "../components/success/Success";
import Landingpage from "../components/landingpage/Landingpage";
import Admin from "../admin/Admin";
import Products from "../components/product/Products";
import ProductDetails from "../components/product/Product";
import { Shop } from "../components/product/ShopContext";
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<AppLayout />}>
                <Route path="" element={<Landingpage />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout/>} />
                <Route path="help" element={<Help/>} />
                <Route path="success" element={<Success/>} />
                <Route path="contact-us" element={<Contactus />} />
                <Route path="products" element={<Products/>} />
                <Route path="/products/single " element={< ProductDetails/>} />

                
            </Route>
            <Route path="/admin">
                 <Route path="" element={<Admin/>} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>

            <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>

        </Route>

    )
)