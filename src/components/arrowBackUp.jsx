import { useEffect, useState } from "react";

const ArrowBackUp = () => {
  const [progressScroll, setProgressScroll] = useState(0);
  useEffect(() => {
    // Get the document height and viewport height
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Calculate the maximum scrollable distance
    const maxScroll = documentHeight - viewportHeight;

    // Add a scroll event listener
    window.addEventListener("scroll", function () {
      // Get the current scroll position
      const currentScroll = window.scrollY;

      // Calculate the percentage of scroll
      let scrollPercentage = (currentScroll / maxScroll) * 100;

      // Cap the scroll percentage at 100%
      scrollPercentage = Math.min(scrollPercentage, 100);

      // Log or use the scroll percentage as needed
      setProgressScroll(scrollPercentage.toFixed(2));
      // console.log(`Scroll Percentage: ${scrollPercentage.toFixed(2)}%`);
    });
  }, [document.documentElement.scrollHeight, window.innerHeight]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    progressScroll > 1 && (
      <div
        id="progress"
        style={{
          display: "grid",
          background: `conic-gradient(rgb(31, 168, 79) ${progressScroll}%, rgb(215, 215, 215) ${progressScroll}%)`,
        }}
      >
        <span id="progress-value" onClick={scrollToTop}>
          {/* <i class="bi bi-arrow-up-short"></i> */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 6V18M12 6L7 11M12 6L17 11"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </span>
      </div>
    )
  );
};

export default ArrowBackUp;
