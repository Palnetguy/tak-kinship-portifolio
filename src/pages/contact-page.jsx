import { useEffect, useState } from "react";
import FAQComponent from "../components/FAQComponent";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";
import OtherPageBanner from "../components/other-page-banner";
import { Helmet } from "react-helmet-async";

const ContactPage = ({ setAllDoneLoading }) => {
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
      console.log(loadingFaQs, loadingContactInfo, loadingFooter);
      setAllDoneLoading(true);
    } else {
      console.log("all Start xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(loadingFaQs, loadingContactInfo, loadingFooter);
    }
  }, [loadingFaQs, loadingContactInfo, loadingFooter]);
  return (
    <>
      <Helmet>
        <title>Contact Us | TAK Kinship</title>
        <meta
          name="description"
          content="Get in touch with TAK Kinship for inquiries, support, or to start your next innovative project with us."
        />
      </Helmet>
      <section>
        <OtherPageBanner
          pageName="CONTACT"
          title="Contact Us"
          infomation="Lost in the digital wilderness? Fear not! Our Contact Us page is the Sherpa of support. Drop us a line, and we'll guide you through the tech-terrain with the finesse of a GPS for laughter."
        />
        <ContactUs setIsLoading={handleLoadingContactInfo} />
        <FAQComponent setIsLoading={handleLoadingFaQs} />
        <Footer setIsLoading={handleLoadingFooter} />
      </section>
    </>
  );
};

export default ContactPage;
