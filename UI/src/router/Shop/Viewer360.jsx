import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring';
import * as THREE from 'three'; // Import THREE from the three package

const Viewer360 = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { coords } = useSpring({
        coords: [currentImageIndex * (Math.PI / 18), 0, 0], // Adjust the division factor for smoother rotation
    });

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
                <animated.group rotation={coords}>
                    <mesh>
                        <sphereGeometry args={[5, 60, 40]} />
                        <meshBasicMaterial map={images[currentImageIndex]} side={THREE.DoubleSide} />
                    </mesh>
                </animated.group>
            </Canvas>
            <div>
                <button onClick={handlePrev}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default Viewer360;
