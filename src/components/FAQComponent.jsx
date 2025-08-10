// FAQComponent.jsx
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import "../css/FAQComponent.css";
import faqImg from "../images/customer-faq.png";
import axios from "axios";
import configHeaders from "./config-headers";
import { useInView } from "react-intersection-observer";
import configImages from "./configImages";
import { API_ENDPOINTS } from "../constants/api";

const FAQComponent = ({ setIsLoading }) => {
  // const faqData = [
  //   {
  //     title: "How can I create an account?",
  //     description:
  //       'To create an account, click on the "Sign Up" button on the top-right corner of the page. Fill out the required information and follow the instructions to complete the registration process.',
  //   },
  //   {
  //     title: "What payment methods are accepted?",
  //     description:
  //       "We accept various payment methods, including credit cards (Visa, MasterCard, American Express) and digital wallets (PayPal, Apple Pay). You can select your preferred payment option during the checkout process.",
  //   },
  //   {
  //     title: "Is there a return policy?",
  //     description:
  //       "Yes, we have a 30-day return policy. If you are not satisfied with your purchase, you can return the item within 30 days for a full refund. Please review our return policy for more details and instructions on initiating a return.",
  //   },
  //   {
  //     title: "How do I track my order?",
  //     description:
  //       "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to monitor the status and location of your package. Alternatively, you can log in to your account and check the order status.",
  //   },
  // ];

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const handleFetchFaqs = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.FAQ, {
          headers: configHeaders,
        });
        setIsLoading(false);
        setFaqData(response.data);
        console.log(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchFaqs();
  }, []);

  const [preTitleRef, preTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [titleRef, titleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [postTitleRef, postTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [imageRef, imageInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="faq">
      <h4
        // className="pretitle"
        className={`pretitle titleNotSeen ${
          preTitleInview ? "titleInView" : ""
        }`}
        ref={preTitleRef}
      >
        FAQ
      </h4>
      <h1
        // className=""
        className={`title titleNotSeen ${titleInview ? "titleInView" : ""}`}
        ref={titleRef}
      >
        Frequently Asked Questions
      </h1>
      <p
        // className="post-title"
        className={`post-title titleNotSeen ${
          postTitleInview ? "titleInView" : ""
        }`}
        ref={postTitleRef}
      >
        Got Questions? We've Got Answers! Explore common queries about our
        services, process, and more. Still have questions? Feel free to reach
        out
      </p>
      <main className="left-right">
        <div className="ltl-home">
          <FAQComponentCards faqData={faqData} />
        </div>
        <div className="rht-home" ref={imageRef}>
          <img
            // src={faqImg}
            src={
              configImages +
              "/TAK%20Kniship/website%20images/" +
              "onxtpj6bjuafzkke1ayr"
            }
            alt=""
            className={` imageOff ${imageInview ? "imageOn" : ""}`}
          />
        </div>
      </main>
    </div>
  );
};

const FAQComponentCards = ({ faqData }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef(null);

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useLayoutEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
    }
  }, [expandedIndex]);

  // useEffect(() => {
  //   const faqItems = document.querySelectorAll(".faq-itemContainer");

  //   const handleIntersection = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("faqIn");
  //       } else {
  //         // entry.target.classList.remove("faqIn");
  //       }
  //     });
  //   };

  //   const observerOptions = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //   };

  //   const observer = new IntersectionObserver(
  //     handleIntersection,
  //     observerOptions
  //   );

  //   faqItems.forEach((faqItem) => {
  //     observer.observe(faqItem);
  //   });

  //   // Cleanup the Intersection Observer when the component unmounts
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  const faqItems = document.querySelectorAll(".faq-itemContainer");

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("faqIn");
      } else {
        // entry.target.classList.remove("faqIn");
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  faqItems.forEach((faqItem) => {
    observer.observe(faqItem);
  });

  // Cleanup the Intersection Observer when the component unmounts

  return (
    <div className="faq-container">
      {faqData.map((item, index) => (
        <div className="faq-itemContainer" key={index}>
          <div
            className={`faq-item box ${
              index === expandedIndex ? "expanded" : ""
            }`}
          >
            <div className="faq-title " onClick={() => handleToggle(index)}>
              <h4 className="title-2">{item.title}</h4>
              <div
                className="chevron-icon"
                style={
                  index === expandedIndex
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0)" }
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1fa84f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </div>
            <div
              className="faq-description"
              style={{
                height:
                  index === expandedIndex ? descriptionHeight + "px" : "0px",
              }}
              ref={descriptionRef}
            >
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQComponent;
