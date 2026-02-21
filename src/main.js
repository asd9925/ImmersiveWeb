import './style.css'
import * as THREE from 'three'
//call helper function
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'

//referencing scene in THREE library (anything with THREE prefix is refering something in the THREE library)
//THREE.Scene

//calling three library with our own variable scene
const scene = new THREE.Scene();

//FOV, ASPECT RATIO, NEAR, FAR
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

//antialias makes rendering smoother, less pixels, just turn on by default
const renderer = new THREE.WebGLRenderer({ antialias: true});

//set up over, now add things to scene
//meshes means something 3d btw
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
// const mesh = new THREE.Mesh(geometry, material);

// //call function
// const mesh = addDefaultMeshes();
// //now add mesh to scene (pass thing you're adding in argument)
// //won't add things to scene manually
// scene.add(mesh);

//global function, curly brackets means object (currently empty)
//container for meshes
const meshes = {}

//container for lights
const lights = {}

init();
//all setup stuff goes here
function init(){
  //render full screen (choose size, can change)
  renderer.setSize(window.innerWidth, window.innerHeight)
  //created screen caputre, drew image, so put it on the screen
  document.body.appendChild(renderer.domElement);

  //by defalt everything is at 0,0,0 so move your camera back by 5
  camera.position.z = 5;

  //add a light to the scene (not needed for mesh basic!!)
  lights.default = addLight()
  scene.add(lights.default)

  //here we populat our meshes object/container
  //mesh.default = mesh i got back
  meshes.default = addDefaultMeshes();
  //move the cube
  meshes.default.position.x = 2;

  //add standard material from external function
  meshes.standard = addStandardMeshes()
  meshes.standard.position.x = -2

  //add meshes to our screen
  scene.add(meshes.default);
  scene.add(meshes.standard)
  
  console.log(meshes)

  instances()
  resize()
  animate();
}

function instances(){
  const flower = new Model({
    url: './bouquet.glb',
    scene: scene,
    meshes: meshes,
    scale: new THREE.Vector3(2,2,2),
    position: new THREE.Vector3(0, -0.8, 3),
    replace: true,
    // replaceURL: '/newmat/png',
  })
  flower.init()
}

function resize(){
  window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

function animate(){
  //create loop
  requestAnimationFrame(animate);

  //rotate cube on x-axis
  // mesh.rotation.x += 0.1

  //tell renderer to render whats in arguments (current scene and camera)
  renderer.render(scene, camera);

  meshes.default.rotation.x += 0.01;
  meshes.standard.rotation.y += 0.01

}