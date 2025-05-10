import aboutImg1 from "../images/about-img-1.png";
import aboutImg2 from "../images/about-img-2.png";
import aboutImg3 from "../images/about-img-3.png";
import "../css/about.css";
import configHeaders from "./config-headers";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import configImages from "./configImages";

const AboutUs = ({ setIsLoading, showAllInfo = false }) => {
  const weDeals = [
    {
      svg: (
        <svg
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path
                fill="#231F20"
                d="M0,9v47.574c0,2.211,2,4.051,5,3.176L16,56V0L4,4C1.613,4.797,0,6.789,0,9z"
              ></path>{" "}
              <path
                fill="#231F20"
                d="M59.383,4.156L48,8v56l12-4c2.18-0.645,4-2.414,4-4.625V8C64,5.789,62.25,3.438,59.383,4.156z"
              ></path>{" "}
              <polygon fill="#231F20" points="24,56 40,64 40,8 24,0 "></polygon>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
      title: "Worldwide Services",
    },
    {
      svg: (
        <svg
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>support</title>{" "}
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              {" "}
              <g
                id="support"
                fill="#000000"
                transform="translate(42.666667, 42.666667)"
              >
                {" "}
                <path d="M379.734355,174.506667 C373.121022,106.666667 333.014355,-2.13162821e-14 209.067688,-2.13162821e-14 C85.1210217,-2.13162821e-14 45.014355,106.666667 38.4010217,174.506667 C15.2012632,183.311569 -0.101643453,205.585799 0.000508304259,230.4 L0.000508304259,260.266667 C0.000508304259,293.256475 26.7445463,320 59.734355,320 C92.7241638,320 119.467688,293.256475 119.467688,260.266667 L119.467688,230.4 C119.360431,206.121456 104.619564,184.304973 82.134355,175.146667 C86.4010217,135.893333 107.307688,42.6666667 209.067688,42.6666667 C310.827688,42.6666667 331.521022,135.893333 335.787688,175.146667 C313.347976,184.324806 298.68156,206.155851 298.667688,230.4 L298.667688,260.266667 C298.760356,283.199651 311.928618,304.070103 332.587688,314.026667 C323.627688,330.88 300.801022,353.706667 244.694355,360.533333 C233.478863,343.50282 211.780225,336.789048 192.906491,344.509658 C174.032757,352.230268 163.260418,372.226826 167.196286,392.235189 C171.132153,412.243552 188.675885,426.666667 209.067688,426.666667 C225.181549,426.577424 239.870491,417.417465 247.041022,402.986667 C338.561022,392.533333 367.787688,345.386667 376.961022,317.653333 C401.778455,309.61433 418.468885,286.351502 418.134355,260.266667 L418.134355,230.4 C418.23702,205.585799 402.934114,183.311569 379.734355,174.506667 Z M76.8010217,260.266667 C76.8010217,269.692326 69.1600148,277.333333 59.734355,277.333333 C50.3086953,277.333333 42.6676884,269.692326 42.6676884,260.266667 L42.6676884,230.4 C42.6676884,224.302667 45.9205765,218.668499 51.2010216,215.619833 C56.4814667,212.571166 62.9872434,212.571166 68.2676885,215.619833 C73.5481336,218.668499 76.8010217,224.302667 76.8010217,230.4 L76.8010217,260.266667 Z M341.334355,230.4 C341.334355,220.97434 348.975362,213.333333 358.401022,213.333333 C367.826681,213.333333 375.467688,220.97434 375.467688,230.4 L375.467688,260.266667 C375.467688,269.692326 367.826681,277.333333 358.401022,277.333333 C348.975362,277.333333 341.334355,269.692326 341.334355,260.266667 L341.334355,230.4 Z">
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
      title: "Support 24/7",
    },
    {
      svg: (
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          class="bi bi-controller"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path>{" "}
            <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"></path>{" "}
          </g>
        </svg>
      ),
      title: "Easy To Reach",
    },
    {
      svg: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
              fill="#1C274C"
            ></path>{" "}
          </g>
        </svg>
      ),
      title: "First On Field",
    },
  ];

  // const experiencePercenatage = [
  //   {
  //     title: "App Development",
  //     percentage: 70,
  //   },
  //   {
  //     title: "UI/UX Design",
  //     percentage: 20,
  //   },
  //   {
  //     title: "Web Development",
  //     percentage: 55,
  //   },
  // ];

  const [experiencePercenatage, setExperiencePercenatage] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const handleFetchWorkExperience = async () => {
      try {
        const response = await axios.get(
          "https://takkinship-backend.up.railway.app/api/work-experience/",
          {
            headers: configHeaders,
          }
        );
        console.log(response);
        setExperiencePercenatage(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchWorkExperience();
  }, []);

  const [pretitle1Ref, pretitle1Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle2Ref, pretitle2Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle3Ref, pretitle3Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle4Ref, pretitle4Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle5Ref, pretitle5Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle6Ref, pretitle6Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle7Ref, pretitle7Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle8Ref, pretitle8Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle9Ref, pretitle9Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle10Ref, pretitle10Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle11Ref, pretitle11Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle12Ref, pretitle12Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [pretitle13Ref, pretitle13Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [Image1Ref, Image1Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [Image2Ref, Image2Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [Image3Ref, Image3Inview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="aboutUs">
      {/*  */}
      <main className="left-right">
        <div className="ltl-home">
          <p
            // className="pretitle"
            className={`pretitle titleNotSeen ${
              pretitle1Inview ? "titleInView" : ""
            }`}
            ref={pretitle1Ref}
          >
            About Us
          </p>
          <h1
            // className="title"
            className={`title titleNotSeen ${
              pretitle2Inview ? "titleInView" : ""
            }`}
            ref={pretitle2Ref}
          >
            The Best IT Solution <span className="unique-text">Since 2019</span>
          </h1>
          <p
            className={` titleNotSeen ${pretitle3Inview ? "titleInView" : ""}`}
            ref={pretitle3Ref}
          >
            We pride ourselves on being more than just developers; we are
            architects of change. Our journey began with a vision – to build a
            conglomerate that pioneers technological solutions for a brighter,
            connected future. Guided by this vision, we've developed
            groundbreaking projects like Telxul and Desn, setting the stage for
            a new era of tech-driven solutions in Africa and beyond.
          </p>

          {!showAllInfo && (
            <button
              href="#"
              className={`btn titleNotSeen ${
                pretitle4Inview ? "titleInView" : ""
              }`}
              ref={pretitle4Ref}
            >
              <p>MORE ABOUT US</p>
            </button>
          )}
        </div>
        <div className="rht-home" ref={Image1Ref}>
          <img
            src={
              configImages +
              "/TAK%20Kniship/website%20images/" +
              "v3w8s6w790yp9z7anzos"
            }
            alt=""
            className={`imageToRight ${Image1Inview ? "imageInview" : ""}`}
          />
        </div>
      </main>
      {/*  */}

      {showAllInfo && (
        <>
          <main className="left-right we-deals ">
            <div className="ltl-home">
              <h1
                // className="title"
                className={`title titleNotSeen ${
                  pretitle5Inview ? "titleInView" : ""
                }`}
                ref={pretitle5Ref}
              >
                We Deal With The Aspects Of Professional{" "}
                <span className="unique-text">IT Services</span>
              </h1>
              <p
                className={` titleNotSeen ${
                  pretitle6Inview ? "titleInView" : ""
                }`}
                ref={pretitle6Ref}
              >
                We specialize in professional IT services, ensuring excellence
                from strategy to execution. As architects of IT solutions, we
                propel businesses into the future. Elevate your IT experience
                with us.
              </p>
              <div
                // className=""
                className={`wedeal-cards titleNotSeen ${
                  pretitle7Inview ? "titleInView" : ""
                }`}
                ref={pretitle7Ref}
              >
                {weDeals.map((e) => (
                  <WedealCard svg={e.svg} title={e.title} />
                ))}
              </div>
            </div>
            <div className="rht-home" ref={Image2Ref}>
              <img
                src={
                  configImages +
                  "/TAK%20Kniship/website%20images/" +
                  "gr7aeez5cox8vohnrsws"
                }
                alt=""
                className={`imageToLeft ${Image2Inview ? "imageInview" : ""}`}
              />
            </div>
          </main>
          {/*  */}
          <main className="left-right">
            <div className="ltl-home">
              <h1
                className={`title titleNotSeen ${
                  pretitle8Inview ? "titleInView" : ""
                }`}
                ref={pretitle8Ref}
              >
                We Are Here With {new Date().getFullYear() - 2019}+ Years Of
                <span className="unique-text"> Experience</span>
              </h1>
              <p
                className={` titleNotSeen ${
                  pretitle9Inview ? "titleInView" : ""
                }`}
                ref={pretitle9Ref}
              >
                With {new Date().getFullYear() - 2019}+ years of seasoned
                experience, we bring proficiency to every project. Yet, we
                embrace each new challenge with a commitment to continual
                learning, ensuring our expertise evolves with the ever-changing
                landscape of technology.
              </p>
              <div className="">
                {experiencePercenatage.map((e) => (
                  <div className="percentageIncreament">
                    <div
                      className={`increamentContainer titleNotSeen ${
                        pretitle10Inview ? "titleInView" : ""
                      }`}
                      ref={pretitle10Ref}
                      style={{ "--delay": "000ms" }}
                    >
                      <div className="info">
                        <h6>App Development</h6>
                        <h5>{e.mobile_dev}%</h5>
                      </div>
                      <div className="meterContainer">
                        <div
                          style={{ width: `${e.mobile_dev}%` }}
                          className="meter"
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`increamentContainer titleNotSeen ${
                        pretitle11Inview ? "titleInView" : ""
                      }`}
                      ref={pretitle11Ref}
                      style={{ "--delay": "200ms" }}
                    >
                      <div className="info">
                        <h6>Web Development</h6>
                        <h5>{e.web_dev}%</h5>
                      </div>
                      <div className="meterContainer">
                        <div
                          style={{ width: `${e.web_dev}%` }}
                          className="meter"
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`increamentContainer titleNotSeen ${
                        pretitle12Inview ? "titleInView" : ""
                      }`}
                      ref={pretitle12Ref}
                      style={{ "--delay": "400ms" }}
                    >
                      <div className="info">
                        <h6>Desktop Development</h6>
                        <h5>{e.desktop_dev}%</h5>
                      </div>
                      <div className="meterContainer">
                        <div
                          style={{ width: `${e.desktop_dev}%` }}
                          className="meter"
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`increamentContainer titleNotSeen ${
                        pretitle13Inview ? "titleInView" : ""
                      }`}
                      ref={pretitle13Ref}
                      style={{ "--delay": "600ms" }}
                    >
                      <div className="info">
                        <h6>UI/UX Design</h6>
                        <h5>{e.ui_dev}%</h5>
                      </div>
                      <div className="meterContainer">
                        <div
                          style={{ width: `${e.ui_dev}%` }}
                          className="meter"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*  */}
            <div className="rht-home" ref={Image3Ref}>
              <img
                // src={aboutImg3}
                src={
                  configImages +
                  "/TAK%20Kniship/website%20images/" +
                  "i4j6clkkfvsvopzqzypl"
                }
                alt=""
                className={`imageToRight ${Image3Inview ? "imageInview" : ""}`}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AboutUs;

const WedealCard = ({ svg, title }) => {
  return (
    <div className="wedeal-card box box-hover">
      {svg}
      <h5 className="title-2">{title}</h5>
    </div>
  );
};

const PercentageIcreament = ({ title, percentage, className, ref }) => {
  return (
    <div className={`increamentContainer ${className}`} ref={ref}>
      <div className="info">
        <h6>{title}</h6>
        <h5>{percentage}%</h5>
      </div>
      <div className="meterContainer">
        <div style={{ width: `${percentage}%` }} className="meter"></div>
      </div>
    </div>
  );
};
