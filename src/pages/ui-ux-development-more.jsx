import React from "react";
import EachServiceTemplatePage from "../components/each-service-template-page";

import figmaIcon from "../images/svgs/figma-icon.svg";
import invisionIcon from "../images/svgs/invision-icon.svg";
import sketchIcon from "../images/svgs/sketch-icon.svg";
import adobeXdIcon from "../images/svgs/adobe-xd-icon.svg";

export default function UxUiDevelopmentMore({ setAllDoneLoading }) {
  const headingEachService = {
    title: "UI/UX Development Services",
    subtitle: "Company",
    experience: 6,
    projects: 10,
    description:
      "We design user-friendly interfaces that enhance user engagement and productivity. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
  };

  const whychooseus = {
    title: "Why Choose TAK Kinship as Your UI/UX Development Partner?",
    description:
      "We provide a wide range of UI/UX development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
    whychooseuslist: [
      {
        title: "User-Centered Design",
        description:
          "We design user-friendly interfaces that enhance user engagement and productivity.",
      },
      {
        title: "Customized Solutions",
        description:
          "We understand each project has unique needs. Our team provides tailored solutions, ensuring your project receives the right design approach to meet your goals.",
      },
      {
        title: "Agile Design",
        description:
          "We follow agile design methodologies, offering flexibility and adaptability throughout the design process. This enables us to respond quickly to changing requirements and deliver high-quality designs.",
      },
      {
        title: "Cost-Effective",
        description:
          "Our global talent pool and streamlined processes enable us to deliver high-quality designs at competitive prices. We help you save on development costs without compromising on quality.",
      },
      {
        title: "Long-Term Partnership",
        description:
          "We believe in building long-term relationships with our clients. Our dedicated team will be with you every step of the way, providing maintenance, support, and continuous improvement to ensure your product's success.",
      },
    ],
  };

  const servicesEachService = {
    title: "Our UI/UX Development Services",
    description:
      "We offer a wide range of UI/UX development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
    servicesEachServicelist: [
      {
        title: "Research & Analysis",
        description:
          "We conduct research and analysis to understand your business goals and user needs.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "We create wireframes and prototypes to visualize and test your design.",
      },
      {
        title: "Visual Design",
        description:
          "We create visually appealing designs that meet your business goals and user needs.",
      },
      {
        title: "Interaction Design",
        description:
          "We create interactive designs that enhance user engagement and productivity.",
      },
      {
        title: "Usability Testing",
        description:
          "We conduct usability testing to ensure your design meets user needs and is easy to use.",
      },
    ],
  };

  const processTimeline = {
    title: "UI/UX DEVELOPMENT PROCESS",
    subtitle:
      "From the ideation stage to delivery, every project at TAK Kinship fits into a well-defined framework.",
    steps: [
      {
        title: "Product Discovery",
        description:
          "Define goals, validate ideas, and align your vision with market needs.",
      },
      {
        title: "Research & Analysis",
        description:
          "Conduct research and analysis to understand your business goals and user needs.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "Create wireframes and prototypes to visualize and test your design.",
      },
      {
        title: "Visual Design",
        description:
          "Create visually appealing designs that meet your business goals and user needs.",
      },
      {
        title: "Interaction Design",
        description:
          "Create interactive designs that enhance user engagement and productivity.",
      },
      {
        title: "Usability Testing",
        description:
          "Conduct usability testing to ensure your design meets user needs and is easy to use.",
      },
      {
        title: "Delivery",
        description:
          "Deliver high-quality designs that meet your business goals and user needs.",
      },
    ],
  };

  const technologiesEachService = {
    title:
      "High-performing UI/UX designs built with top-tier tools & technologies",
    description:
      "Our UI/UX designers leverage the latest design tools and technologies to craft fast, scalable, and future-ready UI/UX designs.",
    techstack: [
      {
        name: "FIGMA",
        description:
          "A design tool for creating high-quality user interfaces, Figma is known for its ease of use and collaboration features.",
        icon: figmaIcon,
      },
      {
        name: "INVISION",
        description:
          "A design platform for creating high-quality user interfaces, Invision is known for its ease of use and collaboration features.",
        icon: invisionIcon,
      },
      {
        name: "SKETCH",
        description:
          "A design tool for creating high-quality user interfaces, Sketch is known for its ease of use and collaboration features.",
        icon: sketchIcon,
      },
      {
        name: "ADOBE XD",
        description:
          "A design tool for creating high-quality user interfaces, Adobe XD is known for its ease of use and collaboration features.",
        icon: adobeXdIcon,
      },
    ],
  };

  return (
    <>
      <EachServiceTemplatePage
        technologiesEachService={technologiesEachService}
        processTimeline={processTimeline}
        whychooseus={whychooseus}
        servicesEachService={servicesEachService}
        headingEachService={headingEachService}
        setAllDoneLoading={setAllDoneLoading}
      />
    </>
  );
}
