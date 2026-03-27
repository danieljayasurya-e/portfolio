import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 600 }) {
  const mesh = useRef<THREE.Points>(null);

  const [geometry, sizes] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sizeArr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      sizeArr[i] = Math.random() * 0.03 + 0.01;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizeArr, 1));
    return [geo, sizeArr];
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color: "#00f0ff",
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.015;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.0008;
      pos[i * 3] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.05) * 0.0003;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={mesh} geometry={geometry} material={material} />;
}

function NebulaCloud({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * 2 * scale;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count, scale]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.06,
        color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return <points ref={ref} position={position} geometry={geometry} material={material} />;
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
      <torusGeometry args={[1.5, 0.015, 16, 120]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} />
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
      <torusGeometry args={[1, 0.012, 16, 100]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.08} />
    </mesh>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.5 + 1;
    ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.3 - 2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref} position={[-2, 1, -4]}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

function OrbitalLine() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.PI / 3;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <torusGeometry args={[4, 0.005, 8, 200]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.06} />
    </mesh>
  );
}

const ParticleField = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={600} />
        <NebulaCloud position={[4, 2, -8]} color="#00f0ff" scale={1.5} />
        <NebulaCloud position={[-5, -2, -6]} color="#a855f7" scale={1.2} />
        <FloatingRing />
        <FloatingRing2 />
        <FloatingSphere />
        <OrbitalLine />
      </Canvas>
    </div>
  );
};

export default ParticleField;
