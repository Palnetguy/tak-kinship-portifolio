import React from "react";
import "../css/messege-form-ceo.css";
import ceoImage from "../images/testProfilePic.jpg";

export default function MessegeFromCeo() {
  return (
    <div className="messege-from-ceo">
      <p className="pretitle">A word from our CEO</p>
      <h1 className="title">Masaba Ian Samuel</h1>
      <h6 className="title-2">Founder & CEO</h6>

      {/* content */}
      <div className="img-info">
        <div className="image">
          <div className="ovl">
            <img src={ceoImage} alt="ceo" className="ceo-image" />
          </div>
        </div>

        <div className="info">
          <p>
            Masaba Ian Samuel is the Founder and CEO of Takkinship, a platform
            that connects people with the people they care about. With
            Takkinship, you can easily find the people you care about and
            connect with them.
            <br />
            <br />
            Masaba Ian Samuel is a visionary leader who is passionate about
            technology and its potential to change the world. He has a deep
            understanding of how technology can be used to solve complex problems.
          </p>
        </div>
      </div>
    </div>
  );
}
