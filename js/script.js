// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('trofeo-container').appendChild(renderer.domElement);

// Materiales
const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });

// Base inferior
const baseGeometry = new THREE.CylinderGeometry(2.2, 2.2, 0.2, 32);
const base = new THREE.Mesh(baseGeometry, blackMaterial);
base.position.y = -2;
scene.add(base);

// Base superior con placa
const upperBaseGeometry = new THREE.CylinderGeometry(2, 2, 1, 32);
const upperBase = new THREE.Mesh(upperBaseGeometry, blackMaterial);
upperBase.position.y = -1.5;
scene.add(upperBase);

const plaqueGeometry = new THREE.BoxGeometry(2, 0.5, 0.1);
const plaque = new THREE.Mesh(plaqueGeometry, goldMaterial);
plaque.position.set(0, 0.1, 1.95); // Frente de la base superior
upperBase.add(plaque);

// Pilar
const pillarGeometry = new THREE.CylinderGeometry(0.5, 1.6, 3, 100);
const pillar = new THREE.Mesh(pillarGeometry, goldMaterial);
pillar.position.x = 0;
pillar.position.y = 0.5;
scene.add(pillar);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(1.1, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, goldMaterial);
sphere.position.y = 2.8;
scene.add(sphere);

// Corazón
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 1);
heartShape.bezierCurveTo(1.5, 1.5, 1.5, 0, 0, -1);
heartShape.bezierCurveTo(-1.5, 0, -1.5, 1.5, 0, 1);

const extrudeSettings = { depth: 0, bevelEnabled: true, bevelThickness: 1.3, bevelSize: 1.8 };
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
const heart = new THREE.Mesh(heartGeometry, goldMaterial);
heart.rotation.x = 0; // Mantener orientación vertical
heart.position.y = 7;
scene.add(heart);

// Alambres en forma de corazón alrededor del corazón
const heartWireGroup = new THREE.Group();
const curve = new THREE.CurvePath();

// Definir la forma del corazón con líneas y curvas
const points = [];
points.push(new THREE.Vector3(0, 2.5, 0));
points.push(new THREE.Vector3(2.5, 3.0, 0));
points.push(new THREE.Vector3(3.9, 0, 0));
points.push(new THREE.Vector3(0, -3.4, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(0, -3.4, 0));
points.push(new THREE.Vector3(-3.9, 0, 0));
points.push(new THREE.Vector3(-2.5, 3.0, 0));
points.push(new THREE.Vector3(0, 2.5, 0));

curve.add(new THREE.CatmullRomCurve3(points));

// Crear los alambres con TubeGeometry
const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.2, 8, true);
const wire = new THREE.Mesh(tubeGeometry, goldMaterial);
wire.position.set(0, 7, 0); // Ajustar posición para rodear el corazón
heartWireGroup.add(wire);

scene.add(heartWireGroup);

// Luz ambiental y puntual
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 10, 5);
scene.add(pointLight);

// Cámara
camera.position.set(0, 4, 13);
camera.lookAt(0, 4, 0);

// Animación
function animate() {
  requestAnimationFrame(animate);
  heart.rotation.y += 0.01; // Rotación del corazón
  renderer.render(scene, camera);
}

animate();
