 
import './newproducts.css'

import Bestprice from './Bestprice'
import Products from '../product/Products'
 
 const Newproducts=()=>{
    const cards=[]
    return(
    <div className="newproducts">
        <div className='bar-product'>
            <span className='flash-heading'>Welcome , Start here</span>
        </div>
        <div className='flash-products'>
        <Bestprice/>
        </div>
    </div>
    )
 }
 export default Newproducts