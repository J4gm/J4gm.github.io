import * as THREE from "three";
import * as RAPIER from "rapier";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const GITHUB = "https://github.com/J4gm";
const LINKEDIN = "https://www.linkedin.com/in/jack-mullin-001922188/";
const CURSEFORGE = "https://modrinth.com/user/J4gm";

// Wait for the physics engine to start.
await RAPIER.init();

// Set to true when the projectile is launched.
let started = false;
// Set to true when the projectile hits the stack of boxes.
let orbiting = false;
// Holds the name of the currently highlighted mesh.
let hovered = "";

const tooltip = document.getElementById("tooltip");

// Create Rapier world with Earth gravity.
const world = new RAPIER.World({x: 0, y: -9.81, z: 0});

// Create THREE scene and renderer.
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: false});
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;
// A blue colour for the sky.
renderer.setClearColor(new THREE.Color(0x4488FF), 1);
renderer.setSize(window.innerWidth, window.innerHeight);
// A 3x3 group of pixels is rendered as one to give an aliased retro look.
const pixelScale = 3;
renderer.setPixelRatio(window.devicePixelRatio / pixelScale);

// Create camera.
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 5, 10);
// This variable holds the orbit controls once they're initialised.
let controls;

// Load textures.
const loader = new THREE.TextureLoader();
function loadTexture(fileName) {
    let texture = loader.load(fileName);
    // Set filtering to nearest neighbour so the pixel textures aren't blurry.
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
}
const boxTexture = loadTexture("textures/box.png");
const floorTexture = loadTexture("textures/floor.png");
const githubTexture = loadTexture("textures/github.png");
const linkedinTexture = loadTexture("textures/linkedin.png");
const minecraftTexture = loadTexture("textures/minecraft.png");
const webDesignTexture = loadTexture("textures/web_design.png")
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 128, 128 );

// Add lighting.
scene.add(new THREE.AmbientLight(0xFFFFFF, 0.5));
const light = new THREE.DirectionalLight();
light.position.set(-10, 20, 15);
light.lookAt(new THREE.Vector3(0, 2, 0))
// Shadow settings.
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100;
light.shadow.camera.top = 25;
light.shadow.camera.bottom = -25;
light.shadow.camera.left = -25;
light.shadow.camera.right = 25;
scene.add(light);

// Arrays for holding Three.js meshes and their corresponding Rapier physics objects.
let meshes = [];
let bodies = [];

// Function for adding a basic cuboid to both Three.js and Rapier.
function addCuboid(name, sizeX, sizeY, sizeZ, posX, posY, posZ, material, dynamic) {
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ), material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = name;
    scene.add(mesh);
    // Rapier uses radius instead of diameter for its objects.
    let collider = RAPIER.ColliderDesc.cuboid(sizeX / 2, sizeY / 2, sizeZ / 2);
    let body = world.createRigidBody(
        dynamic ?
        RAPIER.RigidBodyDesc.dynamic().setTranslation(posX, posY, posZ) :
        RAPIER.RigidBodyDesc.fixed().setTranslation(posX, posY, posZ)
    );
    world.createCollider(collider, body);
    meshes.push(mesh);
    bodies.push(body);
    return body;
}

