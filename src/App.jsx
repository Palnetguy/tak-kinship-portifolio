import { useEffect, useState } from "react";
import "./App.css";
import FAQComponent from "./components/FAQComponent";
import ContactUs from "./components/contact-us";
import Footer from "./components/footer";
import NavigationBar from "./components/navbar";
import HomePage from "./pages/home-page";
import AboutPage from "./pages/about-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/contact-page";
import GalleryPage from "./pages/gallery-page";
// import ServicesPage from "./pages/services-page";
import PortfolioPage from "./pages/portfolio-page";
import EachProject from "./pages/each-project-page";
import particlesOptions from "./components/particals/particlesjs-config.json";
// import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import ArrowBackUp from "./components/arrowBackUp";
import PreLoaderFull from "./components/preLoaderFull";
import TermsPage from "./pages/terms_page";
import PrivacyPage from "./pages/privacy_policy_page ";
import ServicesPage from "./pages/services-page";
import EachServiceTemplatePage from "./components/each-service-template-page";
import WebDevelopmentMore from "./pages/web-development-more";
import AppDevelopmentMore from "./pages/app-development-more";
import DesktopDevelopmentMore from "./pages/desktop-development-more";
import UxUiDevelopmentMore from "./pages/ui-ux-development-more";
import EachProjectDetailTemplate from "./components/each-project-detail-template";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("themeColor")) {
      localStorage.setItem("themeColor", "dark");
    }
  }, []);

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  // console.log(window.scroll);

  const [loadingAll, setLoadingAll] = useState(false); // change it after

  const handleLoadingAll = (isLoading) => {
    setLoadingAll(isLoading);
  };

  useEffect(() => {
    if (loadingAll) {
      console.log("Page done Loading");
    }
  }, [loadingAll]);

  const [policyInfo, setPolicyInfo] = useState("");
  const [termsInfo, setTermsInfo] = useState("");

  function handlePolicy(value) {
    // console.log(value);
    setPolicyInfo(value);
  }

  function handleTerms(value) {
    // console.log(value);
    setTermsInfo(value);
  }

  const projects = {
    name: "Telxul",
    category: "Web Application",
    techstack: ["js", "html"],
    quote: "A Decentralized Communication Platform",
    about_project: "hshshss hsbshs shss   xnx x hxh",
    challenges_faced: "sjjsjsjs  sjs jss sj sj sj j jsj",
    features: [
      {
        title: "Title",
        description: "Description",
      },
      {
        title: "Title",
        description: "Description",
      },
      {
        title: "Title",
        description: "Description",
      },
    ],
    client: {
      name: "Client Name",
      location: "Client Location",
      rating: 2,
      messege: "Client Message",
    },
  };

  // setInterval(() => {
  //   console.log(window.scrollY);
  // }, 1000);

  return (
    <>
      <PreLoaderFull isDoneLoading={loadingAll} />

      <div className="App ">
        <Router>
          {init && <Particles options={particlesOptions} />}
          <NavigationBar className={"pc"} />
          <NavigationBar className={"mobile"} />
          <ArrowBackUp />
          {/* <HomePage /> */}
          {/* <PrivacyPage /> */}
          <Routes>
            <Route
              path="/"
              element={<HomePage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/about"
              element={<AboutPage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/contact"
              element={<ContactPage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/gallery"
              element={<GalleryPage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/services"
              element={<ServicesPage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/portfolio"
              element={<PortfolioPage setAllDoneLoading={handleLoadingAll} />}
            />
            {/* <Route
              path="/portfolio/project/:projectId/:type"
              element={
                <EachProject
                  setAllDoneLoading={handleLoadingAll}
                  handlePolicy={handlePolicy}
                  handleTerms={handleTerms}
                />
              }
            /> */}
            <Route
              path="/portfolio/project/:projectId/:type/"
              element={
                <EachProjectDetailTemplate
                  setAllDoneLoading={handleLoadingAll}
                  handlePolicy={handlePolicy}
                  handleTerms={handleTerms}
                />
              }
            />
            <Route
              path="/portfolio/project/:projectId/:type/policies"
              // element={<EachProject setAllDoneLoading={handleLoadingAll} />}
              element={
                <PrivacyPage
                  policyInfo={policyInfo}
                  setAllDoneLoading={handleLoadingAll}
                />
              }
            />
            <Route
              path="/portfolio/project/:projectId/:type/terms"
              // element={<EachProject setAllDoneLoading={handleLoadingAll} />}
              element={
                <TermsPage
                  termsInfo={termsInfo}
                  setAllDoneLoading={handleLoadingAll}
                />
              }
            />
            <Route
              path="/test"
              element={
                <EachProjectDetailTemplate
                  setAllDoneLoading={handleLoadingAll}
                />
              }
            />
            <Route
              path="/services/web-development"
              element={
                <WebDevelopmentMore setAllDoneLoading={handleLoadingAll} />
              }
            />
            <Route
              path="/services/app-development"
              element={
                <AppDevelopmentMore setAllDoneLoading={handleLoadingAll} />
              }
            />
            <Route
              path="/services/desktop-development"
              element={
                <DesktopDevelopmentMore setAllDoneLoading={handleLoadingAll} />
              }
            />
            <Route
              path="/services/ui-ux-development"
              element={
                <UxUiDevelopmentMore setAllDoneLoading={handleLoadingAll} />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
