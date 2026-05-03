import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";

// Floating rotating torus ring
const FloatingTorus = ({ position, scale, speed, color }) => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
    mesh.current.rotation.y = state.clock.elapsedTime * speed;
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 60]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// Central distorted sphere
const CoreSphere = () => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#00fff9"
          attach="material"
          distort={0.4}
          speed={2}
          transparent
          opacity={0.08}
          wireframe={false}
          emissive="#00fff9"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </mesh>
  );
};

// Orbiting small boxes
const OrbitBox = ({ radius, speed, yOffset, color }) => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    mesh.current.position.x = Math.cos(t) * radius;
    mesh.current.position.z = Math.sin(t) * radius;
    mesh.current.position.y = yOffset + Math.sin(t * 2) * 0.2;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const HeroCanvas = () => {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00fff9" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff2d78" />

        <CoreSphere />

        <FloatingTorus
          position={[0, 0, 0]}
          scale={2.5}
          speed={0.3}
          color="#00fff9"
        />
        <FloatingTorus
          position={[0, 0, 0]}
          scale={3.5}
          speed={0.15}
          color="#ff2d78"
        />
        <FloatingTorus
          position={[0, 0, 0]}
          scale={4.5}
          speed={0.08}
          color="#7700ff"
        />

        <OrbitBox radius={2.5} speed={0.5} yOffset={0} color="#00fff9" />
        <OrbitBox radius={2.5} speed={0.5} yOffset={0} color="#ff2d78" />
        <OrbitBox radius={3.2} speed={0.3} yOffset={0.5} color="#7700ff" />
        <OrbitBox radius={3.2} speed={0.3} yOffset={-0.5} color="#00fff9" />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
