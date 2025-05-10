import React from "react";
import EachServiceTemplatePage from "../components/each-service-template-page";

import jsIcon from "../images/svgs/js-icon.svg";
import tsIcon from "../images/svgs/ts-icon.svg";
import reactIcon from "../images/svgs/react-icon.svg";
import nextIcon from "../images/svgs/nextjs-icon.svg";

export default function WebDevelopmentMore({ setAllDoneLoading }) {
  const headingEachService = {
    title: "Web Development Services",
    subtitle: "Company",
    experience: 7,
    projects: 50,
    description:
      "Establish a solid digital presence with our web development company. We specialize in building unique web-based solutions with advanced technologies to help you fulfill your business needs on the spot.",
  };

  const whychooseus = {
    title: "Why Choose TAK Kinship as Your Web Development Partner?",
    description:
      "Launch a web product that sets you apart from the competition. At TAK Kinship, we combine technical expertise with full-stack capabilities to create custom solutions that are tailored to your business and delivered quickly. You retain full ownership of the final product.",
    whychooseuslist: [
      {
        title: "Full-Stack Development",
        description:
          "We handle every layer of your product, from frontend development and backend development to DevOps, delivering production-ready platforms.",
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
    title: "Our Web Development Services",
    description:
      "We offer a wide range of web development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
    servicesEachServicelist: [
      {
        title: "Technical Consulting",
        description:
          "We guide you through the tech maze, advising on the best architecture and solutions that ensure your product is future-proof, scalable, and aligned with your business goals.",
      },
      {
        title: "Web App Development",
        description:
          "We build secure, fast, and scalable web applications that are tailored to your business needs. Our team of experts uses the latest technologies to ensure your application is future-proof and meets your business goals.",
      },
      {
        title: "E-commerce Development",
        description:
          "We develop custom e-commerce solutions that are tailored to your business needs. Our team of experts uses the latest technologies to ensure your e-commerce platform is secure, fast, and scalable.",
      },
      {
        title: "Custom Software Development",
        description:
          "We develop custom software solutions that are tailored to your business needs. Our team of experts uses the latest technologies to ensure your software is future-proof, scalable, and meets your business goals.",
      },
    ],
  };

  const processTimeline = {
    title: "WEB DEVELOPMENT PROCESS",
    subtitle:
      "From the ideation stage to maintenance, every project at CrustLab fits into a well-defined framework.",
    steps: [
      {
        title: "Product Discovery",
        description:
          "Define goals, validate ideas, and align your vision with market needs.",
      },
      {
        title: "UX/UI Design",
        description:
          "Craft intuitive, eye-catching interfaces that draw attention and boost engagement.",
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

      // Add more steps here as needed
    ],
  };

  const technologiesEachService = {
    title: "Superb web apps built with top-tier tools & technologies",
    description:
      "Our webmasters leverage the latest frameworks, libraries, and cloud solutions to craft fast, scalable, and future-ready web solutions.",
    techstack: [
      {
        name: "JAVASCRIPT",
        description:
          "The backbone of modern web development, JavaScript enables us to build interactive, real-time web apps with dynamic content, smooth animations, and seamless user experiences. Its speed, flexibility, and broad compatibility make it a go-to for high-performance platforms.",
        icon: jsIcon,
        // icon1: "",
        // icon2: ""
      },
      {
        name: "TYPESCRIPT",
        description:
          "A superset of JavaScript, TypeScript adds static typing to the language, enhancing code quality and maintainability. It helps catch errors early in the development process, making it ideal for large-scale applications and complex projects.",
        icon: tsIcon,
        // icon1: "",
        // icon2: ""
      },
      {
        name: "REACT",
        description:
          "A powerful JavaScript library for building user interfaces, React allows developers to create reusable UI components. Its virtual DOM and efficient rendering make it perfect for high-performance applications, ensuring a smooth user experience.",
        // icon1: "",
        icon: reactIcon,
        // icon2: ""
      },
      {
        name: "NEXT.JS",
        description:
          "A React framework that enables server-side rendering and static site generation, Next.js enhances performance and SEO. It simplifies routing, data fetching, and API integration, making it a top choice for modern web applications.",
        icon: nextIcon,
        // icon1: "",
        // icon2: ""
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
