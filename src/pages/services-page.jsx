import { useEffect, useState } from "react";
import FAQComponent from "../components/FAQComponent";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";
import OtherPageBanner from "../components/other-page-banner";
import services from "../components/our-services";
import Services from "../components/our-services";
import { Helmet } from "react-helmet-async";

const ServicesPage = ({ setAllDoneLoading }) => {
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
    if (!loadingFaQs && !loadingContactInfo && !loadingFooter) {
      console.log("all Done ------------------------------------");
      console.log(loadingFaQs, loadingContactInfo);
      setAllDoneLoading(true);
    } else {
      console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(loadingFaQs, loadingContactInfo);
    }
  }, [loadingFaQs, loadingContactInfo, loadingFooter]);

  return (
    <>
      <Helmet>
        <title>Services | TAK Kinship</title>
        <meta
          name="description"
          content="Discover our comprehensive range of software development services, including web, mobile, and desktop solutions tailored to your business needs."
        />
      </Helmet>
      <section>
        <OtherPageBanner
          pageName="services"
          title="Our services"
          infomation=" Let every service be the spark that fuels your vision and propels your goals. Your success, our mission – together, we code the path to achievement."
        />
        <Services />
        <FAQComponent setIsLoading={handleLoadingFaQs} />
        <ContactUs setIsLoading={handleLoadingContactInfo} />
        <Footer setIsLoading={handleLoadingFooter} />
      </section>
    </>
  );
};

export default ServicesPage;
