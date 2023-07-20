import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Gltf, OrbitControls } from "@react-three/drei";
import * as three from "three";
import { Zoo } from "../../services";

interface EnclosProps {
  setEnclosVisited?: React.Dispatch<React.SetStateAction<boolean>>;
  objectSource: string;
}

const Enclos = ({ setEnclosVisited, objectSource }: EnclosProps) => {
  const obj = useRef<three.Mesh>(null!);

  return (
    <div className="w-full h-full relative">
      {setEnclosVisited && (
        <button
          className="absolute top-2 left-2 z-10"
          onClick={() => {
            setEnclosVisited(false);
            Zoo.updateSpaceCapacity("64b90a2361d5fc0758ff9475", "remove");
          }}
        >
          Exit
        </button>
      )}
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [0, 10, 50],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#ccd5ae");
        }}
      >
        <OrbitControls />
        <Suspense fallback={null}>
          <pointLight intensity={1.0} position={[5, 3, 5]} />
          <mesh ref={obj}>
            <Gltf
              src={objectSource}
              position={[0, -15, 0]}
              rotation={[0, -2, 0]}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Enclos;
