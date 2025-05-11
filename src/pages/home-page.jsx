import "../css/home.css";
import services from "../components/our-services";
import AboutUs from "../components/about-us";
import Clients from "../components/clients";
import Portfolio from "../components/portfolio";
import Testimonials from "../components/testimonials";
import Team from "../components/team";
import Home from "../components/home";
import OtherPageBanner from "../components/other-page-banner";
import Footer from "../components/footer";
import ContactUs from "../components/contact-us";
import FAQComponent from "../components/FAQComponent";
import { useEffect, useState } from "react";
import Services from "../components/our-services";
import TeamShowcase from "../components/team-showcase";

import testprofile from "../images/testProfilePic.jpg";

const HomePage = ({ setAllDoneLoading }) => {
  // const [isDoneAll, setIsDoneAll] = useState(false);

  const [loadingAbout, setLoadingAbout] = useState(true);

  const handleLoadingAbout = (isLoading) => {
    setLoadingAbout(isLoading);
  };

  const [loadingClients, setLoadingClients] = useState(true);

  const handleLoadingClients = (isLoading) => {
    setLoadingClients(isLoading);
  };

  const [loadingPortFolio, setLoadingPortFolio] = useState(true);

  const handleLoadingPortFolio = (isLoading) => {
    setLoadingPortFolio(isLoading);
  };

  const [loadingTestimonial, setLoadingTestimonial] = useState(true);

  const handleLoadingTestimonial = (isLoading) => {
    setLoadingTestimonial(isLoading);
  };

  const [loadingTeam, setLoadingTeam] = useState(true);

  const handleLoadingTeam = (isLoading) => {
    setLoadingTeam(isLoading);
  };

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
      !loadingAbout &&
      !loadingClients &&
      !loadingFaQs &&
      !loadingPortFolio &&
      !loadingTeam &&
      !loadingTestimonial &&
      !loadingContactInfo &&
      !loadingFooter
    ) {
      setAllDoneLoading(true);
    } else {
      // console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      // console.log(
      //   loadingAbout,
      //   loadingClients,
      //   loadingFaQs,
      //   loadingPortFolio,
      //   loadingTeam,
      //   loadingTestimonial,
      //   loadingContactInfo
      // );
    }
  }, [
    loadingAbout,
    loadingClients,
    loadingFaQs,
    loadingPortFolio,
    loadingTeam,
    loadingTestimonial,
    loadingContactInfo,
    loadingFooter,
    // allDoneLoading,
    setAllDoneLoading,
  ]);

  const teamMembers = [
    {
      name: "Ian Rush",
      role: "Creative Leader",
      image: testprofile, // Replace with actual image paths
      bio: "Experienced creative director with expertise in brand development and design strategy.",
    },
    {
      name: "Martine Tuswingwire",
      role: "Manager",
      image: testprofile,
      bio: "Project management professional with a focus on team coordination and client relations.",
    },
    {
      name: "Alex Grinfield",
      role: "Programming Guru",
      image: testprofile,
      bio: "Full-stack developer with extensive knowledge of modern frameworks and technologies.",
    },
    {
      name: "Roxie Swanson",
      role: "Sales Manager",
      image: testprofile,
      bio: "Results-driven sales expert with a strong track record of building client relationships.",
    },
    // You can add more team members here
  ];

  return (
    <section>
      <Home />
      <Services />
      <AboutUs setIsLoading={handleLoadingAbout} />
      <Clients setIsLoading={handleLoadingClients} />
      <Portfolio setIsLoading={handleLoadingPortFolio} />
      <Testimonials setIsLoading={handleLoadingTestimonial} />
      <TeamShowcase
        title="OUR TEAM"
        setIsLoading={handleLoadingTestimonial}
        teamMembers={teamMembers}
      />
      <Team setIsLoading={handleLoadingTeam} />
      <FAQComponent setIsLoading={handleLoadingFaQs} />
      <ContactUs setIsLoading={handleLoadingContactInfo} />
      <Footer setIsLoading={handleLoadingFooter} />
    </section>
  );
};

export default HomePage;
