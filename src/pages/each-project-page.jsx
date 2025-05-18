import { Link, useParams } from "react-router-dom";
import FAQComponent from "../components/FAQComponent";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";
import headerImage from "../images/banner-img2.png";
import headerImage2 from "../images/business-development-2885464-2409431.webp";
import persornLines from "../images/svgs/person-lines.svg";
import listCheck from "../images/svgs/list-check.svg";
import dateFill from "../images/svgs/date-fill.svg";
import stopWatch from "../images/svgs/stop-watch.svg";
import "../css/project.css";
import testIcon from "../images/svgs/instagram-svgrepo-com.svg";
import AppDownloadPage from "../components/projects/AppDownloadPage";
import VisitSiteButton from "../components/projects/visit-site-button";
import { useEffect, useState } from "react";
import axios from "axios";
import DesktopDownloadPage from "../components/projects/DesktopAppDownloadPage";
import configHeaders from "../components/config-headers";
import { useInView } from "react-intersection-observer";
import configImages from "../components/configImages";
import { Helmet } from "react-helmet-async";

const EachProject = ({
  setAllDoneLoading,
  handlePolicy,
  handleTerms,
  handleProjId,
}) => {
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
    <>
      <Helmet>
        <title>
          {projectData?.title
            ? `${projectData.title} | TAK Kinship`
            : "Project Details | TAK Kinship"}
        </title>
        <meta
          name="description"
          content={
            projectData?.about_project
              ? projectData.about_project
              : "Discover details about this project by TAK Kinship, including features, technologies, and client feedback."
          }
        />
      </Helmet>
      <section>
        <div className="project">
          <main className="left-right">
            <div className="ltl-home" ref={sideLeftRef}>
              <div className={` toLeft ${sideLeftInview ? "sideBack" : ""}`}>
                <div className="headerImage">
                  <img
                    src={
                      configImages +
                      "/TAK%20Kniship/website%20images/" +
                      "ebvpmaflxhbvhoqoxste"
                    }
                    alt=""
                    srcset=""
                  />
                </div>
                <h2 className="pretitle">Telxul</h2>
                <h1>Project Goals</h1>
                <p>{projectData.project_goals}</p>
                <img
                  src={
                    configImages +
                    "/TAK%20Kniship/website%20images/" +
                    "ag5qtoghjsmm6dkau88n"
                  }
                  alt=""
                  srcset=""
                />
                <p>{projectData.description}</p>

                {paramsObj &&
                  (paramsObj.type == "Web" ? (
                    projectWeb.map((e) => <VisitSiteButton siteLink={e.url} />)
                  ) : paramsObj.type == "Mobile App" ? (
                    <AppDownloadPage
                      projectId={paramsObj.projectId}
                      type={paramsObj.type}
                    />
                  ) : (
                    // <DesktopDownloadPage />
                    <DesktopDownloadPage
                      projectId={paramsObj.projectId}
                      type={paramsObj.type}
                    />
                  ))}
              </div>
              <div className="pr-tm">
                <Link
                  to={`/portfolio/project/${paramsObj.projectId}/${projectData.type}/policies`}
                >
                  <p>Privacy Policy</p>
                </Link>
                <Link
                  to={`/portfolio/project/${paramsObj.projectId}/${projectData.type}/terms`}
                >
                  <p>Terms</p>
                </Link>
              </div>
            </div>
            <div className="rht-home ">
              <div ref={sideRightRef}>
                <div
                  className={`box toRight ${sideRightInview ? "sideBack" : ""}`}
                >
                  <img src={persornLines} alt="" />
                  <div className="info">
                    <h2 className="title-2">Client</h2>
                    <h3>{projectData.target_audience}</h3>
                  </div>
                </div>
                <div
                  className={`box toRight ${sideRightInview ? "sideBack" : ""}`}
                >
                  <img src={listCheck} alt="" />
                  <div className="info">
                    <h2 className="title-2">Service</h2>
                    <h3>{projectData.project_category}</h3>
                  </div>
                </div>
                <div
                  className={`box toRight ${sideRightInview ? "sideBack" : ""}`}
                >
                  <img src={dateFill} alt="" />
                  <div className="info">
                    <h2 className="title-2">Date</h2>
                    <h3>{projectData.date_published}</h3>
                  </div>
                </div>
                <div
                  className={`box toRight ${sideRightInview ? "sideBack" : ""}`}
                >
                  <img src={stopWatch} alt="" />
                  <div className="info">
                    <h2 className="title-2">Duration</h2>
                    <h3>{projectData.duration_of_development} days</h3>
                  </div>
                </div>
                <div className="btm-info">
                  <h2 class="title-2">follow us</h2>
                  <div className="socials">
                    {/* <i className=" fa-coffee"></i> */}
                    <div
                      className={`sos toRight ${
                        sideRightInview ? "sideBack" : ""
                      }`}
                    >
                      <svg
                        width="64px"
                        height="64px"
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
                            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                            fill="#0F0F0F"
                          ></path>{" "}
                          <path
                            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                            fill="#0F0F0F"
                          ></path>{" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                            fill="#0F0F0F"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div
                      className={`sos toRight ${
                        sideRightInview ? "sideBack" : ""
                      }`}
                    >
                      <svg
                        fill="#000000"
                        width="64px"
                        height="64px"
                        viewBox="0 0 32 32"
                        version="1.1"
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
                          <title>linkedin</title>{" "}
                          <path d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div
                      className={`sos toRight ${
                        sideRightInview ? "sideBack" : ""
                      }`}
                    >
                      <svg
                        width="64px"
                        height="64px"
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
                            d="M19.7828 3.91825C20.1313 3.83565 20.3743 3.75444 20.5734 3.66915C20.8524 3.54961 21.0837 3.40641 21.4492 3.16524C21.7563 2.96255 22.1499 2.9449 22.4739 3.11928C22.7979 3.29366 23 3.6319 23 3.99986C23 5.08079 22.8653 5.96673 22.5535 6.7464C22.2911 7.40221 21.9225 7.93487 21.4816 8.41968C21.2954 11.7828 20.3219 14.4239 18.8336 16.4248C17.291 18.4987 15.2386 19.8268 13.0751 20.5706C10.9179 21.3121 8.63863 21.4778 6.5967 21.2267C4.56816 20.9773 2.69304 20.3057 1.38605 19.2892C1.02813 19.0108 0.902313 18.5264 1.07951 18.109C1.25671 17.6916 1.69256 17.4457 2.14144 17.5099C3.42741 17.6936 4.6653 17.4012 5.6832 16.9832C5.48282 16.8742 5.29389 16.7562 5.11828 16.6346C4.19075 15.9925 3.4424 15.1208 3.10557 14.4471C2.96618 14.1684 2.96474 13.8405 3.10168 13.5606C3.17232 13.4161 3.27562 13.293 3.40104 13.1991C2.04677 12.0814 1.49999 10.5355 1.49999 9.49986C1.49999 9.19192 1.64187 8.90115 1.88459 8.71165C1.98665 8.63197 2.10175 8.57392 2.22308 8.53896C2.12174 8.24222 2.0431 7.94241 1.98316 7.65216C1.71739 6.3653 1.74098 4.91284 2.02985 3.75733C2.1287 3.36191 2.45764 3.06606 2.86129 3.00952C3.26493 2.95299 3.6625 3.14709 3.86618 3.50014C4.94369 5.36782 6.93116 6.50943 8.78086 7.18568C9.6505 7.50362 10.4559 7.70622 11.0596 7.83078C11.1899 6.61019 11.5307 5.6036 12.0538 4.80411C12.7439 3.74932 13.7064 3.12525 14.74 2.84698C16.5227 2.36708 18.5008 2.91382 19.7828 3.91825ZM10.7484 9.80845C10.0633 9.67087 9.12171 9.43976 8.09412 9.06408C6.7369 8.56789 5.16088 7.79418 3.84072 6.59571C3.86435 6.81625 3.89789 7.03492 3.94183 7.24766C4.16308 8.31899 4.5742 8.91899 4.94721 9.10549C5.40342 9.3336 5.61484 9.8685 5.43787 10.3469C5.19827 10.9946 4.56809 11.0477 3.99551 10.9046C4.45603 11.595 5.28377 12.2834 6.66439 12.5135C7.14057 12.5929 7.49208 13.0011 7.49986 13.4838C7.50765 13.9665 7.16949 14.3858 6.69611 14.4805L5.82565 14.6546C5.95881 14.7703 6.103 14.8838 6.2567 14.9902C6.95362 15.4727 7.65336 15.6808 8.25746 15.5298C8.70991 15.4167 9.18047 15.6313 9.39163 16.0472C9.60278 16.463 9.49846 16.9696 9.14018 17.2681C8.49626 17.8041 7.74425 18.2342 6.99057 18.5911C6.63675 18.7587 6.24134 18.9241 5.8119 19.0697C6.14218 19.1402 6.48586 19.198 6.84078 19.2417C8.61136 19.4594 10.5821 19.3126 12.4249 18.6792C14.2614 18.0479 15.9589 16.9385 17.2289 15.2312C18.497 13.5262 19.382 11.1667 19.5007 7.96291C19.51 7.71067 19.6144 7.47129 19.7929 7.29281C20.2425 6.84316 20.6141 6.32777 20.7969 5.7143C20.477 5.81403 20.1168 5.90035 19.6878 5.98237C19.3623 6.04459 19.0272 5.94156 18.7929 5.70727C18.0284 4.94274 16.5164 4.43998 15.2599 4.77822C14.6686 4.93741 14.1311 5.28203 13.7274 5.89906C13.3153 6.52904 13 7.51045 13 8.9999C13 9.28288 12.8801 9.5526 12.6701 9.74221C12.1721 10.1917 11.334 9.92603 10.7484 9.80845Z"
                            fill="#0F0F0F"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div
                      className={`sos toRight ${
                        sideRightInview ? "sideBack" : ""
                      }`}
                    >
                      <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 20 20"
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
                          <title>skype [#170]</title>{" "}
                          <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            {" "}
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-220.000000, -7439.000000)"
                              fill="#000000"
                            >
                              {" "}
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                {" "}
                                <path
                                  d="M175.89681,7295.36998 C179.825962,7294.55179 180.342823,7290.96907 178.817578,7289.31175 C178.086879,7288.50353 176.992351,7288.05506 174.390821,7287.42722 C173.204069,7287.15116 170.957247,7286.63394 171.78929,7285.40814 C172.062922,7284.95868 172.748016,7284.6896 173.660122,7284.64476 C176.803849,7284.43249 176.146119,7287.84777 178.315919,7286.84322 C179.319236,7286.34991 179.228026,7284.73445 178.132485,7283.79168 C175.732631,7281.84237 168.868523,7281.86529 168.868523,7286.12568 C168.868523,7290.27146 174.829645,7289.35062 176.352863,7291.01691 C177.141329,7291.98459 176.298137,7293.54623 173.796938,7293.4406 C170.95522,7293.23331 171.709228,7290.56845 169.964064,7290.56845 C168.640496,7290.56845 168.184443,7291.64575 168.868523,7293.03698 C170.052234,7295.45369 173.381423,7295.90116 175.942415,7295.36998 L175.89681,7295.36998 L175.89681,7295.36998 Z M177.129167,7298.82513 C175.778236,7298.38365 175.845124,7298.41155 174.618848,7298.46636 C169.787723,7298.69159 166.054167,7295.66497 164.853227,7291.55606 C164.353595,7289.71437 164.918088,7288.08994 164.351568,7286.30506 C162.607418,7281.63408 167.70812,7277.50225 171.834896,7279.5283 C172.200752,7279.70868 172.428778,7279.75253 173.843557,7279.75253 C175.12152,7279.75253 175.623178,7279.79738 176.261653,7279.97776 C179.136815,7280.6953 181.464714,7282.53499 182.696058,7285.09322 C183.472362,7286.66383 183.745993,7288.28029 183.563572,7290.11899 C183.472362,7291.1076 183.472362,7291.19729 183.700388,7291.78029 C185.124288,7295.89418 181.228579,7299.88948 177.173759,7298.82613 L177.129167,7298.82613 L177.129167,7298.82513 Z"
                                  id="skype-[#170]"
                                >
                                  {" "}
                                </path>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>{" "}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
      <FAQComponent setIsLoading={handleLoadingFaQs} />
      <ContactUs setIsLoading={handleLoadingContactInfo} />
      <Footer setIsLoading={handleLoadingFooter} />
    </>
  );
};

export default EachProject;