// This is the stack of boxes.
addCuboid("box1", 2, 2, 2, 0, 2, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box2", 2, 2, 2, 3, 2, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("web-design", 2, 2, 2, 6, 2, 0, new THREE.MeshStandardMaterial({map: webDesignTexture}), true);
addCuboid("box4", 2, 2, 2, -3, 2, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("linkedin", 2, 2, 2, -6, 2, 0, new THREE.MeshStandardMaterial({map: linkedinTexture}), true);
addCuboid("box6", 2, 2, 2, 1.5, 4, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box7", 2, 2, 2, -1.5, 4, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("minecraft", 2, 2, 2, 4.5, 4, 0, new THREE.MeshStandardMaterial({map: minecraftTexture}), true);
addCuboid("github", 2, 2, 2, -4.5, 4, 0, new THREE.MeshStandardMaterial({map: githubTexture}), true);
addCuboid("box10", 2, 2, 2, 0, 6, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box11", 2, 2, 2, 3, 6, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box12", 2, 2, 2, -3, 6, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box13", 2, 2, 2, 1.5, 8, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box14", 2, 2, 2, -1.5, 8, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);
addCuboid("box15", 2, 2, 2, 0, 10, 0, new THREE.MeshStandardMaterial({map: boxTexture}), true);

// Add the projectile, then give it a punt and a bit of random spin.
const projectile = addCuboid("projectile", 3, 3, 3, 0, 4, 40, new THREE.MeshStandardMaterial({map: boxTexture}), true);
projectile.setLinvel({x: 0, y: 2, z: -50});
projectile.setAngvel({x: 20 * Math.random() - 10, y: 20 * Math.random() - 10, z: 20 * Math.random() - 10});

// A floor so things don't fall into the void.
addCuboid("floor", 512, 1, 512, 0, 0, 0, new THREE.MeshStandardMaterial({map: floorTexture}), false);

let a = 0;

const INTERVAL = 1000 / 60;
let then = Date.now();

// Animation function.
function animate() {

    let now = Date.now();
    let delta = now - then;
    requestAnimationFrame(animate);

    if (delta > INTERVAL) {

        then = now - (delta % INTERVAL);

        // A simple counter used by some of the animations.
        a = (a + 1) % 200;

        // Physics engine doesn't run until the projectile has been clicked.
        if (started) {
            world.step();
        }

        // Sync the positions and rotations of the Three.js meshes with their corresponding Rapier physics objects.
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].position.copy(bodies[i].translation());
            meshes[i].quaternion.copy(bodies[i].rotation());
        }

        // Pulse animation for the meshes. This is visual only and doesn't affect the physics objects.
        if (a < 30 && orbiting) {
            let scale = 1 + (15 - Math.abs(a - 15)) * 0.005;
            scene.getObjectByName("github").scale.set(scale, scale, scale);
            scene.getObjectByName("linkedin").scale.set(scale, scale, scale);
            scene.getObjectByName("minecraft").scale.set(scale, scale, scale);
            scene.getObjectByName("web-design").scale.set(scale, scale, scale);
        }
        if (a == 30) {
            scene.getObjectByName("github").scale.set(1, 1, 1);
            scene.getObjectByName("linkedin").scale.set(1, 1, 1);
            scene.getObjectByName("minecraft").scale.set(1, 1, 1);
            scene.getObjectByName("web-design").scale.set(1, 1, 1);
        }

        // Visually rotate the mesh that is being hovered over. This does not change the rotations of the physics object.
        if (hovered != ""){
            scene.getObjectByName(hovered).rotation.y += 2 * Math.PI * a / 100;
        }

        // A chase cam with a bit of pan while the projectile is in motion.
        let projPos = new THREE.Vector3(projectile.translation().x, projectile.translation().y, projectile.translation().z);
        if (projectile.translation().z > 0) {
            camera.position.z = Math.max(10, projectile.translation().z + 5 + 8 * (40 - projectile.translation().z) / 40);
            camera.lookAt(projPos);
        }
        // Once the projectile has hit the boxes, initialise the orbit cam.
        else if (!orbiting){
            controls = new OrbitControls(camera, renderer.domElement);
            controls.target = projPos;
            // Prevent the user from looking below the ground.
            controls.maxPolarAngle = Math.PI / 2;
            controls.enableZoom = false;
            controls.enablePan = false;
            orbiting = true;
            // Drop the main title onto the screen.
            document.getElementById("main-title").classList.add("main-title-move");
            // Change the cursor style to indicate the scene can be dragged.
            document.body.style.cursor = "grab";
        }

        // Update the orbit cam.
        if (orbiting) {
            controls.update();
        }

        // Render.
        renderer.render(scene, camera);

    }

};

animate();

// Resize listener.
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Close all the side panels.
function closeAllPanels(){
    document.getElementById("minecraft").classList.remove("panel-move");
    document.getElementById("web-design").classList.remove("panel-move");
    document.getElementById("contact").classList.remove("panel-move");
    document.getElementById("main-title").classList.add("main-title-move");
}

// Click listeners for the close buttons in the panels.
let closeButtons = document.getElementsByClassName("close-button");
for (let i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener("click", closeAllPanels);
}

// A ray cast function for getting the mesh that the mouse is hovering over.
const raycaster = new THREE.Raycaster();
function getIntersections(e) {
    let mousePointer = new THREE.Vector2();
    mousePointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mousePointer, camera);
    return raycaster.intersectObjects(scene.children, true);
}

const tooltips = {
    "minecraft": "Minecraft mods",
    "web-design": "Web design and data visualisation",
    "linkedin": "LinkedIn profile",
    "github": "Github profile"
}

let buttonDown = false;

// Click listener for the Three.js canvas.
renderer.domElement.addEventListener('mousedown', event => {

    buttonDown = true;

    // Clicking out of a panel closes it.
    if (orbiting) {
        closeAllPanels();
        document.body.style.cursor = "grabbing";
    }

    // Cast a ray.
    let intersections = getIntersections(event);
    if(intersections.length > 0){
        // The first mesh encountered by the ray is the closest to the camera and therefore the one we want to deal with.
        switch(intersections[0].object.name){
            case "projectile":
                // This sets the physics simulation going.
                started = true;
                document.getElementById("start").classList.add("be-gone");
                break;
            case "minecraft":
            case "web-design":
                // Open the panel corresponding to the cube that was clicked.
                let panel = document.getElementById(intersections[0].object.name);
                panel.classList.add("panel-move");
                // Focus on the panel so that arrow key scroll controls work properly.
                panel.focus();
                // Move the main title out of the way.
                document.getElementById("main-title").classList.remove("main-title-move");
                break;
            case "github":
                clearColors();
                hovered = "";
                window.open(GITHUB);
                break;
            case "linkedin":
                clearColors();
                hovered = "";
                window.open(LINKEDIN);
                break;
            default:
                break;
        }
    }
    
});

