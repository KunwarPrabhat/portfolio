import React, { useState } from "react";
import Interface from "../components/Interface/Interface.jsx";
import Globe from "../components/canvas/Globe/globe.jsx";
import NavMenu from "../components/NavMenu/NavMenu.jsx";
import {Canvas} from "@react-three/fiber";
import {Robot} from "../components/canvas/Globe/robo.jsx";
import DropMenu from "../components/DropDownMenu/DropMenu.jsx";
import CustomCursor from "../components/CustomCursor/CustomCursor.jsx";
import "./App.css";

const App = () => {
  const [enteredGlobe, setEnteredGlobe] = useState(null);
  return (
    <div>
      <div>
        <CustomCursor />
      </div>
      <div className="interface-container">
        <Interface enteredGlobe={enteredGlobe}/>
      </div>
      <div className="globe-container">
        <Globe setEnteredGlobe={setEnteredGlobe}/>
      </div>
      <div className="navmenu">
        <NavMenu enteredGlobe={enteredGlobe}/>
      </div>
      <div className="dropmenu">
        <DropMenu enteredGlobe={enteredGlobe}/>
      </div>
      {/*This is a robot container*/}
      <div style={{ width: "100vw", height: "100vh" }}>
        <div  className={`robo-container ${enteredGlobe ? "visible" : "invisible"}`}>
          <div className="robo-inner-container">
            <Canvas>
              <ambientLight intensity={2} />

              <directionalLight position={[20, 10, 5]} intensity={2} />
              <directionalLight position={[-20, 10, -5]} intensity={2} />
              <Robot
                position={[0, 1.5, 0]}
                scale={[1, 1, 1]}
                rotation={[0.05, 0.6, 0]}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
