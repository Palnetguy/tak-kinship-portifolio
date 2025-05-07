import { useInView } from "react-intersection-observer";
import "../css/offers.css";

import uiDesignIn from "../images/UI Development im.jpg";
import appDevIn from "../images/App Development im.png";
import webDevIn from "../images/Web Development im.jpg";
import desktopDevIn from "../images/Desktop Development im.jpg";

const Offers = () => {
  const [pretitleRef, pretitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [titleRef, titleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [ptitleRef, pInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [offerRef1, offerRef1Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [offerRef2, offerRef2Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [offerRef3, offerRef3Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [offerRef4, offerRef4Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="offers">
      <div className="heading">
        <h4
          className={`pretitle titleNotInview ${
            pretitleInview ? "offersInView" : ""
          }`}
          ref={pretitleRef}
          style={{ "--delay": "000ms" }}
        >
          OUR OFFERS
        </h4>
        <h1
          className={`title titleNotInview ${
            titleInview ? "offersInView" : ""
          }`}
          style={{ "--delay": "200ms" }}
          ref={titleRef}
        >
          What We’re Offering?
        </h1>
        <p
          className={`titleNotInview post-title ${
            pInview ? "offersInView" : ""
          }`}
          style={{ "--delay": "400ms" }}
          ref={ptitleRef}
        >
          We believe in transforming ideas into extraordinary solutions. With
          innovation at our core, we redefine expectations, turning goals into
          shared missions. Choose us for a journey beyond the ordinary.
        </p>
      </div>

      <div
        // className="offers-ech"
        className={`offers-ech `}
        // ref={offerRef1}
      >
        <OfferOne
          title={"Web Developement"}
          information={
            "We craft dynamic and responsive websites that go beyond aesthetics. Our web development services ensure seamless user experiences, robust functionality, and a strong online presence. From intuitive interfaces to scalable back-end solutions, we turn your digital vision into a captivating reality."
          }
          className={`${offerRef1Inview ? "offersInView" : ""}`}
          // ref={offerRef1}

          outerRef={offerRef1}
          image={webDevIn}
        />

        <OfferOne
          title={"App Developement"}
          information={
            "We excel in creating innovative and user-centric mobile applications. Our app development services encompass the entire process, from ideation to deployment. Whether it's iOS or Android, we specialize in turning ideas into engaging, high-performance applications that resonate with your audience."
          }
          className={`${offerRef2Inview ? "offersInView" : ""}`}
          outerRef={offerRef2}
          image={appDevIn}
        />

        <OfferOne
          title={"Desktop Developement"}
          information={
            "Experience the power of tailored desktop applications with Palnet. Our desktop development services are designed for efficiency, security, and user-friendliness. We bring your ideas to life with applications that seamlessly integrate into your workflow, ensuring a reliable and intuitive desktop experience."
          }
          className={`${offerRef3Inview ? "offersInView" : ""}`}
          outerRef={offerRef3}
          image={desktopDevIn}
        />

        <OfferOne
          title={"UI/UX Developement"}
          information={
            "We understand the pivotal role of design in user satisfaction. Our UI/UX design services focus on creating visually stunning interfaces coupled with an intuitive user experience. From wireframes to polished designs, we ensure that every interaction leaves a lasting impression, enhancing user engagement and satisfaction."
          }
          className={`${offerRef4Inview ? "offersInView" : ""}`}
          outerRef={offerRef4}
          image={uiDesignIn}
        />
      </div>
    </div>
  );
};

export default Offers;

const OfferOne = ({ title, information, image, className, outerRef }) => {
  return (
    <div className="offer-card " ref={outerRef}>
      <div className={`box ${className}`}>
        <div className="image">
          <img src={image} alt="" />
          {/* <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M1.293,11.293l4-4A1,1,0,1,1,6.707,8.707L3.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414l-4-4A1,1,0,0,1,1.293,11.293Zm17.414-4a1,1,0,1,0-1.414,1.414L20.586,12l-3.293,3.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.414ZM13.039,4.726l-4,14a1,1,0,0,0,.686,1.236A1.053,1.053,0,0,0,10,20a1,1,0,0,0,.961-.726l4-14a1,1,0,1,0-1.922-.548Z"></path>
            </g>
          </svg> */}
        </div>
        <div className="content">
          <div className="info">
            <h2 className="title-2">{title}</h2>
            <p>{information}</p>
          </div>
          <a href="" className="learn-more">
            Learn More
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
