import { Context } from '../product/shopContext';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import './herocategories.css';
import { BiCategoryAlt } from 'react-icons/bi';
import { FcSmartphoneTablet } from 'react-icons/fc';
import { GiClothes, GiComputing, GiGamepad } from 'react-icons/gi';
import { TbHealthRecognition } from 'react-icons/tb';
import { LiaTvSolid } from 'react-icons/lia';
import { SiMarketo } from 'react-icons/si';
import { RiHomeOfficeFill } from 'react-icons/ri';

const Herocategories = () => {
  const { dispatch } = useContext(Context);

  const PhonesTablets = () => {
    dispatch({ type: "Phones & tablets", payload: 'Phones & tablets' });
  }

  const Sports= () => {
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

  
  return (
    <div className="hero-categories">
      
    <div className='cat-heading'>
      <BiCategoryAlt />
      <h2 className='cat-title'>categories</h2>
    </div>
    <Link to="/products">
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
    </Link>
  </div>
   );
};

export default Herocategories;
