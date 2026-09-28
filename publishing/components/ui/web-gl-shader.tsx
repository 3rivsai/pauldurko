"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneRefs = {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  mesh: THREE.Mesh | null;
  uniforms: {
    resolution: { value: [number, number] };
    time: { value: number };
    xScale: { value: number };
    yScale: { value: number };
    distortion: { value: number };
  } | null;
  animationId: number | null;
};

export function WebGLShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { current: refs } = sceneRef;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        p.y += 0.22;

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.052 / max(abs(p.y + sin((rx + time) * xScale) * yScale), 0.012);
        float g = 0.052 / max(abs(p.y + sin((gx + time) * xScale) * yScale), 0.012);
        float b = 0.052 / max(abs(p.y + sin((bx + time) * xScale) * yScale), 0.012);

        vec3 color = clamp(vec3(r, g, b), 0.0, 1.0);
        float intensity = clamp(max(max(r, g), b), 0.0, 1.0);

        gl_FragColor = vec4(color, intensity * 0.9);
      }
    `;

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms || !canvas.parentElement) return;
      const { width, height } = canvas.getBoundingClientRect();
      refs.renderer.setSize(width, height, false);
      refs.uniforms.resolution.value = [width, height];
    };

    refs.scene = new THREE.Scene();
    refs.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      premultipliedAlpha: false,
    });
    refs.renderer.setClearColor(0xffffff, 0);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    refs.uniforms = {
      resolution: { value: [1, 1] },
      time: { value: 0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          -1, -1, 0,
          3, -1, 0,
          -1, 3, 0,
        ]),
        3
      )
    );

    const material = new THREE.RawShaderMaterial({
      blending: THREE.NormalBlending,
      depthWrite: false,
      fragmentShader,
      transparent: true,
      uniforms: refs.uniforms,
      vertexShader,
    });

    refs.mesh = new THREE.Mesh(geometry, material);
    refs.scene.add(refs.mesh);

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.008;
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
      refs.animationId = requestAnimationFrame(animate);
    };

    handleResize();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose();
        }
      }
      refs.renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
