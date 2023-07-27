import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Logo from '../../../public/images/logo2.jpg';
import { RiLogoutCircleLine, RiLoginCircleLine } from 'react-icons/ri';
import './navbar.css';
import { FaUserAlt, FaCartPlus } from 'react-icons/fa';
import { GiHelp } from 'react-icons/gi';
import { Context } from '../../admin/admincontext/Context';
import { useProductContext } from '../product/ProductsContext';

// Navbar Component
const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const Navigate=useNavigate()
  const { dispatch } = useContext(Context);
  const { products, filteredProducts, setFilteredProducts } = useProductContext();
// Use useHistory hook

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()),
     
    );
    setFilteredProducts(filtered);
    
    Navigate ("/products")
    // Check if the current location is not the products page, then navigate to it.
   
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/admin/login'); // Use history.push for navigation
  };

  const handleAccountClick = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  return (
    <div className="nav-bar">
      <div className="logo-main">
        <Link to="/">
          <img src={Logo} alt="" srcSet="" />
        </Link>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleSearchChange}
        />
       
        <button className="searchbtn" onClick={handleSearchButtonClick}>

          SEARCH
        </button>
      </div>
      <div className="nav-icons">
        <div>
          <Link to="/help">
            <GiHelp id="help-icon" /> HELP
          </Link>
        </div>
        <div>
          <span className="nav-icons" onClick={handleAccountClick}>
            account <FaUserAlt className="account" />
          </span>

          {showAccountDropdown && (
            <div className="account-dropdown">
              <Link to="/userprofile">profile</Link>
              <button className="Logoutbtn" onClick={handleLogout}>
              
                logout
              </button>
            </div>
          )}
        </div>
        <div>
          <Link to="/cart">
            <FaCartPlus /> Cart
          </Link>
        </div>
        <div>
          <Link to="/auth/login">
            <RiLogoutCircleLine /> login
          </Link>
        </div>
        <div>
          <Link to="/auth/signup">
            <RiLoginCircleLine /> signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
