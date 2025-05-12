import React, { useEffect, useState } from "react";
import "../css/each-service-template-page.css";
import { Link } from "react-router-dom";

import test from "../images/web-development_hero_img-600x551.png";
import FAQComponent from "./FAQComponent";
import ContactUs from "./contact-us";
import Footer from "./footer";
import Drawer from "./ReusableDrawer";

export default function EachServiceTemplatePage({
  setAllDoneLoading,
  headingEachService,
  whychooseus,
  servicesEachService,
  processTimeline,
  technologiesEachService,
}) {
  // setAllDoneLoading(true);

  const [loadingFaQs, setLoadingFaQs] = useState(true);

  const handleLoadingFaQs = (isLoading) => {
    setLoadingFaQs(isLoading);
  };

  const [loadingContactInfo, setLoadingContactInfo] = useState(true);

  const handleLoadingContactInfo = (isLoading) => {
    setLoadingContactInfo(isLoading);
  };

  const [loadingFooter, setLoadingFooter] = useState(true);

  const handleLoadingFooter = (isLoading) => {
    setLoadingFooter(isLoading);
  };

  useEffect(() => {
    if (!loadingFaQs && !loadingContactInfo && !loadingFooter) {
      setAllDoneLoading(true);
    } else {
      // console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      // console.log(
      //   loadingAbout,
      //   loadingClients,
      //   loadingFaQs,
      //   loadingPortFolio,
      //   loadingTeam,
      //   loadingTestimonial,
      //   loadingContactInfo
      // );
    }
  }, [
    loadingFaQs,

    loadingContactInfo,
    loadingFooter,
    // allDoneLoading,
    setAllDoneLoading,
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <div className="each-service-template-page">
      {/* head */}
      <HeadingEachService
        headingEachService={headingEachService}
        openDrawer={openDrawer}
      />
      {/* Why Choose Us as you */}
      <WhyChooseUsEachService whychooseus={whychooseus} />
      {/*  the services  */}
      <ServicesEachService servicesEachService={servicesEachService} />
      {/* the process */}
      <ProcessTimeline processTimeline={processTimeline} />
      {/* technologies */}
      <TechnologiesEachService
        technologiesEachService={technologiesEachService}
        openDrawer={openDrawer}
      />

      <FAQComponent setIsLoading={handleLoadingFaQs} />
      <ContactUs setIsLoading={handleLoadingContactInfo} />
      <Footer setIsLoading={handleLoadingFooter} />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <ContactUs isSummary={true} setIsLoading={handleLoadingContactInfo} />
      </Drawer>
    </div>
  );
}

function TechnologiesEachService({ technologiesEachService, openDrawer }) {
  const [infoData, setInfoData] = React.useState(
    technologiesEachService.techstack[0]
  );

  const refArr = technologiesEachService.techstack.map(() => React.createRef());
  useEffect(() => {
    refArr[0].current.classList.add("active");
  }, []);
  // refArr[0].current.classList.add("active");
  const handleMouseOver = (index) => {
    refArr.forEach((ref) => {
      ref.current.classList.remove("active");
    });
    refArr[index].current.classList.add("active");
    console.log(refArr[index].current);
    console.log(technologiesEachService.techstack[index]);
    setInfoData(technologiesEachService.techstack[index]);
  };
  const handleMouseOut = (index) => {
    // refArr[index].current.classList.remove("active");
    console.log(refArr[index].current);
  };
  return (
    <div className="technologies-each-service">
      <div className="top">
        <h1 className="title">{technologiesEachService.title}</h1>
        <p>{technologiesEachService.description}</p>
      </div>

      <div className="info">
        <div className="left-right">
          {/* list */}
          <div className="tech-stack">
            {/*  */}
            {technologiesEachService.techstack.map((item, index) => {
              const ref = refArr[index];
              return (
                <div
                  className={"item"}
                  key={index}
                  ref={ref}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={() => handleMouseOut(index)}
                >
                  <div className="ovl">
                    <div className="in"></div>
                  </div>
                  <div className="cont">
                    <p>{String(index + 1).padStart(2, "0")}.</p>
                    <div>
                      <h1 className="title-2">{item.name}</h1>
                      <div className="icon">
                        <img src={item.icon} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="item">
              <div className="ovl">
                <div className="in"></div>
              </div>
              <div className="cont">
                <p>01.</p>
                <div>
                  <h1 className="title-2">JAVASCRIPT</h1>
                  <div className="icon"></div>
                </div>
              </div>
            </div> */}

            {/*  */}
          </div>
          {/* info-each-inlist */}
          <div className="info-each-list">
            <div className="image">
              <div className="icon">
                <img src={infoData.icon} alt="" />
              </div>
            </div>
            <h2 className="title-2">{infoData.name}</h2>

            <p>{infoData.description}</p>

            <button
              href="#"
              className={`btn contact-cta `}
              onClick={openDrawer}
              // ref={buttonRef}
              // style={{ "--delay": "700ms" }}
            >
              <p>SHARE YOUR IDEA</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesEachService({ servicesEachService }) {
  return (
    <div className="services-each-service">
      <div className="top">
        <h1 className="title">{servicesEachService.title}</h1>
        <p>{servicesEachService.description}</p>
      </div>

      {/* listing */}

      <div className="services-each">
        {servicesEachService.servicesEachServicelist.map((item, index) => {
          return (
            <div className="item box" key={index}>
              <h3 className="title-2">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WhyChooseUsEachService({ whychooseus }) {
  return (
    <div className="why-choose-us">
      <div className="top">
        <h1 className="title">{whychooseus.title}</h1>
        <p>{whychooseus.description}</p>
      </div>

      {/* listing */}
      <div className="left-right">
        <div className="info">
          {whychooseus.whychooseuslist.map((item, index) => {
            return (
              <div className="item" key={index}>
                <h3 className="title-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
          {/* <div className="item">
            <h3 className="title-2">Full-Stack Development</h3>
            <p>
              We handle every layer of your product, from frontend development
              and backend development to DevOps, delivering production-ready
              platforms.
            </p>
          </div> */}
        </div>
        <div className="image">
          <img src={test} alt="" />
        </div>
      </div>
    </div>
  );
}

function HeadingEachService({ headingEachService, openDrawer }) {
  return (
    <div className="heading-each-service">
      <div className="left-right">
        <div className="info">
          <div className="title-pt">
            <h1 className="title">{headingEachService.title}</h1>
            <div className="subText">
              <h1 className="title">{headingEachService.subtitle}</h1>
              <div className="experience">
                <p>
                  + <span>{headingEachService.experience} years</span> in the
                  industry
                </p>
                <p>
                  + <span>{headingEachService.projects}</span> software projects
                </p>
              </div>
            </div>
          </div>
          <div className="description">
            <div>
              <p>{headingEachService.description}</p>
            </div>

            <div className="contact-side">
              <p>Want to know more details and learn how we can help?</p>

              <button
                href="#"
                className={`btn contact-cta `}
                onClick={openDrawer}
                // ref={buttonRef}
                // style={{ "--delay": "700ms" }}
              >
                <p>LET'S GET IN TOUCH</p>
              </button>
            </div>
          </div>
        </div>
        <div className="image">
          <img src={test} alt="" />
        </div>
      </div>
    </div>
  );
}

const ProcessTimeline = ({ processTimeline }) => {
  return (
    <div className="process-timeline">
      <div className="process-header">
        <h1 className=" animated-childprocess-title">
          {processTimeline.title}
        </h1>
        <p className="process-subtitle">{processTimeline.description}</p>
        <div className="process-divider">
          <div className="process-divider-accent"></div>
        </div>
      </div>

      <div className="process-steps">
        {processTimeline.steps.map((step, index) => (
          <div key={index} className="process-step">
            <div className=" step-number">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="step-icon">
              <div className="icon-box">
                <svg
                  height="200px"
                  width="200px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  fill="#000"
                >
                  <path
                    d="M335.921 318.784c0-7.689 2.994-14.918 8.432-20.356l59.166-59.166H234.97c-15.873 0-28.786-12.913-28.786-28.786s12.913-28.786 28.786-28.786h168.548l-59.166-59.166c-5.437-5.437-8.432-12.666-8.432-20.356s2.994-14.918 8.432-20.355c5.437-5.437 12.666-8.431 20.356-8.431s14.918 2.994 20.355 8.432L493.369 190.12c5.437 5.437 8.432 12.666 8.432 20.355s-2.994 14.917-8.432 20.355L385.063 339.139c-5.437 5.437-12.665 8.432-20.355 8.432s-14.918-2.993-20.356-8.431-8.431-12.667-8.431-20.356z"
                    fill="transparent"
                  />
                  <path
                    className="st0"
                    d="M364.708 357.77c-10.412 0-20.203-4.055-27.566-11.417-7.364-7.365-11.419-17.155-11.419-27.567 0-10.413 4.055-20.204 11.418-27.567l41.755-41.754H234.97c-21.497 0-38.985-17.489-38.985-38.985s17.489-38.985 38.985-38.985h143.925l-41.753-41.753c-7.364-7.365-11.419-17.154-11.419-27.567 0-10.412 4.055-20.203 11.418-27.566 7.365-7.364 17.155-11.418 27.567-11.418s20.203 4.055 27.566 11.418L500.58 182.915c7.364 7.365 11.419 17.154 11.419 27.566s-4.055 20.203-11.418 27.566L392.276 346.351c-7.364 7.364-17.154 11.419-27.568 11.419zM234.97 191.891c-10.249 0-18.587 8.338-18.587 18.587s8.338 18.587 18.587 18.587h168.548a10.199 10.199 0 017.212 17.411l-59.166 59.165a18.465 18.465 0 00-5.443 13.144c0 4.965 1.934 9.632 5.444 13.144a18.47 18.47 0 0013.144 5.443c4.965 0 9.632-1.934 13.144-5.444l108.305-108.306a18.466 18.466 0 005.444-13.143c0-4.964-1.934-9.632-5.444-13.144L377.853 89.029a18.466 18.466 0 00-13.144-5.444 18.474 18.474 0 00-13.145 5.444 18.465 18.465 0 00-5.443 13.143 18.47 18.47 0 005.444 13.144l59.166 59.165a10.199 10.199 0 01-7.212 17.411l-168.549-.001z"
                    // fill="red"
                  />
                  <path
                    d="M414.088 280.477c-2.61 0-5.221-.995-7.212-2.987-3.983-3.983-3.983-10.441 0-14.425l1.728-1.728c3.983-3.983 10.441-3.983 14.425 0 3.983 3.983 3.983 10.441 0 14.425l-1.728 1.728a10.169 10.169 0 01-7.213 2.987zM435.895 258.67c-2.61 0-5.221-.995-7.212-2.987-3.983-3.983-3.983-10.441 0-14.425l38.367-38.367c3.983-3.983 10.441-3.983 14.425 0 3.983 3.983 3.983 10.441 0 14.425l-38.367 38.367a10.169 10.169 0 01-7.213 2.987z"
                    // fill="#248a9c"
                    className="st0"
                  />
                  <path
                    d="M126.937 430.182L18.631 321.876c-5.437-5.437-8.432-12.666-8.432-20.356s2.994-14.917 8.432-20.355l108.306-108.306c5.436-5.437 12.665-8.432 20.355-8.432s14.918 2.994 20.356 8.432c5.437 5.437 8.432 12.666 8.432 20.355s-2.994 14.918-8.432 20.355l-59.166 59.166H277.03c15.873 0 28.786 12.913 28.786 28.786 0 15.873-12.913 28.786-28.786 28.786H108.482l59.166 59.166c5.437 5.437 8.432 12.666 8.432 20.356s-2.994 14.918-8.432 20.355c-5.437 5.437-12.666 8.431-20.356 8.431-7.689-.002-14.918-2.996-20.355-8.433z"
                    fill="transparent"
                  />
                  <path
                    d="M147.292 448.812c-10.412 0-20.203-4.055-27.566-11.417h-.001L11.419 329.089C4.055 321.723 0 311.932 0 301.52s4.055-20.203 11.418-27.566l108.306-108.306c7.363-7.363 17.153-11.419 27.567-11.419 10.413 0 20.205 4.055 27.567 11.418 7.363 7.365 11.418 17.154 11.418 27.567s-4.055 20.203-11.418 27.566l-41.755 41.754H277.03c21.497 0 38.985 17.489 38.985 38.985s-17.489 38.985-38.985 38.985H133.105l41.754 41.754c7.364 7.365 11.419 17.154 11.419 27.567 0 10.412-4.055 20.203-11.418 27.566-7.366 7.367-17.155 11.421-27.568 11.421zm-13.144-25.843c3.512 3.511 8.18 5.444 13.144 5.444s9.633-1.934 13.145-5.444a18.465 18.465 0 005.443-13.143 18.47 18.47 0 00-5.444-13.144l-59.166-59.165a10.199 10.199 0 017.212-17.411H277.03c10.249 0 18.587-8.338 18.587-18.587s-8.338-18.587-18.587-18.587H108.482a10.199 10.199 0 01-7.212-17.411l59.166-59.165c3.511-3.511 5.443-8.179 5.443-13.143s-1.934-9.632-5.444-13.144a18.465 18.465 0 00-13.144-5.443 18.471 18.471 0 00-13.143 5.443L25.842 288.377a18.469 18.469 0 00-5.443 13.143c0 4.965 1.934 9.632 5.444 13.145l108.305 108.304z"
                    // fill="#248a9c"
                    className="st0"
                  />
                </svg>
              </div>
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default ProcessTimeline;
