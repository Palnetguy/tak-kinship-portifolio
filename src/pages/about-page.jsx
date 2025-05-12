import { useEffect, useState } from "react";
import FAQComponent from "../components/FAQComponent";
import AboutUs from "../components/about-us";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";
import OtherPageBanner from "../components/other-page-banner";
import MessegeFromCeo from "../components/messege-from-ceo";
import Gallery from "../components/gallery";
import TeamShowcase from "../components/team-showcase";

const AboutPage = ({ setAllDoneLoading }) => {
  const [loadingAbout, setLoadingAbout] = useState(true);

  const handleLoadingAbout = (isLoading) => {
    setLoadingAbout(isLoading);
  };
  const [loadingGallery, setLoadingGallery] = useState(true);
  const handleLoadingGallery = (isLoading) => {
    setLoadingGallery(isLoading);
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
  const [loadingTeam, setLoadingTeam] = useState(true);

  const handleLoadingTeam = (isLoading) => {
    setLoadingTeam(isLoading);
  };

  useEffect(() => {
    if (
      !loadingAbout &&
      !loadingFaQs &&
      !loadingContactInfo &&
      !loadingGallery &&
      !loadingTeam &&
      !loadingFooter
    ) {
      console.log("all Done ------------------------------------");
      console.log(loadingAbout, loadingFaQs, loadingContactInfo, loadingFooter);
      setAllDoneLoading(true);
    } else {
      console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(loadingAbout, loadingFaQs, loadingContactInfo, loadingFooter);
    }
  }, [
    loadingGallery,
    loadingAbout,
    loadingFaQs,
    loadingContactInfo,
    loadingFooter,
    loadingTeam,
  ]);

  return (
    <section>
      <OtherPageBanner
        pageName="ABOUT"
        title="About Us"
        infomation="In the vast tapestry of the web, we don't just create technology; we compose symphonies of connection."
      />
      <AboutUs setIsLoading={handleLoadingAbout} showAllInfo={true} />
      <MessegeFromCeo />
      <section id="team">
        <TeamShowcase
          isSummary={false}
          title="OUR TEAM"
          setIsLoading={handleLoadingTeam}
        />
      </section>
      <Gallery setIsLoading={handleLoadingGallery} />
      <FAQComponent setIsLoading={handleLoadingFaQs} />
      <ContactUs setIsLoading={handleLoadingContactInfo} />
      <Footer setIsLoading={handleLoadingFooter} />
    </section>
  );
};

export default AboutPage;
