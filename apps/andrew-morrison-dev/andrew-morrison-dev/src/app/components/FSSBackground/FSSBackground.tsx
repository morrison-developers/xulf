'use client';

import { useEffect, useRef } from 'react';

export function FSSBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/flat-surface-shader/deploy/fss.min.js'; // public path
    script.async = true;

    script.onload = () => {
      const FSS = (window as any).FSS;
      if (!FSS || !containerRef.current) return;

      // Setup
      const renderer = new FSS.CanvasRenderer();
      const scene = new FSS.Scene();

      const geometry = new FSS.Plane(window.innerWidth, window.innerHeight, 16, 12);
      const originalVertices = geometry.vertices.map((v: any) => ({
        x: v.position.x,
        y: v.position.y,
        z: v.position.z,
      }));      
      const material = new FSS.Material('#000000', '#ffffff');
      const mesh = new FSS.Mesh(geometry, material);
      const light = new FSS.Light('#387d4b', '#740972');

      scene.add(mesh);
      scene.add(light);

      // Mount canvas
      const canvas = renderer.element;
      canvas.style.background = '#111111';
      containerRef.current.appendChild(canvas);
      renderer.setSize(window.innerWidth, window.innerHeight);

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });      

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      
      const animate = () => {
        const now = Date.now() * 0.002;
      
        for (let i = 0; i < geometry.vertices.length; i++) {
          const v = geometry.vertices[i];
          const o = originalVertices[i];
      
          v.position.x = o.x + Math.sin(now + i * 0.3) * 8;
          v.position.y = o.y + Math.cos(now + i * 0.5) * 8;
        }
        geometry.dirty = true;
      
        light.setPosition(
          mouseX - window.innerWidth / 2,
          window.innerHeight / 2 - mouseY,
          100
        );
      
        renderer.render(scene);
        requestAnimationFrame(animate);
      };      
       
      animate();

      // Resize handling
      const handleResize = () => {
        geometry.width = window.innerWidth;
        console.log('WIDTH: ', geometry.width)
        geometry.height = window.innerHeight;
        console.log('HEIGHT: ', geometry.height)
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        containerRef.current?.removeChild(canvas);
        document.body.removeChild(script);
      };
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: -1,
        overflow: 'hidden',
      }}
    />
  );
}


