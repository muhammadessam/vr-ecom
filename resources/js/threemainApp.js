import * as THREE from 'three/build/three.module.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

var camera, controls, scene, renderer;

init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 3000);
    camera.position.set(-900, -200,-900);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    // world
    var materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('img/arid2_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('img/arid2_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('img/arid2_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('img/arid2_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('img/arid2_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('img/arid2_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_lf}));

    for (let i = 0 ; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    var geometry = new THREE.BoxGeometry(1000, 1000, 1000, );

    var mesh = new THREE.Mesh(geometry, materialArray);

    scene.add(mesh);


    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    requestAnimationFrame(animate);
}
function render() {
    renderer.render(scene, camera);
}
