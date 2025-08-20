import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useRef } from 'react'

const BackDrop = () => {
    const shadowRef = useRef();

  return (
    <AccumulativeShadows position={[0,0,-0.14]}
    ref={shadowRef}
    temporal
    frames={60}
    alphaTest={0.85}
    scale={10}
    rotation={[Math.PI/2,0,0]}
    >
        <RandomizedLight amount={2} radius={8} intensity={0.75} ambient={0.25} position={[5,5,-10]}/>
        <RandomizedLight amount={2} radius={5} intensity={0.45} ambient={0.55} position={[-5,5,-9]}/>
    </AccumulativeShadows>
  )
}

export default BackDrop