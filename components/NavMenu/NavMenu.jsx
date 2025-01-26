import React, { useState, useEffect } from "react";
import { ImCool2 } from "react-icons/im";
import { FaLink } from "react-icons/fa";
import { ImDisplay } from "react-icons/im";
import { IoHomeSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineCloseFullscreen } from "react-icons/md";

import "./NavMenu.css";

const NavMenu = ({enteredGlobe}) => {
  const [menuOpen, setMenuOpen] = useState(true);
//to sync the menuOpen state with the globe state
  useEffect(() => {
    if (enteredGlobe) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true); 
    }
  }, [enteredGlobe]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const handleMenuClick = () => {
    toggleMenu();
  };

  return (
    <>
      <div className="parent-container">
        <div className={`nav-menu ${menuOpen ? "open" : "collapsed"}`}>
          <nav className="menu" onClick={handleMenuClick}>
            {menuOpen ? (
              <MdOutlineCloseFullscreen className="icon" size={35} />
            ) : (
              <TiThMenu className="icon" size={35} />
            )}
          </nav>

          <button className="menu-item">
            <IoHomeSharp size={25} />
            <span>Home</span>
          </button>

          <button className="menu-item">
            <ImDisplay size={25} />
            <span>Projects</span>
          </button>

          <button className="menu-item">
            <FaLink size={25} />
            <span>Connect</span>
          </button>

          <button className="menu-item">
            <ImCool2 size={25} />
            <span>About Me</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavMenu;