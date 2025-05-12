import { Link } from "react-router-dom";
import homeImg from "../images/home-img.png";
import { useInView } from "react-intersection-observer";
import configImages from "./configImages";
import { useState } from "react";
import Drawer from "./ReusableDrawer";
import ContactUs from "./contact-us";
import GallaryCarousel from "./gallary-carousel";

const Home = () => {
  const [h1Ref, h1InView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [pRef, pInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    // delay: 300,
  });
  const [buttonRef, buttonInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    // delay: 500,
  });
  const [rightRef, rightInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    // delay: 500,
  });

  return (
    <main className="home">
      {/* <ExampleUsage />/ */}

      <main className="left-right">
        <div className={`ltl-home `}>
          <h1
            className={`isNotVisible ${h1InView ? "homeEmisVisible" : ""}`}
            ref={h1Ref}
            style={{ "--delay": "000ms" }}
          >
            We are <span className="unique-text">TAK Kinship</span> Developers.
          </h1>
          <p
            className={`isNotVisible ${pInView ? "homeEmisVisible" : ""}`}
            ref={pRef}
            style={{ "--delay": "200ms" }}
          >
            Welcome At TAK Kinship, we don't just build projects; we engineer
            solutions that redefine possibilities. As a growing tech startup,
            our passion is to harness cutting-edge technology to address
            real-world challenges and shape the future.
          </p>
          <Link to="about">
            <button
              href="#"
              className={`btn isNotVisible ${
                buttonInView ? "homeEmisVisible" : ""
              }`}
              ref={buttonRef}
              style={{ "--delay": "700ms" }}
            >
              <p>MORE ABOUT US</p>
            </button>
          </Link>
        </div>
        <div className="rht-home" ref={rightRef}>
          {/* <img
            className={`isNotVisibleIm ${rightInView ? "homeEmisVisible" : ""}`}
            src={
              configImages +
              "/TAK%20Kniship/website%20images/" +
              "k5bpzmwoynrhw52fiejy"
            }
            alt=""
          /> */}
          <img
            className={`isNotVisibleIm ${rightInView ? "homeEmisVisible" : ""}`}
            src={homeImg}
            alt=""
          />
        </div>
      </main>
    </main>
  );
};

export default Home;

// export default ExampleUsage;
