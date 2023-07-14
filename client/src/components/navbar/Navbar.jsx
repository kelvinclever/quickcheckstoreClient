import { Link } from 'react-router-dom';

import Logo from '../../../public/images/logo2.jpg'
import './navbar.css'
import { FaUserAlt,FaCartPlus } from "react-icons/fa";
import {GiHelp} from "react-icons/gi"
const Navbar = () => {
  return (
    <div className="nav-bar">
        <div className="logo-main">

       <Link to='/'><img src={Logo} alt="" srcset="" /></Link> 
        </div>
        <div className="search">
            <input type="text" placeholder='Search here'/>
            <button>SEARCH</button>
        </div>
        <div className="nav-icons">
          <p> 
            
            <Link to='/help' ><span className='help'><GiHelp id='help-icon'/>HELP</span></Link>  </p>
            <p>
              <FaUserAlt className=' account'/>
            </p>
            <p>  <Link to="/cart">
              <span className='help'> <FaCartPlus />Cart</span>
             
            </Link></p>
          
        </div>
    </div>
  )
}

export default Navbar