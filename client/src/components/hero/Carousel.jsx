import React, { useState, useEffect } from 'react';
import {GrNext,GrPrevious} from 'react-icons/gr'
import './carousel.css';

const Carousel = ({ cards, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlideInterval]);

  return (
    <div className="carousel">
      <button className="carousel-button" onClick={prevSlide}>
      <GrPrevious/>
      </button>
      <div className="carousel-card">{cards[currentIndex]}</div>
      <button className="carousel-button-left" onClick={nextSlide}>
        <GrNext/>
      </button>
    </div>
  );
};

export default Carousel;
