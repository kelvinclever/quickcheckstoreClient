import './mainnav.css'
import { useContext } from 'react'
import ProductsAdmin from './ProductsAdmin.jsx'
import { Context } from './admincontext/Context'
import Customers from './Customers'
import UserAdmin from './UserAdmin.jsx'
import Profile from './Profile'
import AddProductForm from './Addproduct'
const Mainnav=()=>{
    const {ui}=useContext(Context)
  
    return(
        <div className="mainnav">
            { 
            ui=="profile"?(<div>
            <Profile/>
        </div>
            ):ui=="customers"?(
                 <div>
               <Customers/>
            </div>
            ):ui=="products"?(
                <div>
                    <ProductsAdmin/>
            </div> 
            ):ui=="orders"?(
                <div>
              <AddProductForm/>
            </div> 
            ): ui=="admins"?(
                <div>
                    <UserAdmin/>
                </div>
            ):null
            
            }
           
           
           
        </div>
    )
}
export default Mainnav