'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Particle system — warm bokeh
    const COUNT = 320;
    const positions = new Float32Array(COUNT * 3);
    const initialPositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const offsets = new Float32Array(COUNT);

    const warmPalette = [
      new THREE.Color(0xff8c42), // amber
      new THREE.Color(0xffb347), // orange
      new THREE.Color(0xffd27f), // golden
      new THREE.Color(0xffffff), // white
      new THREE.Color(0x7ecbff), // soft blue accent
      new THREE.Color(0xff6b35), // deep orange
    ];

    for (let i = 0; i < COUNT; i++) {
      const rx = (Math.random() - 0.5) * 18;
      const ry = (Math.random() - 0.5) * 12;
      const rz = (Math.random() - 0.5) * 8;

      positions[i * 3 + 0] = rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = rz;

      initialPositions[i * 3 + 0] = rx;
      initialPositions[i * 3 + 1] = ry;
      initialPositions[i * 3 + 2] = rz;

      const col = warmPalette[Math.floor(Math.random() * warmPalette.length)];
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 28 + 6;
      speeds[i] = Math.random() * 0.3 + 0.1;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Bokeh sprite texture
    const bokehCanvas = document.createElement('canvas');
    bokehCanvas.width = 64;
    bokehCanvas.height = 64;
    const ctx = bokehCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(bokehCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Float particles & apply mouse interaction
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const mx = mouseX * 8;
      const my = mouseY * 5;

      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3;
        const px = initialPositions[idx];
        const py = initialPositions[idx + 1];
        const pz = initialPositions[idx + 2];

        const s = speeds[i];
        const o = offsets[i];

        // Animate base coordinates floating upwards and wrap around Y
        initialPositions[idx + 1] = (((py + 0.0035 * s + 6) % 12) - 6);
        initialPositions[idx] = px + Math.sin(elapsed * s + o) * 0.002;

        const curX = initialPositions[idx];
        const curY = initialPositions[idx + 1];

        // Calculate distance to mouse
        const dx = mx - curX;
        const dy = my - curY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulse particles within 3.2 units of mouse
        const maxDist = 3.2;
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const pushX = (dx / dist) * force * -0.75;
          const pushY = (dy / dist) * force * -0.75;
          pos.array[idx] = curX + pushX;
          pos.array[idx + 1] = curY + pushY;
        } else {
          pos.array[idx] = curX;
          pos.array[idx + 1] = curY;
        }
        pos.array[idx + 2] = pz;
      }
      pos.needsUpdate = true;

      // Parallax camera (enhanced range for better responsiveness)
      targetX += (mouseX * 0.8 - targetX) * 0.04;
      targetY += (mouseY * 0.5 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Breathe opacity
      material.opacity = 0.45 + Math.sin(elapsed * 0.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1, // behind contents, in front of body background
        mixBlendMode: 'screen',
      }}
    />
  );
}
