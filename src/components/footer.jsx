import "../css/footer.css";
import testIcon from "../images/svgs/sun-svgrepo-com.svg";
import instagramIco from "../images/svgs/instagramFooter.svg";
import linkedinico from "../images/svgs/linkedInFooter.svg";
import twitterIco from "../images/svgs/twitterFooter.svg";
import skypeIco from "../images/svgs/skypeFooter.svg";
import chevronRight from "../images/svgs/chevron-right-svgrepo-com.svg";
import taKLogo from "../images/TAK Kinship-Logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import configHeaders from "./config-headers";
import configImages from "./configImages";

const Footer = ({ setIsLoading }) => {
  const footerItems = document.querySelectorAll(".footer_element_animated");

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("footer_element_animatedIn");
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

  footerItems.forEach((faqItem) => {
    observer.observe(faqItem);
  });

  const [contactUsInfo, setContactUsInfo] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const handleFetchContactUsInfo = async () => {
      try {
        const response = await axios.get(
          "https://takkinship-backend.up.railway.app/api/contact-company-info/",
          {
            headers: configHeaders,
          }
        );
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

  // [
  //   {
  //     id: 1,
  //     company_name: "TAK Kinship Devs",
  //     location: "Kampala-Uganda, Kitwe",
  //     email: "sktechug@gmail.com",
  //     phone_number: "0702699987",
  //     instgram: "https://www.instagram.com/tak_kniship/",
  //     twitter: "https://www.instagram.com/tak_kniship/",
  //     skype: "https://www.instagram.com/tak_kniship/",
  //     linkedIn: "https://www.instagram.com/tak_kniship/",
  //   },
  // ];

  return (
    <footer className="footer">
      <div className="top">
        <div className="">
          <div className="box footer_element_animated">
            <a href="#" className="logo" style={{ "--delay": "0ms" }}>
              <img
                class="my-2"
                src={
                  configImages +
                  "/TAK%20Kniship/website%20images/" +
                  "lgbobj12tl3tglzffs3r"
                }
                alt=""
              />
            </a>
            <p style={{ "--delay": "100ms" }}>
              Your journey with us is more than code and pixels; it's a
              heartfelt melody, harmonizing dreams and reality in the grand
              opera of possibility.
            </p>
            <h4 class="" style={{ "--delay": "200ms" }}>
              Connect With Us
            </h4>
            {contactUsInfo.map((e) => (
              <div class="social" key={e.id}>
                <a
                  href={e.instgram}
                  className="icon"
                  style={{ "--delay": "300ms" }}
                >
                  <img
                    src={instagramIco}
                    alt=""
                    style={{ "--delay": "400ms" }}
                  />
                </a>
                <a
                  href={e.linkedIn}
                  className="icon"
                  style={{ "--delay": "500ms" }}
                >
                  <img src={linkedinico} alt="" />
                </a>
                <a
                  href={e.twitter}
                  className="icon"
                  style={{ "--delay": "600ms" }}
                >
                  <img src={twitterIco} alt="" />
                </a>
                <a
                  href={e.skype}
                  className="icon"
                  style={{ "--delay": "700ms" }}
                >
                  <img src={skypeIco} alt="" />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div class="ref-links footer_element_animated">
          <h4>Site Map</h4>
          <ul class="">
            <li class="" style={{ "--delay": "0ms" }}>
              <img src={chevronRight} alt="" />
              <Link target="_top" to="/">
                Home
              </Link>
            </li>
            <li class="" style={{ "--delay": "100ms" }}>
              <img src={chevronRight} alt="" />
              <Link target="_top" to="/about">
                About
              </Link>
            </li>
            <li class="" style={{ "--delay": "200ms" }}>
              <img src={chevronRight} alt="" />
              <Link target="_top" to="/offers">
                Offers
              </Link>
            </li>
            <li class="" style={{ "--delay": "300ms" }}>
              <img src={chevronRight} alt="" />
              <Link target="_top" to="/portfolio">
                Portfolio
              </Link>
            </li>
            <li class="" style={{ "--delay": "400ms" }}>
              <img src={chevronRight} alt="" />
              <Link target="_top" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div class="ref-links footer_element_animated">
          <h4>Follow Us</h4>
          {contactUsInfo.map((e) => (
            <ul class="">
              <li class="" style={{ "--delay": "000ms" }}>
                <img src={chevronRight} alt="" />
                <a href={e.skype}>Skype</a>
              </li>
              <li class="" style={{ "--delay": "100ms" }}>
                <img src={chevronRight} alt="" />
                <a href={e.instgram}>Instagram</a>
              </li>
              <li class="" style={{ "--delay": "200ms" }}>
                <img src={chevronRight} alt="" />
                <a href={e.linkedIn}>Linkedin</a>
              </li>
              <li class="" style={{ "--delay": "300ms" }}>
                <img src={chevronRight} alt="" />
                <a href={e.twitter}>X</a>
              </li>
            </ul>
          ))}
        </div>
        <div class="ref-links footer_element_animated">
          <h4>our services</h4>
          <ul class="">
            <li class="" style={{ "--delay": "000ms" }}>
              <img src={chevronRight} alt="" />
              <a href="#">app developement</a>
            </li>
            <li class="" style={{ "--delay": "100ms" }}>
              <img src={chevronRight} alt="" />
              <a href="#">web developement</a>
            </li>
            <li class="" style={{ "--delay": "200ms" }}>
              <img src={chevronRight} alt="" />
              <a href="#">desktop developement</a>
            </li>
            <li class="" style={{ "--delay": "300ms" }}>
              <img src={chevronRight} alt="" />
              <a href="#">UI/UX developement</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p class="creadits">
          © {new Date().getFullYear()} Created by: <a href="#">TAK Kinship</a>
        </p>
        <div>
          <a href="">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
