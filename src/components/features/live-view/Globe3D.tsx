import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  // Environment,
  OrbitControls,
  useTexture,
  // Stars,
} from "@react-three/drei";

import * as THREE from "three";

function MarkerLine({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array([
      start[0],
      start[1],
      start[2],
      end[0],
      end[1],
      end[2],
    ]);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [start, end]);

  return (
    <primitive
      object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }))}
    />
  );
}

interface Point {
  latitude: number;
  longitude: number;
  label?: string;
  color?: string;
}

interface Globe3DProps {
  points?: Point[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

// Componente de marcador pulsante
function PulsingMarker({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const material = mesh.material as THREE.MeshStandardMaterial;

    if (!material) return;

    // Tempo com delay para criar variação entre marcadores
    const time = state.clock.elapsedTime + delay;

    // Animação de pulsar (escala varia entre 0.8 e 1.2)
    const pulseScale = 1 + Math.sin(time * 2) * 0.2;
    mesh.scale.setScalar(pulseScale);

    // Animação de brilho (emissividade varia entre 0.3 e 1.0)
    const pulseIntensity = 0.3 + (Math.sin(time * 2) + 1) * 0.35;
    material.emissiveIntensity = pulseIntensity;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.01, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Componente interno que usa a textura
function GlobeWithTexture({ points = [] }: Globe3DProps) {
  const globeRef = useRef<THREE.Mesh>(null);

  // Carregar textura do mapa do mundo
  // Usando CDN confiável do jsDelivr com textura do Three.js
  // Esta URL é hospedada em CDN e geralmente mais confiável
  const earthTexture = useTexture(
    "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_lights_2048.png"
  );

  // Configurar a textura
  earthTexture.wrapS = THREE.ClampToEdgeWrapping;
  earthTexture.wrapT = THREE.ClampToEdgeWrapping;

  // Converter latitude/longitude para coordenadas 3D
  const pointPositions = useMemo(() => {
    return points.map((point) => {
      const phi = (90 - point.latitude) * (Math.PI / 180);
      const theta = (point.longitude + 180) * (Math.PI / 180);

      const x = -(Math.sin(phi) * Math.cos(theta));
      const z = Math.sin(phi) * Math.sin(theta);
      const y = Math.cos(phi);

      return {
        position: [x * 1.1, y * 1.1, z * 1.1] as [number, number, number],
        color: point.color || "#F8009D",
        label: point.label,
      };
    });
  }, [points]);

  return (
    <group>
      {/* Globo principal com textura do mapa */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.9}
          metalness={0.4}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0}
        />
      </mesh>

      {/* Pontos marcados - dentro do mesmo group para acompanhar o globo */}
      {pointPositions.map((point, index) => {
        const startPos = point.position;
        const endPos: [number, number, number] = [
          point.position[0] * 1.1,
          point.position[1] * 1.1,
          point.position[2] * 1.1,
        ];

        return (
          <group key={index}>
            <PulsingMarker
              position={point.position}
              color={point.color}
              delay={index * 0.5}
            />
            {/* Linha conectando o ponto à superfície */}
            <MarkerLine start={startPos} end={endPos} color={point.color} />
          </group>
        );
      })}

      {/* Iluminação - aumentada para melhor visualização */}
      <ambientLight intensity={4.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
    </group>
  );
}

// Wrapper do Globe sem textura (fallback)
function Globe({ points = [] }: Globe3DProps) {
  const globeRef = useRef<THREE.Mesh>(null);

  // Converter latitude/longitude para coordenadas 3D
  const pointPositions = useMemo(() => {
    return points.map((point) => {
      const phi = (90 - point.latitude) * (Math.PI / 180);
      const theta = (point.longitude + 180) * (Math.PI / 180);

      const x = -(Math.sin(phi) * Math.cos(theta));
      const z = Math.sin(phi) * Math.sin(theta);
      const y = Math.cos(phi);

      return {
        position: [x * 1.01, y * 1.01, z * 1.01] as [number, number, number],
        color: point.color || "#F8009D",
        label: point.label,
      };
    });
  }, [points]);

  return (
    <group>
      {/* Globo principal com textura do mapa */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Linhas de grade */}
      <mesh>
        <sphereGeometry args={[1, 65, 65]} />
        <meshBasicMaterial color="#F8009D" wireframe transparent opacity={1} />
      </mesh>

      {/* Pontos marcados */}
      {pointPositions.map((point, index) => {
        const startPos = point.position;
        const endPos: [number, number, number] = [
          point.position[0] * 1.1,
          point.position[1] * 1.1,
          point.position[2] * 1.1,
        ];

        return (
          <group key={index}>
            <PulsingMarker
              position={point.position}
              color={point.color}
              delay={index * 0.5}
            />
            {/* Linha conectando o ponto à superfície */}
            <MarkerLine start={startPos} end={endPos} color={point.color} />
          </group>
        );
      })}

      {/* Iluminação */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  );
}

export function Globe3D({ points = [] }: Globe3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<Globe points={points} />}>
          <GlobeWithTexture points={points} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2} // 2.3
          maxDistance={4}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        {/* <Stars radius={5} depth={50} count={1000} factor={4} fade speed={1} /> */}
        {/* <Environment preset="city" /> */}
      </Canvas>
    </div>
  );
}
