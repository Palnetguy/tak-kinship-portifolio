import { useEffect, useState } from "react";
import FAQComponent from "../components/FAQComponent";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";
import OtherPageBanner from "../components/other-page-banner";
import Portfolio from "../components/portfolio";
import { Helmet } from "react-helmet-async";

const PortfolioPage = ({ setAllDoneLoading }) => {
  const [loadingFaQs, setLoadingFaQs] = useState(true);

  const handleLoadingFaQs = (isLoading) => {
    setLoadingFaQs(isLoading);
  };

  const [loadingPortFolio, setLoadingPortFolio] = useState(true);

  const handleLoadingPortFolio = (isLoading) => {
    setLoadingPortFolio(isLoading);
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
      !loadingFaQs &&
      !loadingPortFolio &&
      !loadingContactInfo &&
      !loadingFooter
    ) {
      console.log("all Done ------------------------------------");
      console.log(loadingFaQs, loadingPortFolio, loadingContactInfo);
      setAllDoneLoading(true);
    } else {
      console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(loadingFaQs, loadingPortFolio, loadingContactInfo);
    }
  }, [loadingFaQs, loadingPortFolio, loadingContactInfo, loadingFooter]);

  return (
    <>
      <Helmet>
        <title>Portfolio | TAK Kinship</title>
        <meta
          name="description"
          content="Explore our portfolio of innovative projects and transformative solutions delivered to clients across various industries."
        />
      </Helmet>
      <section>
        <OtherPageBanner
          pageName="PORTIFOLIO"
          title="Our Portifolio"
          infomation="Welcome to the TAK Kinship Portfolio – where every project is a testament to innovation, a journey into excellence, and a canvas painted with the strokes of transformative technology."
        />
        <Portfolio setIsLoading={handleLoadingPortFolio} />
        <FAQComponent setIsLoading={handleLoadingFaQs} />
        <ContactUs setIsLoading={handleLoadingContactInfo} />
        <Footer setIsLoading={handleLoadingFooter} />
      </section>
    </>
  );
};

export default PortfolioPage;
