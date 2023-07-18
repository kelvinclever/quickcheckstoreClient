import React from 'react';
import './herocategories.css';
import { BiCategoryAlt } from 'react-icons/bi';
import { FcSmartphoneTablet } from 'react-icons/fc';
import { GiClothes, GiComputing, GiGamepad } from 'react-icons/gi';
import { TbHealthRecognition } from 'react-icons/tb';
import { LiaTvSolid } from 'react-icons/lia';
import { SiMarketo } from 'react-icons/si';
import { RiHomeOfficeFill } from 'react-icons/ri';

const Herocategories = () => {
  return (
    <div className="hero-categories">
      <div className='cat-heading'>
        <BiCategoryAlt />
        <h2>categories</h2>
      </div>
      <div className="cat-icon">
        <FcSmartphoneTablet />
        <h2>Phones & tablets</h2>
      </div>
      <div className="cat-icon">
        <GiClothes />
        <h2>Fashion</h2>
      </div>
      <div className="cat-icon">
        <GiComputing />
        <h2>Computing</h2>
      </div>
      <div className="cat-icon">
        <GiGamepad />
        <h2>Gaming</h2>
      </div>
      <div className="cat-icon">
        <TbHealthRecognition />
        <h2>Health & beauty</h2>
      </div>
      <div className="cat-icon">
        <LiaTvSolid />
        <h2>TVs & Audio</h2>
      </div>
      <div className="cat-icon">
        <SiMarketo />
        <h2>Supermarket</h2>
      </div>
      <div className="cat-icon">
        <RiHomeOfficeFill />
        <h2>Home & Office</h2>
      </div>
    </div>
  );
};

export default Herocategories;
