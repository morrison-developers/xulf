'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const MODEL_CONFIG = {
  scale: [1.5, 1.5, 1.5] as [number, number, number],
  positionZ: 5,
  ambientLightColor: 0xffffff,
  ambientLightIntensity: 0.8,
  cameraFov: 75,
  cameraNear: 0.1,
  cameraFar: 1000,
  rotationAxis: 'z' as keyof THREE.Euler,
  initialRotation: [1.5, 0, 0],
  rotationSpeed: -0.001,
  enableZoom: false,
  enablePan: false,
  rotateModel: true,
};

const Logo3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    console.log('[Logo3D] useEffect triggered');

    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      MODEL_CONFIG.cameraFov,
      width / height,
      MODEL_CONFIG.cameraNear,
      MODEL_CONFIG.cameraFar
    );
    camera.position.z = MODEL_CONFIG.positionZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = MODEL_CONFIG.enableZoom;
    controls.enablePan = MODEL_CONFIG.enablePan;

    // Teal light that follows the camera
    const cameraLight = new THREE.DirectionalLight(0x00ffff, 1);
    cameraLight.position.copy(camera.position);
    cameraLight.target.position.set(0, 0, 0);
    scene.add(cameraLight);
    scene.add(cameraLight.target);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(MODEL_CONFIG.ambientLightColor, MODEL_CONFIG.ambientLightIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x488188, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0x488188, 1);
    spotLight.position.set(-10, 20, 10);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    scene.add(spotLight);

    const pointLight = new THREE.PointLight(0x62e2f3, 0.8, 100);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0xe0f7fa, 0x080820, 0.5);
    scene.add(hemisphereLight);

    const loader = new GLTFLoader();
    loader.load('/icon.glb', (gltf) => {
      if (modelRef.current) {
        scene.remove(modelRef.current);
      }
      modelRef.current = gltf.scene;
      modelRef.current.scale.set(...MODEL_CONFIG.scale);
      modelRef.current.rotation.set(
        MODEL_CONFIG.initialRotation[0],
        MODEL_CONFIG.initialRotation[1],
        MODEL_CONFIG.initialRotation[2]
      );
      scene.add(modelRef.current);
      console.log('[Logo3D] Model loaded');
    });

    const animate = () => {
      type RotationAxis = 'x' | 'y' | 'z';
      requestAnimationFrame(animate);
      controls.update();
      // Update cameraLight to follow camera
      cameraLight.position.copy(camera.position);
      if (modelRef.current && MODEL_CONFIG.rotateModel) {
        const axis = MODEL_CONFIG.rotationAxis;
        modelRef.current.rotation[axis as RotationAxis] += MODEL_CONFIG.rotationSpeed;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      console.log('[Logo3D] Cleaning up');
      window.removeEventListener('resize', handleResize);
      if (modelRef.current) scene.remove(modelRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Logo3D;
