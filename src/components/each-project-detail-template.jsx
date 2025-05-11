import React, { useEffect, useState } from "react";
import "../css/each-project-detail-template.css";

import test from "../images/test-project-image.png";
import testProfilePic from "../images/testProfilePic.jpg";
import GallerySlider from "./gallery-slider";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import axios from "axios";
import configHeaders from "./config-headers";
import FAQComponent from "./FAQComponent";
import ContactUs from "./contact-us";
import Footer from "./footer";

export default function EachProjectDetailTemplate({
  setAllDoneLoading,
  handlePolicy,
  handleTerms,
  handleProjId,
}) {
  const paramsObj = useParams();
  console.log(paramsObj);
  const [projectData, setProjectData] = useState({});
  const [projectWeb, setProjectWeb] = useState([]);
  const [isLoadingMain, setLoadingMain] = useState(true);
  const [isLoadingPolicy, setLoadingPolicy] = useState(true);
  const [isLoadingTerms, setLoadingTerms] = useState(true);
  useEffect(() => {
    const handleFetchProject = async () => {
      setLoadingMain(true);
      try {
        const response = await axios.get(
          `https://takkinship-backend.up.railway.app/api/project/${paramsObj.projectId}`,
          {
            headers: configHeaders,
          }
        );
        console.log(response);
        console.log(response.data);
        setProjectData(response.data);
        console.log(response.data.project_category);
        if (response.data.project_category == "Web Application") {
          try {
            const response = await axios.get(
              `https://takkinship-backend.up.railway.app/api/project/${paramsObj.projectId}/web-applications/`,
              {
                headers: configHeaders,
              }
            );
            setProjectWeb(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        setLoadingMain(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchProject();
  }, []);
  useEffect(() => {
    const handleFetchPolicy = async () => {
      setLoadingPolicy(true);
      try {
        const response = await axios.get(
          // `https://takkinship-backend.up.railway.app/api/project/${paramsObj.projectId}`,
          `https://takkinship-backend.up.railway.app/api/projects/${paramsObj.projectId}/policy/`,
          {
            headers: configHeaders,
          }
        );
        // console.log(response);
        console.log(response.data.description);
        // setProjectData(response.data);
        handlePolicy(response.data.description);
        // console.log(response.data.type);
        setLoadingPolicy(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchPolicy();
  }, []);
  useEffect(() => {
    const handleFetchPolicy = async () => {
      setLoadingTerms(true);
      try {
        const response = await axios.get(
          // `https://takkinship-backend.up.railway.app/api/project/${paramsObj.projectId}`,
          `https://takkinship-backend.up.railway.app/api/projects/${paramsObj.projectId}/terms/`,
          {
            headers: configHeaders,
          }
        );
        // console.log(response);
        console.log(response.data.description);
        // setProjectData(response.data);
        // console.log(response.data.type);
        handleTerms(response.data.description);
        setLoadingTerms(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchPolicy();
  }, []);

  const [sideLeftRef, sideLeftInview] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [sideRightRef, sideRightInview] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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
    if (
      !loadingFaQs &&
      !loadingContactInfo &&
      !loadingFooter &&
      !isLoadingMain &&
      !isLoadingPolicy &&
      !isLoadingTerms
    ) {
      console.log("all Done ------------------------------------");
      console.log(loadingFaQs);
      setAllDoneLoading(true);
    } else {
      console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(loadingFaQs, loadingContactInfo);
    }
  }, [
    loadingFaQs,

    loadingContactInfo,
    loadingFooter,
    isLoadingMain,
    isLoadingPolicy,
    isLoadingTerms,
  ]);

  return (
    <div className="each-project-detail-template">
      <div className="top">
        <h1 className="title">
          {projectData.title} - {projectData.quote}
        </h1>

        <p>
          Type: <span>{projectData.project_category}</span>
        </p>
      </div>

      {/* about this project */}

      {projectData.about_project && (
        <div className="about-this-project">
          <div className="right-left">
            <div className="info">
              <h2 className="title-2">About this project</h2>
              <p>{projectData.about_project}</p>

              {/* tech stack */}
              <h2 className="title-2">What technologies were used?</h2>
              <div className="tech-stack">
                {projectData.tech_stack &&
                  projectData.tech_stack.map((tech, index) => {
                    return (
                      <div className="tech-stack-item" key={index}>
                        <p>{index + 1}.</p>
                        <p>{tech.language}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="image">
              <img
                src={projectData.images && projectData.images.about}
                alt=""
              />
              {/* <h1>Image Here</h1> */}
            </div>
          </div>
        </div>
      )}
      {/* project challenges */}

      {projectData.challenges_faced && (
        <div className="project-challenges">
          <div className="right-left">
            <div className="info">
              <h2 className="title-2">Project Challenges</h2>
              <p>{projectData.challenges_faced}</p>
            </div>
            <div className="image">
              <img
                src={projectData.images && projectData.images.challenge}
                alt=""
              />
              {/* <h1>Image Here</h1> */}
            </div>
          </div>
        </div>
      )}
      {/* features of the project */}

      {projectData.features && projectData.features.length > 0 && (
        <div className="features">
          <h2 className="title-2">Features of the project</h2>
          <ul className="features-list">
            {projectData.features &&
              projectData.features.map((feature, index) => {
                return (
                  <li className="feature-item box" key={index}>
                    <div className="head">
                      <p>{index + 1 < 9 ? "0" + (index + 1) : index + 1}.</p>
                      <p className="title">{feature.title}</p>
                    </div>
                    <p className="description">{feature.description}</p>
                  </li>
                );
              })}
            {/* <li className="feature-item box">
            <div className="head">
              <p>01.</p>
              <p className="title">Secure and private communication</p>
            </div>
            <p className="description">
              All communication on the platform is secure and private. The
              platform uses the Ethereum blockchain to ensure that all
              communication is transparent and secure.
            </p>
          </li>
          <li className="feature-item box">
            <div className="head">
              <p>02.</p>
              <p className="title">Multi language support</p>
            </div>
            <p className="description">
              The platform supports multiple languages, which makes it easy for
              users to communicate with each other in their preferred language.
            </p>
          </li>
          <li className="feature-item box">
            <div className="head">
              <p>03.</p>
              <p className="title">
                Real time messaging with typing indication
              </p>
            </div>
            <p className="description">
              The platform allows users to send messages to each other in real
              time. The platform also shows when a user is typing, which makes
              it easy for users to know when someone is responding to their
              message.
            </p>
          </li>
          <li className="feature-item box">
            <div className="head">
              <p>04.</p>
              <p className="title">Read receipts</p>
            </div>
            <p className="description">
              The platform allows users to know when someone has read their
              message. This makes it easy for users to know when someone has
              seen their message.
            </p>
          </li>
          <li className="feature-item box">
            <div className="head">
              <p>05.</p>
              <p className="title">Emojis, stickers and GIFs</p>
            </div>
            <p className="description">
              The platform allows users to send emojis, stickers and GIFs to
              each other. This makes it easy for users to add a personal touch
              to their messages.
            </p>
          </li>
          <li className="feature-item box">
            <div className="head">
              <p>06.</p>
              <p className="title">File sharing and preview</p>
            </div>
            <p className="description">
              The platform allows users to share files with each other. The
              platform also allows users to preview files before downloading
              them, which makes it easy for users to know what they are
              downloading.
            </p>
          </li> */}
          </ul>
        </div>
      )}
      {/* client feedback */}
      {projectData.client && (
        <div className="clients-feedback">
          {/* <h1 className="title">Client Feedback</h1> */}

          <div className="clients-feedback-card box">
            <div className="head">
              <div className="tt">
                <h1 className="title">What our client says</h1>
              </div>
              <p>
                We partner with some some amazing people! Here's what they say
                about us.
              </p>
            </div>
            <div className="image">
              <img
                src={projectData.client && projectData.client.profile_image}
                alt=""
              />
              {/* <h1>Image Here</h1> */}
            </div>
            <div className="name-loc">
              <h2 className="title-2">
                {projectData.client && projectData.client.name}
              </h2>
              <p className="location">
                {projectData.client && projectData.client.location}
              </p>
            </div>
            <div className="rating">
              <p>
                {projectData.client && "⭐".repeat(projectData.client.rating)}
              </p>
            </div>
            <p>"{projectData.client && projectData.client.message}"</p>
          </div>

          {/*  */}
        </div>
      )}
      {/* <style>
  
</style> */}

      <FAQComponent setIsLoading={handleLoadingFaQs} />
      <ContactUs setIsLoading={handleLoadingContactInfo} />
      <Footer setIsLoading={handleLoadingFooter} />
    </div>
  );
}
