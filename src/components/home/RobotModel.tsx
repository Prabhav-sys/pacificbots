"use client";

import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { Group, Box3, Vector3 } from "three";

export default function RobotModel({
  onReady,
}: {
  onReady?: (group: Group) => void;
}) {
  const ref = useRef<Group>(null!);
  const { scene } = useGLTF("/models/robot.glb");

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Measure original size
    const box = new Box3().setFromObject(ref.current);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    // Center model
    // 🔥 shift model left for better composition
ref.current.position.x -= 0.8;

    // 🔥 MUCH LARGER normalization target
    const maxDim = Math.max(size.x, size.y, size.z);
    const TARGET_SIZE = 10; // <<< THIS IS THE KEY
    const scale = TARGET_SIZE / maxDim;

    ref.current.scale.setScalar(scale);

    onReady?.(ref.current);
  }, [onReady]);

  return <primitive ref={ref} object={scene} />;
}

useGLTF.preload("/models/robot.glb");
