import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import React, { useRef, useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const TShirt = () => {
  const snap = useSnapshot(state);
  console.log(snap);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const textTexture = useTexture(snap.textDecal || './threejs.png'); // Always provide a texture
  console.log('Text Texture : ',textTexture);
  const meshRef = useRef();

  // Apply lighting settings from state
  useEffect(() => {
    if (logoTexture) {
      logoTexture.anisotropy = 16;
    }
  }, [logoTexture]);

  useFrame((state, delta) => {
    // Apply color with lighting adjustments
    easing.dampC(
      materials.lambert1.color, 
      snap.color, 
      0.25, 
      delta
    );
    
    // Apply lighting settings if available
    if (snap.lighting) {
      state.scene.traverse((object) => {
        if (object.isLight) {
          object.intensity = snap.lighting.intensity;
          object.color.set(snap.lighting.color);
          object.castShadow = snap.lighting.shadows;
        }
      });
    }
  });
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        ref={meshRef}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isTextTexture && snap.textDecal && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.2}
            map={textTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default TShirt;
