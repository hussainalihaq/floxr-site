'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load if user hasn't requested reduced motion, and viewport > 1024px
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth > 1024;
    
    if (prefersReducedMotion || !isDesktop) {
      if (mountRef.current) {
        // Fallback CSS gradient
        mountRef.current.style.background = 'radial-gradient(circle at center, rgba(184,255,87,0.1) 0%, transparent 70%)';
      }
      return;
    }

    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Icosahedron geometry gives a nice vertex base for a sphere
    const geometry = new THREE.IcosahedronGeometry(1.5, 32); // 32 details = lots of vertices
    
    // Store original positions for animation
    const positions = geometry.attributes.position.array as Float32Array;
    const originalPositions = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i++) {
        originalPositions[i] = positions[i];
    }
    
    // Materials
    // A dark points material with subtle lime tint
    const material = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xb8ff57, // Lime color
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates for the Three.js scene
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.05;

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      // Rotate orb
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;
      
      // Morphing effect based on mouse hover
      const positionsAttr = geometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;
      
      for (let i = 0; i < posArray.length; i += 3) {
        // Base positions
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        // Apply a gentle noise/wave to vertices
        // We use a simple sine wave offset driven by time and position
        const noiseInfo = Math.sin(time + ox * 2 + oy * 2) * 0.05;
        
        // Push vertices outward slightly based on mouse proximity to center
        const distanceToMouse = Math.sqrt(Math.pow(ox - targetX, 2) + Math.pow(oy - (-targetY), 2));
        const pushForce = Math.max(0, 1 - distanceToMouse) * 0.2; // Push force

        // Update positions
        const scale = 1 + noiseInfo + pushForce;
        
        posArray[i] = ox * scale;
        posArray[i + 1] = oy * scale;
        posArray[i + 2] = oz * scale;
      }
      
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
