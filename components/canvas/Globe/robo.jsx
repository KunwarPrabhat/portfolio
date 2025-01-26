import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';


export const Robot = ({ position, scale, rotation, initialHeadRotation = { x: 0.2, y: 0.2 }}) => {

    const { scene } = useGLTF('/websiteRobo.glb');
    const headRef = useRef();
    const mousePosition = useRef({ x: 0, y: 0 });

    // Event listener for mouse movement
    useEffect(() => {
        const handleMouseMove = (event) => {
            mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = (event.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (headRef.current) {
            // Setting the initial rotation of the head using the passed prop
            headRef.current.rotation.set(initialHeadRotation.x, initialHeadRotation.y, 0);
        }
    }, [initialHeadRotation]);

    // Head rotation based on mouse movement
    useFrame(() => {
        if (headRef.current) {
            const sensitivity = 0.3; // sensitivity for more rotation
            const smoothing = 0.2;  // Smoothing factor for interpolation

            const targetRotationX = mousePosition.current.y * sensitivity + initialHeadRotation.x;
            const targetRotationY = mousePosition.current.x * sensitivity + initialHeadRotation.y;

            // smooth interpolation for natural motion
            headRef.current.rotation.x += (targetRotationX - headRef.current.rotation.x) * smoothing;
            headRef.current.rotation.y += (targetRotationY - headRef.current.rotation.y) * smoothing;
        }
    });

    return (
        <group position={position} scale={scale} rotation={rotation}>
            <group>
                <OrbitControls 
                enableZoom={false}
                enablePan={false} 
                enableDamping 
                dampingFactor={0.02} 
                enableRotate={true} 
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2.2} />
                <primitive object={scene.getObjectByName('Body')} />
            </group>

            <group  ref={headRef}>
                <primitive object={scene.getObjectByName('Head')} />
            </group>
        </group>
    );
};

useGLTF.preload('/websiteRobot.glb');


