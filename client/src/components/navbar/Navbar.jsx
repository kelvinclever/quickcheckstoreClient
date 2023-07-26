import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/logo2.jpg';
import {RiLogoutCircleLine,RiLoginCircleLine} from 'react-icons/ri'
import './navbar.css';
import { FaUserAlt, FaCartPlus } from 'react-icons/fa';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHelp } from 'react-icons/gi';
import { Context } from '../../admin/admincontext/Context';
const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const navigate=useNavigate()
    const {dispatch}=useContext(Context);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin/login');
      };
  const handleAccountClick = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  return (
    <div className="nav-bar">
      <div className="logo-main">
        <Link to="/">
          <img src={Logo} alt="" srcset="" />
        </Link>
      </div>
      <div className="search">
        <input type="text" placeholder="Search here" />
        <button className='searchbtn'>SEARCH</button>
      </div>
      <div className="nav-icons">

        <div>
          <Link to="/help">
              <GiHelp id="help-icon" /> HELP
           
          </Link>
          </div>
          
        
        <div>
          <span className='nav-icons' onClick={handleAccountClick}>
            account <FaUserAlt className="account" />
          </span>
  
          {showAccountDropdown && (
            <div className="account-dropdown">
              <Link to='/userprofile'>profile</Link>
              <button className='Logoutbtn' onClick={handleLogout}>logout</button>

            </div>
          )}
        </div>
        <div>
          <Link to="/cart">
              <FaCartPlus /> Cart
          </Link>
        </div>
        <div>
          <Link to='/auth/login'><RiLogoutCircleLine/>login</Link>
        </div>
        <div>
          <Link to='/auth/signup'><RiLoginCircleLine/>signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
