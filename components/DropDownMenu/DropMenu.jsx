import React, { useEffect, useState } from "react";
import "./DropMenu.css";
import { AiFillCloseSquare } from "react-icons/ai";

const DropMenu = ({ enteredGlobe }) => {
  const [skillmenuOpen, setSkillMenuOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [educationmenuOpen, seteducationmenuOpen] = useState(false);
  const [projectmenuOpen, setprojectmenuOpen] = useState(false);

  const toggleSkillMenu = () => {
    setSkillMenuOpen((prev) => !prev);
  };
  const toggleEduMenu = () => {
    seteducationmenuOpen((prev) => !prev);
  };
  const toggleProjectMenu = () => {
    setprojectmenuOpen((prev) => !prev);
  };
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <>
      <div
        className={`content-section ${enteredGlobe ? "active" : "inactive"}`}
      >
        <div className="button-container">
          <div className="inner-button-container" onClick={toggleProjectMenu}>
            <button className="projects"></button>
          </div>
          <span className="button-label">Projects</span>
        </div>
        <div className="button-container">
          <div className="inner-button-container" onClick={toggleSkillMenu}>
            <button className="skills"></button>
          </div>
          <span className="button-label">Skills</span>
        </div>
        <div className="button-container">
          <div className="inner-button-container">
            <button className="internships"></button>
          </div>
          <span className="button-label">Internships</span>
        </div>
        <div className="button-container">
          <div className="inner-button-container" onClick={toggleEduMenu}>
            <button className="education"></button>
          </div>
          <span className="button-label">Education</span>
        </div>
      </div>
      {/* skill section */}
      <div className={`skill-section ${skillmenuOpen ? "" : "hidden"}`}>
        <div className={`skill-container ${skillmenuOpen ? "open" : "closed"}`}>
          <button className="container-close-button" onClick={toggleSkillMenu}>
            <AiFillCloseSquare size={35} />
          </button>

          <div className="skills-content">
            {/* Programming Languages */}
            <div className="skills-category">
              <h3>Programming Languages</h3>
              <ul>
                <div className="list-items">
                  <li>C</li>
                  <li>C++</li>
                  <li>Go</li>
                  <li>Python</li>
                  <li>JavaScript</li>
                </div>
              </ul>
            </div>

            {/* Web Development */}
            <div className="skills-category">
              <h3>Web Dev/Libraries</h3>
              <ul>
                <div className="list-items">
                  <li>React.js</li>
                  <li>Three.js</li>
                  <li>Socket.io</li>
                  <li>SQL</li>
                  <li>HTML_5</li>
                  <li>CSS</li>
                </div>
              </ul>
            </div>

            {/* Machine Learning and Data Science */}
            <div className="skills-category">
              <h3>ML/Libraries</h3>
              <ul>
                <div className="list-items">
                  <li>TensorFlow</li>
                  <li>NumPy</li>
                  <li>Matplotlib/Plotly</li>
                  <li>Pandas</li>
                </div>
              </ul>
            </div>

            {/* Libraries and Tools */}
            <div className="skills-category">
              <h3>Tools & Tech stacks</h3>
              <ul>
                <div className="list-items">
                  <li>Git (Version Control)</li>
                  <li>Github</li>
                  <li>Arch Linux</li>
                  <li>Windows OS </li>
                  <li>Visual Studio IDE</li>
                  <li>VS Code</li>
                  <li>Sublime Text Editor</li>
                  <li>Jupyter</li>
                  <li>Powershell</li>
                </div>
              </ul>
            </div>

            {/* Database */}
            <div className="skills-category">
              <h3>Database</h3>
              <ul>
                <li>SQL Basics</li>
              </ul>
              <h3>Personal Skills</h3>
              <ul>
                <li>3D Modeling </li>
                <li>Animation </li>
                <li>Hobbyist Typist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Education section */}
      <div className={`edu-section ${educationmenuOpen ? "" : "hidden"}`}>
        <div
          className={`edu-container ${educationmenuOpen ? "open" : "closed"}`}
        >
          <button className="container-close-button" onClick={toggleEduMenu}>
            <AiFillCloseSquare size={35} />
          </button>

          <div className="education-details">
            <h2>Education Qualifications</h2>
            <p>
              I am a third-year student currently pursuing Engineering in
              Computer Science from
              <strong className="institute">
                Cambridge Institute of Technology, Ranchi.
              </strong>
            </p>
            <p>
              With a strong foundation in Computer Science and a keen interest
              in technology, I enjoy solving problems and bringing ideas to life
              through technology. I strive to learn and grow with every project,
              focusing on creating practical and effective solutions.
            </p>

            <ul>
              <li>
                <strong className="matriculation">Matriculation:</strong>{" "}
                Completed in 2019 with a 92% aggregate (CBSE affiliated).
              </li>
              <li>
                <strong className="intermediate">Intermediate:</strong>{" "}
                Completed in 2021 with an 88% aggregate (CBSE affiliated).
              </li>
              <li>
                <strong className="graduation">Graduation:</strong>Started 2022,
                Expected to complete in 2026.
              </li>
            </ul>
            <h2>My hobbies</h2>
            <p>
              I enjoy 3D modeling, animation, playing guitar, reading novels,
              sketching, and typing as hobbies. Over the past two years, I have
              been practicing 3D modeling and animation, creating a few projects
              in Blender and Unity. Playing guitar and sketching allow me to
              express my creativity, while reading novels helps me unwind and
              explore new ideas, While listening to music helps me tp relax and
              improve my focus.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`project-section ${projectmenuOpen ? "active" : "hidden"}`}
      >
        <button className="container-close-button" onClick={toggleProjectMenu}>
          <AiFillCloseSquare size={35} />
        </button>
        <div className={`pro-1 ${projectmenuOpen ? "animate-top" : "revert-bottom"}`}>
          content 1
        </div>  
        <div className={`pro-2 ${projectmenuOpen ? "animate-bottom" : "revert-top"}`}>
          content 2
        </div>
        <div className={`pro-3 ${projectmenuOpen ? "animate-top" : "revert-bottom"}`}>
          content 3
        </div>
        <div className={`pro-4 ${projectmenuOpen ? "animate-bottom" : "revert-top"}`}>
          content 4
        </div>
      </div>
    </>
  );
};

export default DropMenu;

{
  /* <div className={`project-section ${educationmenuOpen ? "": "hidden"}`}>
<div className={`project-container ${educationmenuOpen ?"open": "closed"}`}>
  <button className="container-close-button">
    <AiFillCloseSquare size={35} />
  </button>

</div> */
}
