import './checkout.css'
import { FaTrashAlt } from "react-icons/fa";
import { useContext, useState } from 'react';
import { CartContext } from '../cart/Cartcontext';
import Cart from '../cart/Cart';
import CheckOut from '../Payment/Checkout';
const Checkout = () => {
  const { cartItems, getCartTotal, removeFromCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(shippingInfo);
  };

  return (
    <div className='checkout-main'>
      <div className='checkout-now'>
        <div>
          <h4>Checkout</h4>
          <h4>Shipping information</h4>
          <form className='checkout-form' onSubmit={handleFormSubmit}>
            <div className='inputs'>
              <label htmlFor="name">Name *</label>
              <div>
                <input type="text" id="name" name="name" value={shippingInfo.name} onChange={handleInputChange} />
              </div>
            </div>
            <div className='inputs'>
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={shippingInfo.email} onChange={handleInputChange} />
            </div>
            <div className='inputs'>
              <label htmlFor="phone">Phone *</label>
              <input type="text" id="phone" name="phone" value={shippingInfo.phone} onChange={handleInputChange} />
            </div>
            <div className='inputs'>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} />
            </div>
            <button className="proceed-btn" type="submit">PROCEED</button>
          </form>
        </div>
        <div className='checkout-right'>
          <h2>CART ({cartItems.length})</h2>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.product_id} className="checkout-item">
                  <img className='checkout-img' src={item.image_path} alt={item.name} />
                  <div>
                    {item.name}
                  </div>
                  <button className='remove-btn' onClick={() => handleRemoveItem(item)}>
                    <FaTrashAlt className='trash' /> Remove
                  </button>
                </div>
              ))}
              <div>
                <h3>Cart Summary</h3>
                <div className='checkout-subtotal'>
                  <p>SUB TOTAL</p>
                  <p>KES {getCartTotal()}</p>
                </div>
                <CheckOut cartItems = {Cart.cartItems}/>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout;
