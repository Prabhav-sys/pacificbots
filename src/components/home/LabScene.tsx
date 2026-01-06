"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import RobotModel from "./RobotModel";

export default function LabScene() {
  return (
    <Canvas 
      camera={{ position: [7, 4.5, 7], fov: 30 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 12, 8]} intensity={1.5} />
      <directionalLight position={[-6, 4, -6]} intensity={0.4} />

      <RobotModel />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
        enableDamping
      />

      <Environment preset="warehouse" />
    </Canvas>
  );
}
