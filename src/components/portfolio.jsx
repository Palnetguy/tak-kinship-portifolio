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
    console.log(filtered);
  }
  function handleFilterToEach(searchQuery) {
    // let searchQuery = "Web";
    var filtered;
    filtered = portfolioArray;

    filtered = portfolioArray.filter((e) => e.type === searchQuery);
    setFilteredPortfolioArray(filtered);
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
              <p className="nav-link" onClick={handleFilterToAll}>
                All
              </p>
            </li>
            <li>
              <p
                className="nav-link"
                onClick={() => handleFilterToEach("Mobile App")}
              >
                Mobile
              </p>
            </li>
            <li>
              <p className="nav-link" onClick={() => handleFilterToEach("Web")}>
                Web
              </p>
            </li>
            <li>
              <p
                className="nav-link"
                onClick={() => handleFilterToEach("Desktop")}
              >
                Desktop
              </p>
            </li>
          </ul>
        </div>

        <div className="projectsContainer">
          {filteredportfolioArray.map((e) => (
            <div>
              <div
                // className="singleProject"
                key={e.id}
                className={`singleProject `}
              >
                <img
                  src={`${e.project_background_image}`}
                  alt="app-img"
                  className="back-Img"
                />
                <div className="veiwProjectOverly-black"></div>
                <div className="veiwProjectOverly">
                  <h3>{e.title}</h3>
                  <h6>{e.type} Application</h6>
                  <div className="madeWith">
                    {e.tech_stack.map((stack, index) => (
                      <p key={index}>#{stack.language}</p>
                    ))}
                    {/* <p>#django </p> */}
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
