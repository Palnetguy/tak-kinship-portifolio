import React from "react";

import "../css/gallary-carousel.css";
export default function GallaryCarousel({ images }) {
  //   const images = [
  //     {
  //       url: "https://images.unsplash.com/photo-1706485220806-2d0d9ce98555?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/ein-hohes-gebaude-mit-einer-uhr-an-der-seite-cI09n4yMIYc",
  //       label: "Architecture Example 1",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1706146280538-620fa8cda080?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/ein-sehr-hohes-gebaude-mit-vielen-fenstern-3svDIdPOT6M",
  //       label: "Architecture Example 2",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1702298616106-adbe0f447455?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/ein-sehr-hohes-gebaude-mit-vielen-fenstern-ivYgEOo7MnQ",
  //       label: "Architecture Example 3",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1565363887713-783cd82d36d2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/weiss-graues-gebaudekonzept-8yOPWMS46CQ",
  //       label: "Architecture Example 4",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1701025034709-bef78e69d1ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/ein-paar-hohe-gebaude-mit-vielen-fenstern-duj9YsiNKvM",
  //       label: "Architecture Example 5",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1701824580548-4f285fc0b80a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/die-spiegelung-eines-gebaudes-in-den-fenstern-eines-anderen-gebaudes-QT6ltyDT7UA",
  //       label: "Architecture Example 6",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1558472306-75b150ac26eb?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/nahaufnahme-des-weissen-gebaudes-tKnda8e9ejM",
  //       label: "Architecture Example 7",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1713623210045-95d02b35c4a2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/ein-hohes-gebaude-mit-zwei-balkonen-und-einer-uhr-sYg7bcIodC8",
  //       label: "Architecture Example 8",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1700846968547-ace2dacd5e0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/eine-nahaufnahme-der-seite-eines-gebaudes-VvhIUx1lITA",
  //       label: "Architecture Example 9",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1700846978475-5f4dd936c00a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/eine-wand-aus-metallquadraten-und-quadraten-a_XIDnN6C0Y",
  //       label: "Architecture Example 10",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1707788620837-cd3efcce3ceb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/eine-nahaufnahme-einer-metallstruktur-mit-einem-himmelshintergrund-9u9t6gP8R-s",
  //       label: "Architecture Example 11",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1707788620837-cd3efcce3ceb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/eine-nahaufnahme-einer-metallstruktur-mit-einem-himmelshintergrund-9u9t6gP8R-s",
  //       label: "Architecture Example 11",
  //     },
  //     {
  //       url: "https://images.unsplash.com/photo-1707788620837-cd3efcce3ceb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       link: "https://unsplash.com/de/fotos/eine-nahaufnahme-einer-metallstruktur-mit-einem-himmelshintergrund-9u9t6gP8R-s",
  //       label: "Architecture Example 11",
  //     },
  //   ];

  return (
    <div className="gallary-carousel">
      <div className="carousel">
        <div className="carousel-control-button left">
          <input type="radio" name="carousel-control-input" />
        </div>
        <div className="carousel-control-button right">
          <input type="radio" name="carousel-control-input" defaultChecked />
        </div>

        <div className="carousel-rotation-direction">
          <ul
            className="carousel-item-wrapper"
            style={{ "--_num-elements": 11 }}
          >
            {images.map(({ image }, index) => (
              <li
                key={index}
                className="carousel-item"
                style={{
                  "--_index": index + 1,
                  "--_image-url": `url('${image}')`,
                }}
              >
                <a href={image} target="_blank" rel="noopener noreferrer">
                  {image}
                </a>
              </li>
            ))}
            {images.length < 13 &&
              images.slice(0, 13 - images.length).map(({ image }, index) => (
                <li
                  key={index + images.length}
                  className="carousel-item"
                  style={{
                    "--_index": index + 1 + images.length,
                    "--_image-url": `url('${image}')`,
                  }}
                >
                  <a href={image} target="_blank" rel="noopener noreferrer">
                    {image}
                  </a>
                </li>
              ))}

            <li className="carousel-ground"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
