import { useEffect, useState } from "react";
import "../css/team.css";
import configImages from "./configImages";
import axios from "axios";
import configHeaders from "./config-headers";
import { useInView } from "react-intersection-observer";

const Team = ({ setIsLoading }) => {
  // const teamData = [
  //   {
  //     id: 1,
  //     profile_picture: "hkqfgxovwm1egjq09lad",
  //     name: "Masaba Ian",
  //     role: "FrontEnd developer",
  //     instagram: "example.com",
  //     linkedin: "example.com",
  //     twitter: "example.com",
  //     skype: "example.com",
  //   },
  //   {
  //     id: 2,
  //     profile_picture: "crabn7mqkusm48mhf0jk",
  //     name: "Martine Tusingwire",
  //     role: "BackEnd developer",
  //     instagram: "example.com",
  //     linkedin: "example.com",
  //     twitter: "example.com",
  //     skype: "example.com",
  //   },
  // ];
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const handleFetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `https://takkinship-backend.up.railway.app/api/team-members/`,
          {
            headers: configHeaders,
          }
        );
        setIsLoading(false);
        setTeamData(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchTestimonials();
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

  const [profileCarsRef, profileCarsInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="team">
      <h4
        // className="pretitle"
        className={`pretitle titleNotSeen ${
          preTitleInview ? "titleInView" : ""
        }`}
        ref={preTitleRef}
      >
        Team
      </h4>
      <h1
        // className="title"
        className={`title titleNotSeen ${titleInview ? "titleInView" : ""}`}
        ref={titleRef}
      >
        Our Team
      </h1>
      <p
        // className="post-title"
        className={`post-title titleNotSeen ${
          postTitleInview ? "titleInView" : ""
        }`}
        ref={postTitleRef}
      >
        Our team is a blend of creativity, expertise, and passion. Together, we
        form a powerhouse that turns ideas into reality. Get to know the minds
        driving TAK Kinship Dev's success.
      </p>

      <div className="profileCardContainer">
        {teamData.map((e, index) => (
          <div>
            <div
              // className=""
              key={e.id}
              className={`profileCard box  `}
            >
              <div className="proImg">
                <img src={`${e.profile_picture}`} alt="" />
              </div>
              <h3 className="title-2">{e.name}</h3>
              <h6>{e.role}</h6>
              <div className="links">
                <a href={e.skype} target="_blank" className="">
                  <svg
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
                    </g>
                  </svg>
                </a>
                <a href={e.instagram} target="_blank" className="">
                  <svg
                    fill="#000000"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"></path>
                    </g>
                  </svg>
                </a>
                <a href={e.twitter} target="_blank" className="">
                  <svg
                    viewBox="0 -2 20 20"
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
                      <title>twitter [#154]</title>{" "}
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
                          transform="translate(-60.000000, -7521.000000)"
                          fill="#000000"
                        >
                          {" "}
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            {" "}
                            <path
                              d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                              id="twitter-[#154]"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </a>
                <a href={e.linkedin} target="_blank" className="">
                  <svg
                    fill="#000000"
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
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
