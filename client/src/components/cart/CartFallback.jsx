import { Link } from "react-router-dom"
import './cartfallback.css'
const CartFallback = () => {
  return (
    <div className='cart-container'>
    <div className="cart-fallback">
      <p>Your Cart is Empty!</p>
      <p>Browse and purchase now</p>
    </div>
    <Link to='/products'> <button className="cart-btn">Shop Now</button></Link>
   
  </div>
  )
}

export default CartFallback