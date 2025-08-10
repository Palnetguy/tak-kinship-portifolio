import { useNavigate, useParams } from "react-router-dom";
import "../css/terms_page.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import configHeaders from "../components/config-headers";
import { getProjectTermsEndpoint } from "../constants/api";

const TermsPage = ({ termsInfo, setAllDoneLoading }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [localTermsInfo, setLocalTermsInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllDoneLoading(true);
  }, [setAllDoneLoading]);

  const usenavigate = useNavigate();
  const navigate = useNavigate();
  const paramsObj = useParams();

  // Fetch terms data if not provided via props
  useEffect(() => {
    const fetchTermsData = async () => {
      if (!termsInfo) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            getProjectTermsEndpoint(paramsObj.projectId),
            {
              headers: configHeaders,
            }
          );
          setLocalTermsInfo(response.data.description);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          // If fetching fails, redirect back to project page
          navigate(
            `/portfolio/project/${paramsObj.projectId}/${paramsObj.type}/`
          );
        }
      } else {
        setLocalTermsInfo(termsInfo);
        setIsLoading(false);
      }
    };

    fetchTermsData();
  }, [termsInfo, paramsObj.projectId, paramsObj.type, navigate]);

  useEffect(() => {
    // Allow some time for the data to load before checking
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Increased timeout to allow for API call

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only redirect if it's not the initial load, not loading, and both sources are empty
    if (!isInitialLoad && !isLoading && !termsInfo && !localTermsInfo) {
      navigate(`/portfolio/project/${paramsObj.projectId}/${paramsObj.type}/`);
    }
  }, [
    termsInfo,
    localTermsInfo,
    isInitialLoad,
    isLoading,
    navigate,
    paramsObj.projectId,
    paramsObj.type,
  ]);

  // Use local data if available, otherwise use prop data
  const displayTerms = localTermsInfo || termsInfo;
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
        <main className="wrap">
          <section className="container">
            <div className="container__heading">
              <h2>Terms & Conditions</h2>
            </div>
            <div className="container__content">
              <p>{displayTerms}</p>
            </div>
            <div className="container__nav">
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
