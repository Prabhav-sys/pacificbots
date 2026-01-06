"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/* === ROBOT MODEL === */

function RobotModel() {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/robot.glb");

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={ref} scale={1.3} position={[0, -0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* === HERO SCENE === */

export default function Hero3DBackground() {
  return (
    <div className="hero-3d-wrapper">
      <Canvas
        camera={{ position: [3.2, 2.2, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 6]} intensity={1.3} />

        <RobotModel />
        <Environment preset="warehouse" />
      </Canvas>

      {/* OVERLAY */}
      <div className="hero-overlay-content">
        <h1 className="hero-brand">
          PACIFIC <span>BOTS</span>
        </h1>

        <p className="hero-subtitle">
          Robotics · Automation · Applied Intelligence
        </p>

        <div className="hero-actions">
          <a href="/blogs" className="btn-primary">
            Explore Research
          </a>
          <a href="/tutorials" className="btn-secondary">
            View Tutorials
          </a>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("/models/robot.glb");
