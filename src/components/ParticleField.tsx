import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 400 }) {
  const mesh = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color: "#22d3ee",
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={mesh} geometry={geometry} material={material} />;
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={ref} position={[3, 0, -2]}>
      <torusGeometry args={[1.2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
    </mesh>
  );
}

function FloatingRing2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.4;
  });

  return (
    <mesh ref={ref} position={[-3, 1, -3]}>
      <torusGeometry args={[0.8, 0.015, 16, 80]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.12} />
    </mesh>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.5 + 1;
    ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.3 - 2;
  });

  return (
    <mesh ref={ref} position={[-2, 1, -4]}>
      <icosahedronGeometry args={[0.4, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

const ParticleField = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={400} />
        <FloatingRing />
        <FloatingRing2 />
        <FloatingSphere />
      </Canvas>
    </div>
  );
};

export default ParticleField;
