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
import OffersPage from "./pages/offers-page";
import PortfolioPage from "./pages/portfolio-page";
import EachProject from "./pages/each-project-page";
import particlesOptions from "./components/particals/particlesjs-config.json";
// import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import ArrowBackUp from "./components/arrowBackUp";
import PreLoaderFull from "./components/preLoaderFull";

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

  const [loadingAll, setLoadingAll] = useState(false);

  const handleLoadingAll = (isLoading) => {
    setLoadingAll(isLoading);
  };

  useEffect(() => {
    if (loadingAll) {
      console.log("Page done Loading");
    }
  }, [loadingAll]);

  return (
    <>
      <PreLoaderFull isDoneLoading={loadingAll} />

      <div className="App ">
        <Router>
          {/* {init && <Particles options={particlesOptions} />} */}
          <NavigationBar className={"pc"} />
          <NavigationBar className={"mobile"} />
          <ArrowBackUp />
          {/* <HomePage /> */}
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
              path="/offers"
              element={<OffersPage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/portfolio"
              element={<PortfolioPage setAllDoneLoading={handleLoadingAll} />}
            />
            <Route
              path="/portfolio/project/:projectId/:type"
              element={<EachProject setAllDoneLoading={handleLoadingAll} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
