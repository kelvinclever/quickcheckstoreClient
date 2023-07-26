import { useContext, useState, useEffect, useRef } from "react";
import "./sidenav.css";
import { Context } from "./admincontext/Context.jsx";
import {CiViewTable} from 'react-icons/ci'
import {FaProductHunt} from 'react-icons/fa'
import{CgProfile} from 'react-icons/cg'
import {MdAdminPanelSettings,MdPeopleAlt} from 'react-icons/md'
import {BiPurchaseTagAlt} from "react-icons/bi"
const Sidebar = () => {
  const { dispatch } = useContext(Context);

  // State to track the currently opened dropdown section
  const [openedDropdown, setOpenedDropdown] = useState(null);

  // Reference to the sidebar container
  const sidebarRef = useRef(null);

  const handleDropdown = (section) => {
    if (openedDropdown === section) {
      // If the same section is clicked again, close the dropdown
      setOpenedDropdown(null);
    } else {
      setOpenedDropdown(section);
    }
  };

  // Function to handle clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      // Click occurred outside the sidebar, so close the dropdown
      setOpenedDropdown(null);
    }
  };

  // Add event listener on component mount to detect clicks outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    dispatch({ type: "profile", payload: "profile" });
  };

  const handleProducts = () => {
    dispatch({ type: "products", payload: "products" });
  };

  const handleCustomers = () => {
    dispatch({ type: "customers", payload: "customers" });
  };

  const handleOrders = () => {
    dispatch({ type: "orders", payload: "orders" });
  };

  const handleAdmins = () => {
    dispatch({ type: "admins", payload: "admins" });
  };

  return (
    <div className="sidenav" ref={sidebarRef}>
      <div>
        <span onClick={handleProfile} className="profile">
          <CgProfile/>
          profile
        </span>
       
      </div>

      <div>
        <span onClick={() => handleDropdown("products")}><FaProductHunt/>roducts</span>
        {openedDropdown === "products" && (
          <div className="dropdown-content">
            {/* Dropdown content for 'Products' */}
            {/* Add your desired content for 'View', 'Add', and 'Update' */}
            <span onClick={handleProducts}> <CiViewTable/> View Products</span>
          
            <br />
            Add Product
            <br />
            Update Product
          </div>
        )}
      </div>

      <div>
        <span onClick={() => handleDropdown("customers")}><MdPeopleAlt/>customers</span>
        {openedDropdown === "customers" && (
          <div className="dropdown-content">
            {/* Dropdown content for 'Customers' */}
            {/* Add your desired content for 'View', 'Add', and 'Update' */}
            <span onClick={handleCustomers}> <CiViewTable/> View Customers</span>
           
            <br />
            Add Customer
            <br />
            Update Customer
          </div>
        )}
      </div>

      <div>
        <span onClick={() => handleDropdown("orders")}><BiPurchaseTagAlt/>orders</span>
        {openedDropdown === "orders" && (
          <div className="dropdown-content">
            {/* Dropdown content for 'Orders' */}
            {/* Add your desired content for 'View', 'Add', and 'Update' */}
            <span onClick={handleOrders}> <CiViewTable/> View Orders</span>
           
            <br />
            Add Order
            <br />
            Update Order
          </div>
        )}
      </div>

      <div>
        <span onClick={() => handleDropdown("admins")}><MdAdminPanelSettings/>admins</span>
        {openedDropdown === "admins" && (
          <div className="dropdown-content">
            {/* Dropdown content for 'Admins' */}
            {/* Add your desired content for 'View', 'Add', and 'Update' */}
            <span onClick={handleAdmins}><CiViewTable/>  View Admins</span>
           
            <span> Add Admin</span>
           
            <span>   Update Admin</span>
         
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
