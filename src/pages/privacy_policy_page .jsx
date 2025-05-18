import { useNavigate, useParams } from "react-router-dom";
import "../css/terms_page.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPage = ({ policyInfo, setAllDoneLoading, projecId }) => {
  useEffect(() => {
    setAllDoneLoading(true);
  }, []);
  const navigate = useNavigate();
  const paramsObj = useParams();
  useEffect(() => {
    if (policyInfo == "") {
      navigate(`/portfolio/project/${paramsObj.projectId}/${paramsObj.type}/`);
    }
  }, [policyInfo]);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | TAK Kinship</title>
        <meta
          name="description"
          content="Read our privacy policy to understand how TAK Kinship collects, uses, and protects your information."
        />
      </Helmet>
      <div className="terms pr">
        <main class="wrap">
          <section class="container">
            <div class="container__heading">
              <h2>Privacy Policy</h2>
            </div>
            <div class="container__content">
              <p>{policyInfo}</p>
            </div>
            <div class="container__nav">
              <small>
                If you have any questions or suggestions about my Privacy
                Policy, do not hesitate to contact us.
              </small>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default PrivacyPage;
