import { Link } from 'react-router-dom';
import { CartContext } from './Cartcontext.jsx';
import { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CartFallback from './CartFallback.jsx';
import CheckOut from '../Payment/Checkout.jsx';
import './cart.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

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
    <div className={`cart-container ${cartItems.length === 0 ? 'empty' : ''}`}>
      <div className="cart">
        <div className="cart-left">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product_id} className="cart-item">
                <div className="cart-img">
                  <img src={item.ProductImage} alt={item.name} />
                  <p>{item.name}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item)}>
                  <FaTrashAlt className="trash" />REMOVE
                </button>
                <div className="cart-left-amount">
                  <div>
                    {item.SalePrice ? (
                      <p>
                        <span className="original-price">Price: {item.Price}</span> | Sale Price: {item.SalePrice}
                      </p>
                    ) : (
                      <p>Price: {item.Price}</p>
                    )}
                  </div>
                  <div className="cart-left-btns">
                    <button className="cart-btn" onClick={() => handleDecrement(item)}>
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button className="cart-btn" onClick={() => handleIncrement(item)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <CartFallback />
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-right">
            <h1>CART SUMMARY</h1>
            <div className="subtotal-amount">
              <p>SUBTOTAL</p>
              <p>KES {getCartTotal()}</p>
            </div>
           
            <button className="cart-btn proceed-to-checkout">
              <Link to="/checkout">PROCEED TO CHECKOUT</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
