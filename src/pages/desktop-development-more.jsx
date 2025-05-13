import React from "react";
import EachServiceTemplatePage from "../components/each-service-template-page";

import electronIcon from "../images/svgs/electron-icon.svg";
import nwjsIcon from "../images/svgs/node-icon.svg";
import cppIcon from "../images/svgs/cpp-icon.svg";
import pythonIcon from "../images/svgs/python-icon.svg";
import flutter from "../images/svgs/flutter-icon.svg";

export default function DesktopDevelopmentMore({ setAllDoneLoading }) {
  // setAllDoneLoading(false)
  const headingEachService = {
    title: "Desktop Development Services",
    subtitle: "Company",
    experience: 6,
    projects: 5,
    description:
      "Build robust desktop applications with our expert team. We provide comprehensive services to help you design, develop, and maintain your desktop software.",
  };

  const whychooseus = {
    title: "Why Choose TAK Kinship as Your Desktop Development Partner?",
    description:
      "We provide a wide range of desktop development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
    whychooseuslist: [
      {
        title: "Cross-Platform Development",
        description:
          "We develop applications that run seamlessly on Windows, macOS, and Linux, ensuring broad compatibility and reach.",
      },
      {
        title: "Customized Solutions",
        description:
          "We understand each project has unique needs. Our team provides tailored solutions, ensuring your project receives the right technology stack and approach to meet your goals.",
      },
      {
        title: "Agile Development",
        description:
          "We follow agile development methodologies, offering flexibility and adaptability throughout the development process. This enables us to respond quickly to changing requirements and deliver high-quality products.",
      },
      {
        title: "Cost-Effective",
        description:
          "Our global talent pool and streamlined processes enable us to deliver high-quality products at competitive prices. We help you save on development costs without compromising on quality.",
      },
      {
        title: "Long-Term Partnership",
        description:
          "We believe in building long-term relationships with our clients. Our dedicated team will be with you every step of the way, providing maintenance, support, and continuous improvement to ensure your product's success.",
      },
    ],
  };

  const servicesEachService = {
    title: "Our Desktop Development Services",
    description:
      "We offer a wide range of desktop development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
    servicesEachServicelist: [
      {
        title: "Technical Consulting",
        description:
          "We guide you through the tech maze, advising on the best architecture and solutions that ensure your product is future-proof, scalable, and aligned with your business goals.",
      },
      {
        title: "Custom Application Development",
        description:
          "We develop custom desktop applications that are tailored to your business needs. Our team of experts uses the latest technologies to ensure your app is future-proof, scalable, and meets your business goals.",
      },
      {
        title: "Software Integration",
        description:
          "We integrate new functionalities into existing desktop applications, ensuring smooth operation and compatibility with other systems.",
      },
    ],
  };

  const processTimeline = {
    title: "DESKTOP DEVELOPMENT PROCESS",
    subtitle:
      "From the ideation stage to maintenance, every project at TAK Kinship fits into a well-defined framework.",
    steps: [
      {
        title: "Product Discovery",
        description:
          "Define goals, validate ideas, and align your vision with market needs.",
      },
      {
        title: "UI/UX Design",
        description:
          "Design user-friendly interfaces that enhance user engagement and productivity.",
      },
      {
        title: "Development & QA",
        description:
          "Build fast and iterate smart with continuous testing to ensure quality.",
      },
      {
        title: "Release",
        description:
          "Launch with confidence: fully compliant, secure, and ready for users.",
      },
      {
        title: "Maintenance",
        description:
          "Ensure long-term performance with updates, monitoring, and support.",
      },
    ],
  };

  const technologiesEachService = {
    title:
      "High-performing desktop apps built with top-tier tools & technologies",
    description:
      "Our desktop app developers leverage the latest frameworks, libraries, and tools to craft fast, scalable, and future-ready desktop solutions.",
    techstack: [
      {
        name: "ELECTRON",
        description:
          "A framework for building cross-platform desktop apps with web technologies, Electron allows us to create apps that work on Windows, macOS, and Linux.",
        icon: electronIcon,
      },
      {
        name: "NW.JS",
        description:
          "A powerful tool for building desktop apps with HTML, CSS, and JavaScript, NW.js provides great flexibility for desktop application development.",
        icon: nwjsIcon,
      },
      {
        name: "C++",
        description:
          "A powerful, efficient programming language, C++ is used for developing high-performance desktop applications.",
        icon: cppIcon,
      },
      {
        name: "PYTHON",
        description:
          "A versatile language used for developing a wide range of applications, Python is known for its simplicity and readability.",
        icon: pythonIcon,
      },
      {
        name: "FLUTTER",
        description:
          "A UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
        icon: flutter,
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