renderer.domElement.addEventListener('mouseup', event => {

    buttonDown = false;

    if (orbiting) {
        document.body.style.cursor = "grab";
    }

});

// Remove the teal tint from the hoverable boxes.
function clearColors() {
    scene.getObjectByName("github").material.color = {isColor: true, r: 1, g: 1, b: 1};
    scene.getObjectByName("linkedin").material.color = {isColor: true, r: 1, g: 1, b: 1};
    scene.getObjectByName("minecraft").material.color = {isColor: true, r: 1, g: 1, b: 1};
    scene.getObjectByName("web-design").material.color = {isColor: true, r: 1, g: 1, b: 1};
}

// Mouse move listener.
renderer.domElement.addEventListener('mousemove', event => {
    if (orbiting) {

        clearColors();
        hovered = "";

        // Cast a ray.
        let intersections = getIntersections(event);
        if (intersections.length > 0) {
            // Update which mesh is being hovered over and add a teal tint.
            if (["github", "linkedin", "minecraft", "web-design"].includes(intersections[0].object.name)) {
                intersections[0].object.material.color = {isColor: true, r: 1, g: 5, b: 5};
                hovered = intersections[0].object.name;
                tooltip.style.left = `${event.clientX + 25}px`;
                tooltip.style.top = `${event.clientY + 10}px`;
                tooltip.innerHTML = tooltips[hovered];
                tooltip.style.display = "block";
                document.body.style.cursor = "pointer";
            }
        }

        if (hovered == "") {
            tooltip.style.display = "none";
            document.body.style.cursor = buttonDown ? "grabbing" : "grab";
        }

    }
});

// Listener for the keyboard controls, placed on the document so that the canvas doesn't have to be focused.
document.body.addEventListener('keydown', event => {

    // The tab key cycles through all the selectable cubes.
    if (event.code == "Tab") {
        // Prevent the tab key from selecting the links on the off-screen panels.
        event.preventDefault();
        if (orbiting) {
            clearColors();
            // Cycle through the cubes.
            switch (hovered) {
                case "github":
                    hovered = "linkedin";
                    break;
                case "linkedin":
                    hovered = "minecraft";
                    break;
                case "minecraft":
                    hovered = "web-design";
                    break;
                case "web-design":
                    hovered = "github";
                    break;
                default:
                    hovered = "github";
                    break;
            }
            // Add the teal tint to the selected mesh.
            scene.getObjectByName(hovered).material.color = {isColor: true, r: 1, g: 5, b: 5};
        }
    }

    // The enter key launches the projectile, opens a panel, or opens a link, depending on context.
    else if (event.code == "Enter") {
        event.preventDefault();
        // Pressing enter at the beginning does the same thing as clicking on the projectile.
        if (!started) {
            started = true;
            document.getElementById("start").classList.add("be-gone");
        }
        if (orbiting) {
            // If a mesh is hovered and it's not the one that currently has a panel open.
            if (hovered != "" && !document.getElementById(hovered).classList.contains("panel-move")) {
                // Pressing enter has the same result as clicking on one of the cubes.
                closeAllPanels();
                if (hovered == "github") {
                    hovered = "";
                    window.open(GITHUB);
                } else if (hovered == "linkedin") {
                    hovered = "";
                    window.open(LINKEDIN);
                } else {
                    let panel = document.getElementById(hovered);
                    panel.classList.add("panel-move");
                    panel.focus();
                    document.getElementById("main-title").classList.remove("main-title-move");
                }
            }
            // Else if a panel is open and no other mesh is hovered, open the link to the corresponding website.
            else if(document.getElementById("minecraft").classList.contains("panel-move")){
                window.open(CURSEFORGE);
            }
        }
    }

    // The escape key closes the current panel.
    else if (event.code == "Escape") {
        event.preventDefault();
        if (orbiting){
            closeAllPanels();
        }
    }

    // Rotate orbit camera when arrow keys are pressed.
    else if(event.code == "ArrowRight" || event.code == "ArrowLeft") {
        event.preventDefault();
        if (orbiting) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = event.code == "ArrowRight" ? -20 : 20;
        }
    }

});

document.body.addEventListener('keyup', event => {
    // Stop rotating orbit camera when arrow keys are released.
    if (event.code == "ArrowRight" || event.code == "ArrowLeft") {
        event.preventDefault();
        if (orbiting) {
            controls.autoRotate = false;
        }
    }
});

// Add canvas to page.
document.body.appendChild(renderer.domElement);

document.getElementById("contact-link").addEventListener("click", () => {
    let panel = document.getElementById("contact");
    panel.classList.add("panel-move");
    panel.focus();
    document.getElementById("main-title").classList.remove("main-title-move");
});