import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Paycard from "./Paycard.jsx";
import Carousel from "./Carousel";
import Newproducts from "./Newproducts.jsx";
import "./hero.css";
import Herocategories from "./Hero-categories.jsx";
const Hero = () => {
  const cards = [
    <SwiperSlide>
      <img
        src="https://ke.jumia.is/cms/2023/W27/CP/Sliders2/KE_HiiBaridi_Appliances_0623_S_rvsd_rvsd.jpg"
        alt=""
      />
    </SwiperSlide>,
    <SwiperSlide>
      <img
        src="https://ke.jumia.is/cms/2023/SIS/Adidas/W27/7/newds.png"
        alt=""
      />
    </SwiperSlide>,
    <SwiperSlide>
      <img
        src="https://ke.jumia.is/cms/2023/W27/CP/KE_Weekend_NewArrivals_0623_S.jpg"
        alt=""
      />
    </SwiperSlide>,
    <SwiperSlide>
      <img
        src="https://ke.jumia.is/cms/2023/W27/CP/Sliders/J23_Gen_S12.jpg"
        alt=""
      />
    </SwiperSlide>,
    <SwiperSlide>
      <img
        src="https://ke.jumia.is/cms/2023/W27/CP/Sliders/KE_HiiBaridi_Fashion_0623_S.jpg"
        alt=""
      />
    </SwiperSlide>,
  ];

  return (
    <div className="container-hero">
      <div className="hero">
        <div className="hero-left">
          <Herocategories />
        </div>

        <div className="hero-center">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <Carousel cards={cards} />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="hero-right">
          <div className="hero-right-top">
            <div>
              <Paycard />
            </div>
            <div>
              <Paycard />
            </div>
            <div>
              <Paycard />
            </div>
          </div>
          <div className="hero-right-bottom">
            <span>smart payment for smart people</span>
            <span>
              <button>explore our products</button>
            </span>
          </div>
        </div>
      </div>
      <div>
        <Newproducts />
      </div>
    </div>
  );
};

export default Hero;
