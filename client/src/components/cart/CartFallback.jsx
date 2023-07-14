const CartFallback = () => {
  return (
    <div className='cart-container'>
    <div className="cart-fallback">
      <p>Your Cart is Empty!</p>
      <p>Browse and purchase now</p>
    </div>
    <button className="cart-btn">Shop Now</button>
    <p>Flash Sales</p>
  </div>
  )
}

export default CartFallback