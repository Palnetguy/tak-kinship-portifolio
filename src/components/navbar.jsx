import { useEffect, useState } from "react";
import moonIcon from "../images/svgs/moon-svgrepo-com.svg";
import sunIcon from "../images/svgs/sun-svgrepo-com.svg";
import menuWhite from "../images/svgs/menu-svgrepo-com-white.svg";
import menuBlack from "../images/svgs/menu-svgrepo-com-black.svg";
import TAKKinshipLogoDark from "../images/TAK Kinship-Logo-Dark.svg";
import TAKKinshipLogoLight from "../images/TAK Kinship-Logo-light.svg";
import "../css/navbar.css";
import { Link, useLocation, useParams } from "react-router-dom";
import configImages from "./configImages";

const NavigationBar = ({ className }) => {
  const [changeThemeKey, setChangeThemeKey] = useState(0);
  const [themeColor, setThemeColor] = useState("dark");

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setThemeColor(localStorage.getItem("themeColor"));
    document
      .querySelector("body")
      .setAttribute("data-theme", localStorage.getItem("themeColor"));
  }, [changeThemeKey]);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  function handleChangeTheme() {
    if (localStorage.getItem("themeColor") === "light") {
      localStorage.setItem("themeColor", "dark");
      setDarkMode();
      setChangeThemeKey((prev) => prev + 1);
    } else {
      localStorage.setItem("themeColor", "light");
      setChangeThemeKey((prev) => prev + 1);
      setLightMode();
    }
  }

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = isSticky ? "sticky" : "";

  function handleChangeMobileNav() {
    setMobileNavOpen((prev) => !prev);
  }

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className={`nav ${navbarClass} ${className} ${
        mobileNavOpen ? "openMobileNav" : ""
      }`}
    >
      <div className="logo">
        <img
          src={
            themeColor === "light" ? TAKKinshipLogoLight : TAKKinshipLogoDark
          }
          alt="TAK Kinship Logo"
        />

        <div className="menu-slide-btn" onClick={handleChangeMobileNav}>
          {themeColor === "light" ? (
            <img src={menuBlack} alt="" />
          ) : (
            <img src={menuWhite} alt="" />
          )}
        </div>
      </div>
      <ul>
        <li>
          <Link target="_top" to="/">
            <span
              className={`${location.pathname === "/" ? "unique-text" : "'"} `}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link target="_top" to="/about">
            <span
              className={`${
                location.pathname.includes("/about") ? "unique-text" : "'"
              } `}
            >
              About
            </span>
          </Link>
        </li>
        <li>
          <Link target="_top" to="/services">
            <span
              className={`${
                location.pathname.includes("/services") ? "unique-text" : "'"
              } `}
            >
              services
            </span>
          </Link>
        </li>
        <li>
          <Link target="_top" to="/portfolio">
            <span
              className={`${
                location.pathname.includes("/portfolio") ? "unique-text" : "'"
              } `}
            >
              Portfolio
            </span>
          </Link>
        </li>
        <li>
          <Link target="_top" to="/contact">
            <span
              className={`${
                location.pathname.includes("/contact") ? "unique-text" : "'"
              } `}
            >
              Contact
            </span>
          </Link>
        </li>
        <li>
          <Link target="_top" to="/gallery">
            <span
              className={`${
                location.pathname.includes("/gallery") ? "unique-text" : "'"
              } `}
            >
              Gallery
            </span>
          </Link>
        </li>
      </ul>
      <label htmlFor="themeChange">
        <input
          type="checkbox"
          name=""
          id="themeChange"
          checked={themeColor === "dark" ? true : false}
        />
        <div className="themeChange" onClick={handleChangeTheme}>
          {themeColor === "light" ? (
            <img src={moonIcon} alt="" />
          ) : (
            <img src={sunIcon} alt="" />
          )}
        </div>
      </label>
    </nav>
  );
};

export default NavigationBar;
