import "../css/portfolio.css";
import eyeIcon from "../images/svgs/eye-svgrepo-com.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import configImages from "./configImages";
import configHeaders from "./config-headers";
import { useInView } from "react-intersection-observer";

const Portfolio = ({ setIsLoading }) => {
  const [portfolioArray, setPortfolioArray] = useState([]);
  const [filteredportfolioArray, setFilteredPortfolioArray] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setIsLoading(true);
    const handleFetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://takkinship-backend.up.railway.app/api/projects/",
          {
            headers: configHeaders,
          }
        );
        setIsLoading(false);
        setPortfolioArray(response.data);
        setFilteredPortfolioArray(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchProjects();
  }, []);

  function handleFilterToAll() {
    var filtered;
    filtered = portfolioArray;

    setFilteredPortfolioArray(filtered);
    setActiveFilter("All");
    console.log(filtered);
  }
  function handleFilterToEach(searchQuery) {
    // let searchQuery = "Web";
    var filtered;
    filtered = portfolioArray;

    filtered = portfolioArray.filter((e) => e.type === searchQuery);
    setFilteredPortfolioArray(filtered);
    setActiveFilter(searchQuery);
    console.log(filtered);
  }

  const [preTitleRef, preTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [titleRef, titleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [navProjectsRef, navProjectsInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [projectsRef, projectsInview] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="portfolio">
      <h4
        // className="pretitle"
        className={`pretitle elementOut ${preTitleInview ? "elementIn" : ""}`}
        ref={preTitleRef}
      >
        portfolio
      </h4>
      <h1
        // className="title"
        className={`title elementOut ${titleInview ? "elementIn" : ""}`}
        ref={titleRef}
      >
        Our Portfolio
      </h1>
      <div className="projects">
        <div
          // className=""
          className={`navProjects elementOut ${
            navProjectsInview ? "elementIn" : ""
          }`}
          ref={navProjectsRef}
        >
          <ul>
            <li>
              <p
                className={`nav-link ${activeFilter === "All" ? "active" : ""}`}
                onClick={handleFilterToAll}
              >
                All
              </p>
            </li>
            <li>
              <p
                className={`nav-link ${
                  activeFilter === "Mobile App" ? "active" : ""
                }`}
                onClick={() => handleFilterToEach("Mobile App")}
              >
                Mobile
              </p>
            </li>
            <li>
              <p
                className={`nav-link ${activeFilter === "Web" ? "active" : ""}`}
                onClick={() => handleFilterToEach("Web")}
              >
                Web
              </p>
            </li>
            <li>
              <p
                className={`nav-link ${
                  activeFilter === "Desktop" ? "active" : ""
                }`}
                onClick={() => handleFilterToEach("Desktop")}
              >
                Desktop
              </p>
            </li>
          </ul>
        </div>

        <div className="projectsContainer">
          {filteredportfolioArray.length === 0 && (
            <div>
              <h1 className="title-2">No Project Found</h1>
            </div>
          )}
          {filteredportfolioArray.map((e) => (
            <div>
              <div
                // className="singleProject"
                key={e.id}
                className={`singleProject box`}
              >
                <div className="image">
                  <img
                    src={`${e.project_background_image}`}
                    alt="app-img"
                    className="back-Img"
                  />
                </div>
                {/* <div className="veiwProjectOverly-black"></div> */}
                <div className="veiwProjectOverly">
                  <div className="info">
                    <h3>{e.title}</h3>
                    <h6>{e.type} Application</h6>
                    <div className="madeWith">
                      {e.tech_stack.map((stack, index) => (
                        <p key={index}>#{stack.language}</p>
                      ))}
                      {/* <p>#django </p> */}
                    </div>
                  </div>
                  <Link
                    to={`/portfolio/project/${e.id}/${e.type}`}
                    target="_top"
                  >
                    <div className="viewButton">
                      <img src={eyeIcon} alt="" />
                      <a>View Project</a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
