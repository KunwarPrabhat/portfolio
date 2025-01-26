import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";

const Globe = ({ setEnteredGlobe }) => {
  const globeRef = useRef();
  const [freelook, setFreelook] = useState(true);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const bgLoader = new THREE.TextureLoader();
    bgLoader.load("img.jpg", function (texture) {
      scene.background = texture;
    });

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.2,
      5000
    );
    camera.position.set(0, 0, 1200);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.minDistance = 300;
    controls.maxDistance = 1200;
    controls.zoomSpeed = 1;
    controls.enablePan = false;
    controlsRef.current = controls;

    let zoomTarget = camera.position.distanceTo(controls.target);

    //handling scroll event to adjust zoom target.
    const handleScroll = (event) => {
      const scrollDelta = event.deltaY * 0.8; //zoom speed
      zoomTarget = THREE.MathUtils.clamp(
        zoomTarget + scrollDelta,
        controls.minDistance,
        controls.maxDistance
      );
    };
    window.addEventListener("wheel", handleScroll);

    // Loading the GLB model
    const loader = new GLTFLoader();
    loader.load(
      "./SkyGlobe.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        let texture = null;

        // Traversing the model to find the texture dynamically
        model.traverse((child) => {
          if (child.isMesh && child.material?.map) {
            texture = child.material.map;
          }
        });

        if (texture) {
          const sphereGeometry = new THREE.SphereGeometry(500, 64, 64);
          const sphereMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide,
          });

          const innerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          scene.add(innerSphere);

          // Removing the original model after extracting its texture.
          scene.remove(model);

          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);

            // Interpolate camera zoom
            const currentDistance = camera.position.distanceTo(controls.target);
            const zoomFactor = 0.1; // Adjust for smoother or faster zoom
            const newDistance = THREE.MathUtils.lerp(
              currentDistance,
              zoomTarget,
              zoomFactor
            );

            // Adjust camera position for smooth zoom
            const direction = new THREE.Vector3()
              .subVectors(camera.position, controls.target)
              .normalize()
              .multiplyScalar(newDistance);
            camera.position.copy(direction.add(controls.target));

            // Calculating the zoom distance
            // const zoomDistance = controls.target.distanceTo(camera.position);

            // Stop rotation if zoom distance is below a threshold
            if (newDistance > 550) {
              setEnteredGlobe(false);
              innerSphere.rotation.y += 0.002;
            }
            if (newDistance < 550) {
              setEnteredGlobe(true);
              innerSphere.rotation.y += 0.0003;
            }
            controls.update();
            renderer.render(scene, camera);
          };

          animate();
        } else {
          console.error("No texture found in the loaded model.");
        }
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the GLB file:", error);
      }
    );

    // Handle window resize.
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      globeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = freelook;
    }
  }, [freelook]);

  return (
    <>
      <div>
        <button
          style={{
            position: "fixed",
            bottom: "1rem",
            left: "1rem",
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: "0x000000",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(251, 67, 67, 1)",
            zIndex: 100,
            cursor: "none",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onClick={() => {
            setFreelook((prev) => !prev);
          }}
        >
          {freelook ? <HiLockOpen size={25} /> : <HiLockClosed size={25} />}
        </button>
      </div>
      <div
        ref={globeRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: 10,
        }}
      />
    </>
  );
};

export default Globe;
