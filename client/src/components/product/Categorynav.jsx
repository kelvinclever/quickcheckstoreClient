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

  const Sports = () => {
    dispatch({ type: "Sports", payload: 'Sports' });
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
  const AllProducts= () => {
    dispatch({ type: "AllProducts", payload: 'AllProducts' });
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
    <div>
      <div>
        <h1 onClick={AllProducts}>All in our shop</h1>
      </div>
    <div className="hero-categories">
      <div className='cat-heading'>
        <BiCategoryAlt />
        <h2 className='cat-title'>categories</h2>
      </div>
      <div className="cat-icon">
        <FcSmartphoneTablet />
        <h3 className='cat-title' onClick={PhonesTablets}>Phones & tablets</h3>
      </div>
      <div className="cat-icon">
        <GiClothes />
        <h3  className='cat-title' onClick={Sports}>Sports</h3>
      </div>
      <div className="cat-icon">
        <GiComputing />
        <h3  className='cat-title' onClick={Computing}>Computing</h3>
      </div>
      <div className="cat-icon">
        <GiGamepad />
        <h3  className='cat-title' onClick={Gaming}>Gaming</h3>
      </div>
      <div className="cat-icon">
        <TbHealthRecognition />
        <h3  className='cat-title' onClick={HealthBeauty}>Health & beauty</h3>
      </div>
      <div className="cat-icon">
        <LiaTvSolid />
        <h3  className='cat-title' onClick={TVsAudio}>TVs & Audio</h3>
      </div>
      <div className="cat-icon">
        <SiMarketo />
        <h3  className='cat-title'onClick={Supermarket}>Supermarket</h3>
      </div>
      <div className="cat-icon">
        <RiHomeOfficeFill />
        <h3  className='cat-title' onClick={HomeOffice}>Home & Office</h3>
      </div>
    </div>
    <div>
    <h1 className='brand'>our brands</h1>
    </div>
    </div>
  );
}

export default Categorynav;
