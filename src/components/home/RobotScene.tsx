"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";

function RobotModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene}
      scale={2.0}      // 👈 MODEL SIZE CONTROL
      position={[0, -2, 0]}
    />
  );
}

export default function RobotScene({ url }: { url: string }) {
  return (
    <Canvas
      camera={{ position: [4, 2.5, 6], fov: 32 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <RobotModel url={url} />

      <Environment preset="studio" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
