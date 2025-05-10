import React from "react";
import EachServiceTemplatePage from "../components/each-service-template-page";

import jsIcon from "../images/svgs/js-icon.svg";
import tsIcon from "../images/svgs/ts-icon.svg";
import reactIcon from "../images/svgs/react-icon.svg";
import nextIcon from "../images/svgs/nextjs-icon.svg";

export default function AppDevelopmentMore({ setAllDoneLoading }) {
  const headingEachService = {
    title: "App Development Services",
    subtitle: "Company",
    experience: 7,
    projects: 50,
    description:
      "Develop custom mobile apps with our expert team. We provide a wide range of services to help you build, deploy, and maintain your app.",
  };

  const whychooseus = {
    title: "Why Choose TAK Kinship as Your App Development Partner?",
    description:
      "We provide a wide range of app development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
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
    title: "Our App Development Services",
    description:
      "We offer a wide range of app development services to meet your business needs. Our team of experts is dedicated to delivering high quality solutions that are tailored to your specific requirements.",
    servicesEachServicelist: [
      {
        title: "Technical Consulting",
        description:
          "We guide you through the tech maze, advising on the best architecture and solutions that ensure your product is future-proof, scalable, and aligned with your business goals.",
      },
      {
        title: "Mobile App Development",
        description:
          "We develop custom mobile apps that are tailored to your business needs. Our team of experts uses the latest technologies to ensure your app is future-proof, scalable, and meets your business goals.",
      },
      {
        title: "Custom Software Development",
        description:
          "We develop custom software solutions that are tailored to your business needs. Our team of experts uses the latest technologies to ensure your software is future-proof, scalable, and meets your business goals.",
      },
    ],
  };

  const processTimeline = {
    title: "APP DEVELOPMENT PROCESS",
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
    ],
  };

  const technologiesEachService = {
    title: "Superb mobile apps built with top-tier tools & technologies",
    description:
      "Our mobile app developers leverage the latest frameworks, libraries, and cloud solutions to craft fast, scalable, and future-ready mobile solutions.",
    techstack: [
      {
        name: "JAVASCRIPT",
        description:
          "The backbone of modern web development, JavaScript enables us to build interactive, real-time web apps with dynamic content, smooth animations, and seamless user experiences. Its speed, flexibility, and broad compatibility make it a go-to for high-performance platforms.",
        icon: jsIcon,
      },
      {
        name: "TYPESCRIPT",
        description:
          "A superset of JavaScript, TypeScript adds static typing to the language, enhancing code quality and maintainability. It helps catch errors early in the development process, making it ideal for large-scale applications and complex projects.",
        icon: tsIcon,
      },
      {
        name: "REACT",
        description:
          "A powerful JavaScript library for building user interfaces, React allows developers to create reusable UI components. Its virtual DOM and efficient rendering make it perfect for high-performance applications, ensuring a smooth user experience.",
        icon: reactIcon,
      },
      {
        name: "NEXT.JS",
        description:
          "A React framework that enables server-side rendering and static site generation, Next.js enhances performance and SEO. It simplifies routing, data fetching, and API integration, making it a top choice for modern web applications.",
        icon: nextIcon,
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

