import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF, Environment } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function ChildhoodBooksModel({ position, scrollY }: { position: [number, number, number]; scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/childhood_books/scene.gltf");
  const rotationRef = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotation = Math.sin(state.clock.elapsedTime * 0.3) * Math.PI * 0.4;
      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, targetRotation, 0.05);
      groupRef.current.rotation.y = rotationRef.current;

      groupRef.current.rotation.x = THREE.MathUtils.degToRad(20);
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      const scrollFactor = Math.min(scrollY / 800, 1);
      groupRef.current.position.x = position[0] - scrollFactor * 3;
      groupRef.current.position.y = position[1] + Math.sin(scrollY * 0.002) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        <primitive object={gltf.scene.clone()} scale={10} />
        <pointLight position={[0, 0, 2]} intensity={2} color="#ff8800" distance={8} />
      </group>
    </Float>
  );
}

function PaladinsBookModel({ position, scrollY }: { position: [number, number, number]; scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/paladins_book/scene.gltf");
  const rotationRef = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotation = Math.sin(state.clock.elapsedTime * 0.3) * -Math.PI * 0.4;
      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, targetRotation, 0.05);
      groupRef.current.rotation.y = rotationRef.current;

      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;

      const scrollFactor = Math.min(scrollY / 800, 1);
      groupRef.current.position.x = position[0] + scrollFactor * 3;
      groupRef.current.position.y = position[1] + Math.sin(scrollY * 0.002 + Math.PI) * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
      <group ref={groupRef} position={position}>
        <primitive object={gltf.scene.clone()} scale={10} />
        <pointLight position={[0, 0, 2]} intensity={2.5} color="#ffaa44" distance={8} />
      </group>
    </Float>
  );
}

function OrbitingOrbs({ count = 12, scrollY }: { count?: number; scrollY: number }) {
  const orbsRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      radius: 6 + Math.random() * 3,
      speed: 0.2 + Math.random() * 0.4,
      offset: (Math.PI * 2 * i) / count,
      size: 0.05 + Math.random() * 0.06,
      color: i % 3 === 0 ? "#ff8800" : i % 3 === 1 ? "#ffaa44" : "#ff6600",
    }));
  }, [count]);

  useFrame((state) => {
    if (orbsRef.current) {
      const scrollScale = Math.max(0.5, 1 - scrollY / 1600);
      orbsRef.current.scale.set(scrollScale, scrollScale, scrollScale);

      orbsRef.current.children.forEach((orb, i) => {
        const orbData = orbs[i];
        const time = state.clock.elapsedTime * orbData.speed + orbData.offset;
        orb.position.x = Math.cos(time) * orbData.radius;
        orb.position.z = Math.sin(time) * orbData.radius;
        orb.position.y = Math.sin(time * 2) * 2 + Math.cos(time * 3) * 0.5;

        const scale = 1 + Math.sin(time * 4) * 0.2;
        orb.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={orbsRef}>
      {orbs.map((orb) => (
        <mesh key={orb.id}>
          <sphereGeometry args={[orb.size, 20, 20]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function BackgroundParticles({ scrollY }: { scrollY: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;

      const scrollOpacity = Math.max(0.2, 1 - scrollY / 800);
      if (particlesRef.current.material instanceof THREE.PointsMaterial) {
        particlesRef.current.material.opacity = scrollOpacity * 0.7;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ff8800" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ scrollY = 0 }: { scrollY?: number }) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ff8800" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#4488ff" />
        <pointLight position={[0, 5, 5]} intensity={2} color="#ffaa44" />
        <spotLight position={[0, 10, 0]} intensity={1.5} color="#ff8800" angle={0.6} penumbra={1} />

        <Environment preset="night" />

        <Suspense fallback={null}>
          <ChildhoodBooksModel position={[-6, 2, 1]} scrollY={scrollY} />
          <PaladinsBookModel position={[6, -3, 1]} scrollY={scrollY} />
          <OrbitingOrbs count={15} scrollY={scrollY} />
          <BackgroundParticles scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/childhood_books/scene.gltf");
useGLTF.preload("/models/paladins_book/scene.gltf");
