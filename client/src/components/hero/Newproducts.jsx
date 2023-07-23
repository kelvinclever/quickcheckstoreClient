 
import './newproducts.css'
import Carousel from './Carousel.jsx'
import Products from '../product/Products.jsx'
 
 const Newproducts=()=>{
    const cards=[]
    return(
    <div className="newproducts">
        <div className='bar-product'>
            <span className='flash-heading'>Welcome , Start here</span>
        </div>
        <div className='flash-products'>
        <Products/>
        </div>
    </div>
    )
 }
 export default Newproducts