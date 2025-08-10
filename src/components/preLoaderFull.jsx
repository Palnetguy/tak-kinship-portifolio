import { useEffect, useState } from "react";
import "../css/preloader_full.css";
import { useInView } from "react-intersection-observer";

const PreLoaderFull = ({ isDoneLoading = false }) => {
  useEffect(() => {
    if (!localStorage.getItem("themeColor")) {
      localStorage.setItem("themeColor", "dark");
    }
  }, []);

  function animateValue(id, maxValue) {
    var obj = document.getElementById(id);
    var current = parseInt(obj.innerHTML, 10); // Parse the current value to an integer

    var intervalTime = Math.floor(1000 / maxValue); // Adjust interval time based on maxValue
    var intervalId = setInterval(function () {
      if (current < maxValue) {
        current++;
        // Update the innerHTML with the new value
        obj.innerHTML = current;
      } else {
        clearInterval(intervalId); // Stop the interval when reaching the maxValue
      }
    }, intervalTime);
  }

  // const [isDoneLoading, setisDoneLoading] = useState(true);
  // const [isToShowPerc, setIsToShowPerc] = useState(false);

  useEffect(() => {
    if (isDoneLoading) {
      setTimeout(() => {
        document.querySelector(".App").classList.add("show_app");
      }, 1000);
    }
    console.log(isDoneLoading);
  }, [isDoneLoading]);

  // const [count100Ref, count100Inview] = useInView();
  // const [current100, setCurrent100] = useState(0);

  return (
    <div className={`preloader_full ${isDoneLoading && "hideLoader"}`}>
      <div className="cir">
        {/* <div className="rot"></div>
        <div className="loadingtxt">
          {!isToShowPerc && <div>loading...</div>}
          {isToShowPerc && <div id="count_100">{current100}</div>}
        </div> */}
        <svg
          role="img"
          aria-label="Mouth and eyes come from 9:00 and rotate clockwise into position, right eye blinks, then all parts rotate and merge into 3:00"
          className="smiley"
          viewBox="0 0 128 128"
          width="128px"
          height="128px"
        >
          <defs>
            <clipPath id="smiley-eyes">
              <circle
                className="smiley__eye1"
                cx="64"
                cy="64"
                r="8"
                transform="rotate(-40,64,64) translate(0,-56)"
              />

              <circle
                className="smiley__eye2"
                cx="64"
                cy="64"
                r="8"
                transform="rotate(40,64,64) translate(0,-56)"
              />
            </clipPath>
            <linearGradient id="smiley-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id="smiley-mask">
              <rect
                x="0"
                y="0"
                width="128"
                height="128"
                fill="url(#smiley-grad)"
              />
            </mask>
          </defs>
          <g
            strokeLinecap="round"
            strokeWidth="12"
            strokeDasharray="175.93 351.86"
          >
            <g>
              <rect
                fill="#1fa84f"
                width="128"
                height="64"
                clipPath="url(#smiley-eyes)"
              />
              <g fill="none" stroke="hsl(151, 90%, 50%)">
                <circle
                  className="smiley__mouth1"
                  cx="64"
                  cy="64"
                  r="56"
                  transform="rotate(180,64,64)"
                />
                <circle
                  className="smiley__mouth2"
                  cx="64"
                  cy="64"
                  r="56"
                  transform="rotate(0,64,64)"
                />
              </g>
            </g>
            <g mask="url(#smiley-mask)">
              <rect
                fill="#1fa84fde"
                width="128"
                height="64"
                clipPath="url(#smiley-eyes)"
              />
              <g fill="none" stroke="hsl(151, 90%, 50%)">
                <circle
                  className="smiley__mouth1"
                  cx="64"
                  cy="64"
                  r="56"
                  transform="rotate(180,64,64)"
                />
                <circle
                  className="smiley__mouth2"
                  cx="64"
                  cy="64"
                  r="56"
                  transform="rotate(0,64,64)"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
    // <div className="preloader-container">
    //   <div className="preloader-ring">
    //     <div className="preloader-circle"></div>
    //   </div>
    //   <div className="preloader-text">Loading...</div>
    // </div>
  );
};

export default PreLoaderFull;
