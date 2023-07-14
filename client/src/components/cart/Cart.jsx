import { Link } from 'react-router-dom';
import { CartContext } from './Cartcontext.jsx';
import { useContext } from 'react';
import './cart.css'
import { FaTrashAlt } from "react-icons/fa";
import CartFallback from "./CartFallback.jsx"

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal,addToCart} = useContext(
    CartContext
  );
  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleIncrement = (item) => {
    addToCart(item);
  };

  const handleDecrement = (item) => {
    removeFromCart(item);
  };
  return (
    <>
      <div className='cart-container' >
        <div className='cart'>
          <div className='cart-left'>
            {/* <div>CART(COUNT)</div> */}
            <div>
              <div className='cart-img'>
                <img src="https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75" alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, saepe?</p>
              </div>
              <button className='remove-btn'><FaTrashAlt className='trash' />REMOVE</button>
            </div>
            <div className='cart-left-amount'>
              <div>
                <p>AMOUNT</p>
              </div>
              <div className='cart-left-btns'>
                <button className='cart-btn'>-</button>
                <p>1</p>
                <button className='cart-btn'>+</button>
              </div>
            </div>
          </div>
          <div className='cart-right'>
            <h1>CART SUMMARY</h1>
            <div className='subtotal-amount'>
              <p>SUBTOTAL</p>
              <p>KES 2000</p>
            </div>
            <button className='cart-btn proceed-to-checkout'><Link to="/checkout">PROCEED TO CHECKOUT</Link></button>
          </div>
        </div>

      </div>
    </>


  )
}

export default Cart