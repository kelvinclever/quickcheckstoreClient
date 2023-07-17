import { useContext } from 'react'
import './sidenav.css'
import { Context } from './admincontext/Context.jsx'
const Sidebar=()=>{
    const{dispatch}=useContext(Context);
    
    const handleprofile=()=>{
        dispatch({ type: "profile", payload: 'profile' })
    }
    const handleproducts=()=>{
         dispatch({ type: "products", payload: 'products' })
    }

    const handlecustomers=()=>{
       dispatch({ type: "customers", payload: 'customers' })
    }

    const handleorders=()=>{
        dispatch({ type: "orders", payload: 'orders' })
    }
    const handleadmins=()=>{
        dispatch({ type: "admins", payload: 'admins' })
    }



    return(
        <div className='sidenav'>
            <div>
            <span onClick={handleprofile} className='profile'>profile</span>
            </div>
          
            <span onClick={handleproducts}>products</span>
            <span onClick={handlecustomers}>customers</span>
            <span onClick={handleorders}>orders</span>
            <span onClick={handleadmins}>admins</span>
            
        </div>
    )
}

export default Sidebar