import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export const useFabricSimulation = (meshRef, properties) => {
  const [simulation, setSimulation] = useState(null);
  const originalVertices = useRef(null);
  const currentVertices = useRef(null);
  const velocities = useRef(null);
  
  // Initialize the simulation
  const initSimulation = useCallback((props) => {
    if (!meshRef.current) return null;
    
    const geometry = meshRef.current.geometry;
    
    // Store original vertices
    if (!originalVertices.current) {
      originalVertices.current = geometry.attributes.position.array.slice();
    }
    
    // Initialize current vertices and velocities
    currentVertices.current = geometry.attributes.position.array.slice();
    
    const vertexCount = currentVertices.current.length / 3;
    velocities.current = new Float32Array(currentVertices.current.length);
    
    return {
      stiffness: props?.stiffness || 0.8,
      mass: props?.mass || 1.0,
      damping: props?.damping || 0.7,
      stretchiness: props?.stretchiness || 0.3
    };
  }, []);
  
  // Reset simulation with new properties
  const resetSimulation = useCallback((props) => {
    const newSimulation = initSimulation(props);
    if (newSimulation) {
      setSimulation(newSimulation);
    }
    
    if (originalVertices.current && meshRef.current) {
      const geometry = meshRef.current.geometry;
      geometry.attributes.position.array.set(originalVertices.current);
      geometry.attributes.position.needsUpdate = true;
    }
  }, [initSimulation]);
  
  // Update simulation for each frame
  const updateSimulation = useCallback((deltaTime) => {
    if (!simulation || !meshRef.current) return;
    
    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position.array;
    
    // Apply gravity and constraints
    for (let i = 0; i < positions.length; i += 3) {
      // Skip shoulder/collar vertices (keep them fixed)
      if (positions[i + 1] > 0.5) continue;
      
      // Apply gravity
      velocities.current[i + 1] -= 9.8 * simulation.mass * deltaTime;
      
      // Apply damping
      velocities.current[i] *= 1 - simulation.damping * deltaTime;
      velocities.current[i + 1] *= 1 - simulation.damping * deltaTime;
      velocities.current[i + 2] *= 1 - simulation.damping * deltaTime;
      
      // Update positions
      positions[i] += velocities.current[i] * deltaTime;
      positions[i + 1] += velocities.current[i + 1] * deltaTime;
      positions[i + 2] += velocities.current[i + 2] * deltaTime;
    }
    
    // Apply stiffness constraints (pull vertices back toward original shape)
    for (let i = 0; i < positions.length; i += 3) {
      const diffX = originalVertices.current[i] - positions[i];
      const diffY = originalVertices.current[i + 1] - positions[i + 1];
      const diffZ = originalVertices.current[i + 2] - positions[i + 2];
      
      positions[i] += diffX * simulation.stiffness * deltaTime;
      positions[i + 1] += diffY * simulation.stiffness * deltaTime;
      positions[i + 2] += diffZ * simulation.stiffness * deltaTime;
    }
    
    // Mark geometry for update
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [simulation]);
  
  // Initialize on mount and when properties change
  useEffect(() => {
    if (properties && meshRef.current) {
      const newSimulation = initSimulation(properties);
      if (newSimulation) {
        setSimulation(newSimulation);
      }
    }
    
    return () => {
      // Reset geometry on unmount
      if (originalVertices.current && meshRef.current) {
        const geometry = meshRef.current.geometry;
        geometry.attributes.position.array.set(originalVertices.current);
        geometry.attributes.position.needsUpdate = true;
      }
    };
  }, [properties, initSimulation]);
  
  return { updateSimulation, resetSimulation };
};