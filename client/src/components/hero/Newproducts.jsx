 
import './newproducts.css'
import Carousel from './Carousel.jsx'
import Products from '../product/Products.jsx'
 
 const Newproducts=()=>{
    const cards=[<Products/>]
    return(
    <div className="newproducts">
        <div className='bar-product'>
            <span className='flash-heading'>Flash  sales</span>
        </div>
        <div className='flash-products'>
           <Carousel cards={cards}/>
        </div>
    </div>
    )
 }
 export default Newproducts