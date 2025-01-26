import React, {useState} from "react";
import "./Interface.css";
//importing icons
import { FaDiscord } from "react-icons/fa6";
import { TfiGithub } from "react-icons/tfi";
import { BsLinkedin } from "react-icons/bs";
import { FaSquareInstagram } from "react-icons/fa6";

const Interface = ({ enteredGlobe }) => {
  return (
    <>
      <div>
        {/* name section */}
        <section className={`section ${enteredGlobe ? "inactive" : "active"}`}>
          <div className="profile-img"></div>
          <h1 className="title">
            Hi, my
            <br />
            <span>
              name is <span className="highlight">Prabhat</span>
            </span>
          </h1>
          <p className="subtitle">
            I'm a passionate <p className="developer">Developer</p> and a<p className="artist">3D Artist</p>.
          </p>
        </section>
      </div>
      {/* footer bar */}
      <div className="footer-bar">
        <button className="discord">
          <FaDiscord size={25} />
        </button>
        <button className="github">
          <TfiGithub size={25} />
        </button>
        <button className="linkedin">
          <BsLinkedin size={25} />
        </button>
        <button className="instagram">
          <FaSquareInstagram size={25} />
        </button>
      </div>
    </>
  );
};

export default Interface;
