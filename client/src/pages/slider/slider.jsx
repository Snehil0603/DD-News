import React, { useState, useEffect } from 'react';
import './slider.css';

const ImageCarousel = () => {
  const images = [
    './assests/3705677.jpg',
    './assests/8182904.jpg',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 3000;

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Set up the timer to automatically move to the next image
  useEffect(() => {
    const interval = setInterval(nextImage, intervalTime);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt={`slide ${currentIndex}`}
        className="carousel-image"
      />
      <button className="carousel-button left" onClick={prevImage}>
        &#10094;
      </button>
      <button className="carousel-button right" onClick={nextImage}>
        &#10095;
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
