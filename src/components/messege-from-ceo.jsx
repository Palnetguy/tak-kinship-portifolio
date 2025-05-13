import React from "react";
import "../css/messege-form-ceo.css";
import ceoImage from "../images/CEO image.jpg";

export default function MessegeFromCeo() {
  return (
    <div className="messege-from-ceo">
      <p className="pretitle">A word from our CEO</p>
      <h1 className="title">Tusingwire Martin</h1>
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
            Ultimately, TAK Kinship is about building a community. A community
            where technology serves humanity, where innovation has a heart, and
            where every step we take brings us closer to a future we can all
            believe in.
            <br />
            <br />
            I'm genuinely excited about the journey ahead, and I invite you to
            join us in making this vision a reality. Let's build something truly
            meaningful, together.
          </p>
        </div>
      </div>
    </div>
  );
}
