import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/logo2.jpg';
import './navbar.css';
import { FaUserAlt, FaCartPlus } from 'react-icons/fa';
import { GiHelp } from 'react-icons/gi';

const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

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
        <button>SEARCH</button>
      </div>
      <div className="nav-icons">
        <p>
          <Link to="/help">
            <span className="help">
              <GiHelp id="help-icon" /> HELP
            </span>
          </Link>
        </p>
        <p>
          <span className="help" onClick={handleAccountClick}>
            account <FaUserAlt className="account" />
          </span>
  
          {showAccountDropdown && (
            <div className="account-dropdown">
              <Link to='/auth/login'>login</Link>
              <Link to='/auth/signup'>signup</Link>
            </div>
          )}
        </p>
        <p>
          <Link to="/cart">
            <span className="help">
              <FaCartPlus /> Cart
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
