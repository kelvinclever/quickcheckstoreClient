import { useContext } from 'react'
import { Shop } from './ShopContext.jsx';

const Categorynav=()=>{
    const{dispatch}=useContext(Shop);
    
    const PhonesTablets=()=>{
        dispatch({ type: "Phones & tablets", payload: 'Phones & tablets' })
    }
    const Fashion=()=>{
         dispatch({ type: "Fashion", payload: 'Fashion' })
    }
    const Computing=()=>{
        dispatch({ type: "Computing", payload: 'Computing' })
   }
    
    }



    return(
        <div className='sidenav'>
            <div>
            <span onClick={Fashion} className='fashion'>Fashion</span>
            </div>
        
            <span onClick={PhonesTablets}>Phones & tablets</span>
            
            
        </div>
    )
}

export default Categorynav