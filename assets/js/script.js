import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// get the size of the div container
const canvasWidth = Math.min(400, window.innerWidth / 3.5);
const canvasHeight = Math.min(500, window.innerWidth / 3);
const aspectRatio = canvasWidth / canvasHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor(window.getComputedStyle(document.body).backgroundColor);
// renderer.setClearColor(0xeeeeee);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// document.body.prepend(renderer.domElement);
document.getElementById('3d-model-container').appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.aspect = aspectRatio;
camera.updateProjectionMatrix();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const mainLight = new THREE.DirectionalLight(0xc1fbd9, 6);
mainLight.position.set(5, 10, 6);
mainLight.target.position.set(0, 0, 0);

ambientLight.castShadow = true;
mainLight.castShadow = true;
mainLight.shadow.bias = -0.0002;
scene.add(ambientLight);
scene.add(mainLight);

const target = new THREE.Object3D();

const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// get the mouse position on the canvas
window.addEventListener('mousemove', (event) => {
  const canvasX = document.getElementById('3d-model-container').getBoundingClientRect().left + document.getElementById('3d-model-container').getBoundingClientRect().width / 2;
  const canvasY = document.getElementById('3d-model-container').getBoundingClientRect().top + document.getElementById('3d-model-container').getBoundingClientRect().height / 2;
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 2*canvasX/ window.innerWidth;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 2*canvasY / window.innerHeight;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mousePosition, camera);
  raycaster.ray.intersectPlane(plane, intersectionPoint);
  target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
});

// for mobile devices: get the touch position on the canvas
window.addEventListener('touchmove', (event) => {
  const canvasX = document.getElementById('3d-model-container').getBoundingClientRect().left + document.getElementById('3d-model-container').getBoundingClientRect().width / 2;
  const canvasY = document.getElementById('3d-model-container').getBoundingClientRect().top + document.getElementById('3d-model-container').getBoundingClientRect().height / 2;
  mousePosition.x = (event.touches[0].clientX / window.innerWidth) * 2 - 2*canvasX/ window.innerWidth;
  mousePosition.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 2*canvasY / window.innerHeight;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mousePosition, camera);
  raycaster.ray.intersectPlane(plane, intersectionPoint);
  target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
});
window.addEventListener('touchstart', (event) => {
  const canvasX = document.getElementById('3d-model-container').getBoundingClientRect().left + document.getElementById('3d-model-container').getBoundingClientRect().width / 2;
  const canvasY = document.getElementById('3d-model-container').getBoundingClientRect().top + document.getElementById('3d-model-container').getBoundingClientRect().height / 2;
  mousePosition.x = (event.touches[0].clientX / window.innerWidth) * 2 - 2*canvasX/ window.innerWidth;
  mousePosition.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 2*canvasY / window.innerHeight;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mousePosition, camera);
  raycaster.ray.intersectPlane(plane, intersectionPoint);
  target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
});

let head;

const loader = new GLTFLoader().setPath('assets/models/');
loader.load('face.glb', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(.15, .7, 0);
  mesh.scale.set(1.05, 1.05, 1.05);
  scene.add(mesh);

  head = mesh.getObjectByName('Head');

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  const w = Math.min(400, window.innerWidth / 3.5);
  const h = Math.min(500, window.innerWidth / 3);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

function animate() {
  if (head) {
    head.lookAt(target.position);
  }

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();