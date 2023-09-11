import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Scene({ vertices }) {
  const ref = useRef();
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({
      canvas: ref.current,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xf0f0f0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.position.set(-10, 10, 10);
    light.target.position.set(0, 0, 0);
    scene.add(light);

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      mesh.rotation.z += 0.01;
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      light.dispose();
    };
  }, [vertices]);
  return (
    <canvas ref={ref}></canvas>
  );
}

export default Scene;