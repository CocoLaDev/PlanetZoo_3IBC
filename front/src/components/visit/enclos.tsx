import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Gltf, OrbitControls } from "@react-three/drei";
import * as three from "three";
import { Zoo } from "../../services";
import { Space } from "../../dto";

interface EnclosProps {
  setSpace?: React.Dispatch<React.SetStateAction<Space | undefined>>;
  space: Space;
}

const Enclos = ({ setSpace, space }: EnclosProps) => {
  const obj = useRef<three.Mesh>(null!);

  useEffect(() => {
    return () => {
      Zoo.updateSpaceCapacity(space._id, "remove");
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      {setSpace && (
        <button
          className="absolute top-2 left-2 z-10"
          onClick={() => {
            setSpace(undefined);
            Zoo.updateSpaceCapacity(space._id, "remove");
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
              src={"/" + space.images}
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
