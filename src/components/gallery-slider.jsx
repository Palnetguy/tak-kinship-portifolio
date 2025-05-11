import { useState, useEffect, useRef } from "react";
import "../css/gallery-slider.css";

const GallerySlider = ({ images }) => {
  return (
    <div className="gallery-container">
      {/* <h1>gallery</h1> */}
      <div class="list">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image}
            alt=""
            className={index === 0 ? "active" : ""}
          />
        ))}

        {/* <img
          src="https://images.pexels.com/photos/3828094/pexels-photo-3828094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/3509971/pexels-photo-3509971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/3022413/pexels-photo-3022413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/10768839/pexels-photo-10768839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/3591557/pexels-photo-3591557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/10399172/pexels-photo-10399172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/2581847/pexels-photo-2581847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/1670457/pexels-photo-1670457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/5312227/pexels-photo-5312227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/1703311/pexels-photo-1703311.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/1703311/pexels-photo-1703311.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
        />

        <img
          src="https://images.pexels.com/photos/5312227/pexels-photo-5312227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/1703311/pexels-photo-1703311.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
        /> */}
      </div>
    </div>
  );
};

export default GallerySlider;
