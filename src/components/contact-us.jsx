// ContactUs.jsx

import { useEffect, useState } from "react";
import "../css/contact-us.css";
import emailIcon from "../images/svgs/email-9-svgrepo-com.svg";
import phoneIcon from "../images/svgs/phone-fill-svgrepo-com.svg";
import locationIcon from "../images/svgs/location-pin-svgrepo-com.svg";
import igIcon from "../images/svgs/instagram-svgrepo-com.svg";
import configHeaders from "./config-headers";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/api";

const ContactUs = ({ setIsLoading, isSummary }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      ...formData,
      phone_number: "0700000000",
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_US, {
        method: "POST",

        headers: configHeaders,

        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsSubmitting(false);
      setFormData({ name: "", subject: "", email: "", message: "" });
    }
  };

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

  const [contactTitleRef, contactTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [contactEmailRef, contactEmailInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [contactNumberRef, contactNumberInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [contactLocationRef, contactLocationInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [contactNameRef, contactNameInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [inputNameRef, inputNameInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [inputSubjectRef, inputSubjectInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [inputEmailRef, inputEmailInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [inputMessageRef, inputMessageInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [inputButtonRef, inputButtonInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [mapRef, mapInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [contactUsInfo, setContactUsInfo] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const handleFetchContactUsInfo = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CONTACT_COMPANY_INFO, {
          headers: configHeaders,
        });
        console.log("Contact-us");
        console.log(response);

        setContactUsInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchContactUsInfo();
  }, []);

  return (
    <div className={`contactUs ${isSummary ? "summary" : ""}`}>
      {/* Replace the following with your existing code */}
      {/* ... (existing code) */}
      <h4
        // className="pretitle"
        className={`pretitle titleNotSeen ${
          preTitleInview ? "titleInView" : ""
        }`}
        ref={preTitleRef}
      >
        CONTACT
      </h4>
      <h1
        // className="title"
        className={`title titleNotSeen ${titleInview ? "titleInView" : ""}`}
        ref={titleRef}
      >
        Contact Us For Any Questions
      </h1>
      <p
        // className=""
        className={`post-title titleNotSeen ${
          postTitleInview ? "titleInView" : ""
        }`}
        ref={postTitleRef}
      >
        Ready to Innovate Together? Have a project in mind or curious about our
        services? Contact us, and let's start a conversation. We're here to turn
        your ideas into extraordinary solutions.
      </p>
      <main className="left-right">
        <div className="ltl-home">
          <h2
            // className="title-2"
            className={`title-2 titleNotSeen ${
              contactTitleInview ? "titleInView" : ""
            }`}
            ref={contactTitleRef}
          >
            Contact Info :
          </h2>
          {contactUsInfo.map((e) => (
            <div className="contactInfo" key={e.id}>
              <div className="info" ref={contactEmailRef}>
                <img
                  src={emailIcon}
                  alt=""
                  className={`titleNotSeen ${
                    contactEmailInview ? "titleInView" : ""
                  }`}
                />
                <h5
                  className={`titleNotSeen ${
                    contactEmailInview ? "titleInView" : ""
                  }`}
                >
                  {e.email}
                </h5>
              </div>
              <div className="info" ref={contactNumberRef}>
                <img
                  src={phoneIcon}
                  alt=""
                  className={`titleNotSeen ${
                    contactNumberInview ? "titleInView" : ""
                  }`}
                />
                <h5
                  className={`titleNotSeen ${
                    contactNumberInview ? "titleInView" : ""
                  }`}
                >
                  {e.phone_number}
                </h5>
              </div>
              <div className="info" ref={contactLocationRef}>
                <img
                  src={locationIcon}
                  alt=""
                  className={`titleNotSeen ${
                    contactLocationInview ? "titleInView" : ""
                  }`}
                />
                <h5
                  className={`titleNotSeen ${
                    contactLocationInview ? "titleInView" : ""
                  }`}
                >
                  {e.location}
                </h5>
              </div>
              <div className="info" ref={contactNameRef}>
                <img
                  src={igIcon}
                  alt=""
                  className={`titleNotSeen ${
                    contactNameInview ? "titleInView" : ""
                  }`}
                />
                <h5
                  className={`titleNotSeen ${
                    contactNameInview ? "titleInView" : ""
                  }`}
                >
                  {e.company_name}
                </h5>
              </div>
            </div>
          ))}
        </div>
        <div className="rht-home">
          <form
            onSubmit={handleSubmit}
            className={isSubmitting ? "disabled" : ""}
          >
            {/* Add your existing form fields */}
            <div className="" ref={inputNameRef}>
              <input
                placeholder="name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                // className="t"
                className={`text-input inputToLeft ${
                  inputNameInview ? "titleInView" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            <div className="" ref={inputSubjectRef}>
              <input
                placeholder="subject"
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                // className="text-input"
                className={`text-input inputToRight ${
                  inputSubjectInview ? "titleInView" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            <div className="" ref={inputEmailRef}>
              <input
                placeholder="email"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                // className=""
                className={`text-input titleNotSeen ${
                  inputEmailInview ? "titleInView" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            <div className="" ref={inputMessageRef}>
              <textarea
                placeholder="message"
                // className="text-input my-2"
                className={`text-input titleNotSeen ${
                  inputMessageInview ? "titleInView" : ""
                }`}
                rows="7"
                cols="30"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <div className="" ref={inputButtonRef}>
              <button
                type="submit"
                value="Submit"
                // className={`btn ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
                className={`btn ${
                  isSubmitting ? "loading" : ""
                } inputButoonHiden ${
                  inputButtonInview ? "inputButoonVisible" : ""
                }`}
              >
                {isSubmitting ? <p>Sending...</p> : <p>send now</p>}
              </button>
            </div>
          </form>
        </div>
      </main>
      {/* <iframe
        ref={mapRef}
        className={`map mapHidden ${mapInview ? "mapInView" : ""}`}
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d498.6981109405955!2d30.6877306!3d-0.6197894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d91b1b930db6e1%3A0xe0f6eaaefba85d63!2sKarugangama!5e0!3m2!1sen!2sug!4v1710153721348!5m2!1sen!2sug"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe> */}

      {!isSummary && (
        <iframe
          ref={mapRef}
          className={`map mapHidden ${mapInview ? "mapInView" : ""}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31916.785333621287!2d30.679970599999997!3d-0.6019023000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d91b12361d180d%3A0xea4f4584d2c4456d!2sKakoba%20Division%2C%20Mbarara!5e0!3m2!1sen!2sug!4v1716414493388!5m2!1sen!2sug"
          height="450"
          title="Google Maps - Kakoba Division, Mbarara"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
};

export default ContactUs;
