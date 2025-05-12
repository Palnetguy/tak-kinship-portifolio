import "../css/slider.css";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// import './ImageSlider.css'; // Ensure this path matches your project structure

// const images = [
//   'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
//   'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
//   'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
//   'https://images.pexels.com/photos/34950/pexels-photo.jpg',
//   'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg',
//   'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
//   'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
//   'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
//   'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
//   'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg',
// ];

const ImageSlider = ({ images }) => {
  const swiperRef = useRef(null);

  return (
    <div
      className="slider-container"
      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay.start()}
    >
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        slidesPerView="auto"
        spaceBetween={40}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        className="swiper-container"
      >
        {images.map(({image}, index) => (
          <SwiperSlide key={index} className="slide">
            <img src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
