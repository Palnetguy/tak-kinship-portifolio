import axios from "axios";
import { useEffect, useState } from "react";
import "../css/gallery.css";

import GalleryImage from "./gallery-adds/gallery-image";
import configHeaders from "./config-headers";
import GallerySlider from "./gallery-slider";
import GallaryCarousel from "./gallary-carousel";
import ImageSlider from "./Slider";

const Gallery = ({ setIsLoading }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const handleFetchImages = async () => {
      try {
        const response = await axios.get(
          "https://takkinship-backend.up.railway.app/api/gallery/",
          {
            headers: configHeaders,
          }
        );
        setIsLoading(false);
        console.log(response);
        console.log("test");
        console.log(response.data);
        setImages(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    handleFetchImages();
  }, []);
  //   console.log(document.querySelector(".testImg"));
  const [isOpenFullImage, setIsOpenFullImage] = useState(false);
  const [isOpenFullImageInSide, setIsOpenFullImageInSide] = useState(false);
  const [srcFullImage, setSrcFullImage] = useState("");
  // useEffect(() => {
  //   if (isOpenFullImage) {
  //     document.querySelector("html").style.overflow = "hidden";
  //   } else {
  //     document.querySelector("html").style.overflow = "auto";
  //   }
  // }, [isOpenFullImage]);
  //   const togleOpenFullImage = () => {};
  const handleOpenFullImage = (e) => {
    setSrcFullImage(e.target.src);
    // document.querySelector(".fullImage").appendChild(e.target);
    console.log(e.target);
    setIsOpenFullImage((prev) => !prev);
    setIsOpenFullImageInSide((prev) => !prev);
  };

  const handleOpenFullImageInSideClose = () => {
    setTimeout(() => {
      setIsOpenFullImage((prev) => !prev);
    }, 700);
    setIsOpenFullImageInSide((prev) => !prev);
  };

  return (
    <div className="gallery">
      <div className={`fullImage ${isOpenFullImage ? "visible" : ""}`}>
        <div className="cancel" onClick={handleOpenFullImageInSideClose}>
          close
        </div>
        <img
          className={` ${isOpenFullImageInSide ? "" : "close"}`}
          src={srcFullImage}
          alt=""
        />
      </div>
      {/* <img onClick={handleOpenFullImage} src={image} alt="" /> */}
      <ImageSlider images={images} />
      {/* <GallaryCarousel images={images} /> */}
      {/* <GallerySlider images={images} /> */}
      {/* {images.map((e) => (
        <div className="image" key={e.id}>
          <img
            // key={e.id}
            onClick={handleOpenFullImage}
            src={e.image}
            alt={"Image"}
          />
        </div>
      ))} */}
    </div>
  );
};
export default Gallery;
