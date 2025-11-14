import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { useState, useRef, Suspense } from 'react'
import * as THREE from 'three'

function RotatingObject({ onHover }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += hovered ? 0.005 : 0.002
      meshRef.current.rotation.y += 0.003

      // Breathing scale animation
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          setHovered(true)
          onHover?.(true)
        }}
        onPointerLeave={() => {
          setHovered(false)
          onHover?.(false)
        }}
        onClick={() => setClicked(!clicked)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={clicked ? '#ff6b9d' : '#8b5cf6'}
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          wireframe
          color={hovered ? '#a78bfa' : '#8b5cf6'}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Glowing ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.05, 32, 256]} />
        <meshStandardMaterial
          color={hovered ? '#ff6b9d' : '#8b5cf6'}
          emissive={hovered ? '#ff6b9d' : '#8b5cf6'}
          emissiveIntensity={hovered ? 1 : 0.5}
        />
      </mesh>
    </group>
  )
}

function Scene({ onObjectHover }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#ff6b9d" />
      <pointLight position={[0, 0, 10]} intensity={0.5} />

      {/* Main object */}
      <RotatingObject onHover={onObjectHover} />

      {/* Environment and controls */}
      <Environment preset="night" intensity={0.5} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enableZoom={true}
        maxDistance={8}
        minDistance={2}
        autoRotateSpeed={hovered => hovered ? 1 : 2}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </>
  )
}

export default function ThreeCanvas() {
  const [hoveredObject, setHoveredObject] = useState(false)

  return (
    <div className="w-full h-full relative">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="text-center">
              <div className="animate-spin mb-4">⟳</div>
              <p className="text-foreground-secondary text-sm">Loading 3D visualization...</p>
            </div>
          </div>
        }
      >
        <Canvas gl={{ antialias: true, alpha: true }}>
          <Scene onObjectHover={setHoveredObject} />
        </Canvas>
      </Suspense>

      {/* Info overlay */}
      {hoveredObject && (
        <div className="absolute bottom-4 left-4 bg-glass border border-accent/50 rounded-lg p-3 text-xs text-foreground-secondary backdrop-blur pointer-events-none">
          <p>↔ Drag to rotate</p>
          <p>⊕ Scroll to zoom</p>
          <p>☆ Click to change color</p>
        </div>
      )}
    </div>
  )
}
