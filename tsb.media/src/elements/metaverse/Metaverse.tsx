import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { BoxElement } from "../box";

export const MetaverseElement = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#1a1a1a" }}>
      <Canvas camera={{ position: [0, 0, 35] }}>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <BoxElement position={[0, 2, 0]} />
      </Canvas>
    </div>
  );
};
