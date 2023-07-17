import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../cart/Cartcontext';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './products.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext)

  async function getProducts() {
    const response = await fetch('http://localhost:8082/products')
    const data = await response.json()
    setProducts(data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const addtocarttoast = () => toast.success('Item added successfully!')
  const removefromcarttoast = () => toast.error('Item removed from cart!')

  const isInCart = (productId) => {
    return cartItems.some((item) => item.product_id === productId)
  }

  const handleCartButton = (product) => {
    if (isInCart(product.product_id)) {
      removeFromCart(product)
      removefromcarttoast()
    } else {
      addToCart(product)
      addtocarttoast()
    }
  }

  return (
    <div className='products'>
      <div className='products-heading'>
        <h1>Shop</h1>
      </div>
      <div className='products-container'>
        {products.map((product) => (
          <div key={product.product_id} className='product-content'>
            <img src={product.image_path} alt={product.product_name} className='product-image' />
            <div className='product-description'>
              <h1 className='product-title'>{product.product_name}</h1>
              <p className='product-dec'>{product.product_description.slice(0, 40)}...</p>
              <p className='product-price'>${product.product_price}</p>
            </div>
            <div className='product-addbutton'>
              <button
                className={`buttonadd ${isInCart(product.product_id) ? 'remove' : 'add'}`}
                onClick={() => handleCartButton(product)}
              >
                {isInCart(product.product_id) ? 'Remove from cart' : 'Add to cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}