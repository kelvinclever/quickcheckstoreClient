import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../public/images/logo2.jpg';
import { RiLogoutCircleLine, RiLoginCircleLine } from 'react-icons/ri';
import './navbar.css';
import { FaUserAlt, FaCartPlus } from 'react-icons/fa';
import { GiHelp } from 'react-icons/gi';
import { Context } from '../../admin/customerContext/customer.context';
import { useProductContext } from '../product/ProductsContext';

// Navbar Component
const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const Navigate = useNavigate();
  const { user, dispatch } = useContext(Context);
  const { products, filteredProducts, setFilteredProducts } = useProductContext();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);

    Navigate('/products');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    Navigate('/admin/login'); // Use Navigate for navigation
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
        {user ? (
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
        ) : (
          <>
            <div>
              <Link to="/auth/login">
                <RiLoginCircleLine /> login
              </Link>
            </div>
            <div>
              <Link to="/auth/signup">
                <RiLogoutCircleLine /> signup
              </Link>
            </div>
          </>
        )}
        <div>
          <Link to="/cart">
            <FaCartPlus /> Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
