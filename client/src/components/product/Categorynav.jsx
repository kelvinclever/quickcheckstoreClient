import React, { useContext, useState } from 'react';
import { Context } from './shopContext.jsx';
import { BiCategoryAlt } from 'react-icons/bi';
import { FcSmartphoneTablet } from 'react-icons/fc';
import { GiClothes, GiComputing, GiGamepad } from 'react-icons/gi';
import { TbHealthRecognition } from 'react-icons/tb';
import { LiaTvSolid } from 'react-icons/lia';
import { SiMarketo } from 'react-icons/si';
import { RiHomeOfficeFill } from 'react-icons/ri';
import './categorynav.css'
const Categorynav = () => {
  const { dispatch } = useContext(Context);

  const PhonesTablets = () => {
    dispatch({ type: "Phones & tablets", payload: 'Phones & tablets' });
  }

  const Fashion = () => {
    dispatch({ type: "Fashion", payload: 'Fashion' });
  }

  const Computing = () => {
    dispatch({ type: "Computing", payload: 'Computing' });
  }

  const Gaming = () => {
    dispatch({ type: "Gaming", payload: 'Gaming' });
  }

  const HealthBeauty = () => {
    dispatch({ type: "Health & beauty", payload: 'Health & beauty' });
  }

  const TVsAudio = () => {
    dispatch({ type: "TVs & Audio", payload: 'TVs & Audio' });
  }

  const Supermarket = () => {
    dispatch({ type: "Supermarket", payload: 'Supermarket' });
  }

  const HomeOffice = () => {
    dispatch({ type: "Home & Office", payload: 'Home & Office' });
  }

  // State to manage dropdown visibility
  const [showDropdown, setShowDropdown] = useState({});

  // Function to toggle dropdown visibility for a category
  const toggleDropdown = (category) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="hero-categories productpage">
      <div className='cat-heading'>
        <BiCategoryAlt />
        <h2>categories</h2>
      </div>
      <div className="cat-icon" onClick={() => {
        PhonesTablets();
        toggleDropdown('Phones & tablets');
      }}>
        <FcSmartphoneTablet />
        <h2>Phones & tablets</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Phones & tablets'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>Phones & tablets category description</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        Fashion();
        toggleDropdown('Fashion');
      }}>
        <GiClothes />
        <h2>Fashion</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Fashion'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>men</p>
            <p>women</p>
            <p>children</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        Computing();
        toggleDropdown('Computing');
      }}>
        <GiComputing />
        <h2>Computing</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Computing'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>Computing category description</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        Gaming();
        toggleDropdown('Gaming');
      }}>
        <GiGamepad />
        <h2>Gaming</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Gaming'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>Gaming category description</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        HealthBeauty();
        toggleDropdown('Health & beauty');
      }}>
        <TbHealthRecognition />
        <h2>Health & beauty</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Health & beauty'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>Health & beauty category description</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        TVsAudio();
        toggleDropdown('TVs & Audio');
      }}>
        <LiaTvSolid />
        <h2>TVs & Audio</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['TVs & Audio'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>TVs & Audio category description</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        Supermarket();
        toggleDropdown('Supermarket');
      }}>
        <SiMarketo />
        <h2>Supermarket</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Supermarket'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>Supermarket category description</p>
          </div>
        )}
      </div>
      <div className="cat-icon" onClick={() => {
        HomeOffice();
        toggleDropdown('Home & Office');
      }}>
        <RiHomeOfficeFill />
        <h2>Home & Office</h2>
        {/* Render the dropdown content based on visibility state */}
        {showDropdown['Home & Office'] && (
          <div className="dropdown-content">
            {/* Dropdown content here */}
            <p>Home & Office category description</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categorynav;
