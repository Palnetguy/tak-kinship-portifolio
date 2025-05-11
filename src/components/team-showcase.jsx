import React, { useEffect, useState } from "react";
import "../css/team-showcase.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faX } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import configHeaders from "./config-headers";
import { Link } from "react-router-dom";

const TeamMember = ({ name, role, image, bio, linkedin }) => {
  return (
    <div className="team-member">
      <div className="member-image">
        <img src={image} alt={name} />
      </div>
      <div className="member-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p className="bio">{bio}</p>
        <div className="social-icons">
          <a href={linkedin} aria-label="Instagram">
            {/* <i className="fa fa-instagram"></i> */}
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamShowcase = ({ title, teamMembers, setIsLoading }) => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Fetches team members' data from the backend API and updates the state with the response.
     * Sets the loading state to false once the data is fetched or an error occurs.
     * Logs the fetched data or any error that occurs during the fetch process.
     */

    /*******  273020b0-b0a6-4684-9183-a40b966c4343  *******/
    const handleFetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `https://takkinship-backend.up.railway.app/api/team-members/`,
          {
            headers: configHeaders,
          }
        );
        setIsLoading(false);
        setTeamData(response.data);
        console.log(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchTestimonials();
  }, []);

  const [preTitleRef, preTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [titleRef, titleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [postTitleRef, postTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [profileCarsRef, profileCarsInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="team-showcase-container">
      <h2
        className={`team-title title titleNotSeen ${
          titleInview ? "titleInView" : ""
        }`}
        ref={title && titleRef}
      >
        {title}
      </h2>
      <div className="team-grid">
        {teamData.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            image={member.profile_picture}
            bio={member.biography}
            linkedin={member.linkedin}
          />
        ))}
      </div>
      {/* <div className="attribution">
        <p>
          Images by{" "}
          <a
            href="https://www.freepik.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </a>
        </p>
      </div> */}
      <Link to="/about" target="_top" >
        <div className="learn-more">
          <button>LEARN MORE</button>
        </div>
      </Link>
    </div>
  );
};

export default TeamShowcase;
