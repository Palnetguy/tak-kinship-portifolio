import { useNavigate, useParams } from "react-router-dom";
import "../css/terms_page.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TermsPage = ({ termsInfo, setAllDoneLoading }) => {
  useEffect(() => {
    setAllDoneLoading(true);
  }, []);
  const usenavigate = useNavigate();
  const navigate = useNavigate();
  const paramsObj = useParams();
  useEffect(() => {
    if (termsInfo == "") {
      navigate(`/portfolio/project/${paramsObj.projectId}/${paramsObj.type}/`);
    }
  }, [termsInfo]);
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | TAK Kinship</title>
        <meta
          name="description"
          content="Review the terms and conditions for using TAK Kinship's website and services."
        />
      </Helmet>
      <div className="terms ">
        <main class="wrap">
          <section class="container">
            <div class="container__heading">
              <h2>Terms & Conditions</h2>
            </div>
            <div class="container__content">
              <p>{termsInfo}</p>
            </div>
            <div class="container__nav">
              <small>
                By clicking 'Accept' you are agreeing to our terms and
                conditions.
              </small>

              <div className="btn" onClick={() => usenavigate(-1)}>
                <p>Accept</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TermsPage;
