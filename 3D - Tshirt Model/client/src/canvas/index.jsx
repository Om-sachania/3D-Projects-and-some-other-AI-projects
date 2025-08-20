import { Center, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import TShirt from './T-Shirt'
import CameraRig from './CameraRig'
import BackDrop from './BackDrop'


const CanvasModel = () => {
  return (
    <Canvas shadows camera={{ position:[0,0,0], fov:25 }} gl={{preserveDrawingBuffer:true}} className='w-full h-full max-w-full transition-all ease-in'>
      <ambientLight intensity={0.5}/>
      <Environment preset='city'/>
      <CameraRig>
        <BackDrop/>
        <Center>
          <TShirt/>
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel