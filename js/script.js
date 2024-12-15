// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('trofeo-container').appendChild(renderer.domElement);

// Material dorado
const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });

// Base del trofeo
const baseGeometry = new THREE.CylinderGeometry(2, 2, 1, 32);
const base = new THREE.Mesh(baseGeometry, goldMaterial);
base.position.y = -1.5;
scene.add(base);

// Copa del trofeo
const cupGeometry = new THREE.ConeGeometry(1.5, 3, 32);
const cup = new THREE.Mesh(cupGeometry, goldMaterial);
cup.position.y = 1;
scene.add(cup);

// Luz puntual
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Cámara
camera.position.set(0, 1, 5);
camera.lookAt(0, 0, 0);

// Animación
function animate() {
  requestAnimationFrame(animate);
  base.rotation.y += 0.01;
  cup.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
