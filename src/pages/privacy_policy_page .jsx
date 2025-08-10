import { useNavigate, useParams } from "react-router-dom";
import "../css/terms_page.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import configHeaders from "../components/config-headers";
import { getProjectPolicyEndpoint } from "../constants/api";

const PrivacyPage = ({ policyInfo, setAllDoneLoading, projecId }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [localPolicyInfo, setLocalPolicyInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllDoneLoading(true);
  }, [setAllDoneLoading]);

  const navigate = useNavigate();
  const paramsObj = useParams();

  // Fetch policy data if not provided via props
  useEffect(() => {
    const fetchPolicyData = async () => {
      if (!policyInfo) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            getProjectPolicyEndpoint(paramsObj.projectId),
            {
              headers: configHeaders,
            }
          );
          setLocalPolicyInfo(response.data.description);
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
        setLocalPolicyInfo(policyInfo);
        setIsLoading(false);
      }
    };

    fetchPolicyData();
  }, [policyInfo, paramsObj.projectId, paramsObj.type, navigate]);

  useEffect(() => {
    // Allow some time for the data to load before checking
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Increased timeout to allow for API call

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only redirect if it's not the initial load, not loading, and both sources are empty
    if (!isInitialLoad && !isLoading && !policyInfo && !localPolicyInfo) {
      navigate(`/portfolio/project/${paramsObj.projectId}/${paramsObj.type}/`);
    }
  }, [
    policyInfo,
    localPolicyInfo,
    isInitialLoad,
    isLoading,
    navigate,
    paramsObj.projectId,
    paramsObj.type,
  ]);

  // Use local data if available, otherwise use prop data
  const displayPolicy = localPolicyInfo || policyInfo;

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
        <main className="wrap">
          <section className="container">
            <div className="container__heading">
              <h2>Privacy Policy</h2>
            </div>
            <div className="container__content">
              <p>{displayPolicy}</p>
            </div>
            <div className="container__nav">
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
