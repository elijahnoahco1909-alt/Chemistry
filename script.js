import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// [symbol, name, atomicNumber, col, row, category]
const ELEMENTS = [
  ["H", "Hydrogen", 1, 1, 1, "nonmetal"],
  ["He", "Helium", 2, 18, 1, "noble"],
  ["Li", "Lithium", 3, 1, 2, "alkali"],
  ["Be", "Beryllium", 4, 2, 2, "alkaline"],
  ["B", "Boron", 5, 13, 2, "metalloid"],
  ["C", "Carbon", 6, 14, 2, "nonmetal"],
  ["N", "Nitrogen", 7, 15, 2, "nonmetal"],
  ["O", "Oxygen", 8, 16, 2, "nonmetal"],
  ["F", "Fluorine", 9, 17, 2, "nonmetal"],
  ["Ne", "Neon", 10, 18, 2, "noble"],
  ["Na", "Sodium", 11, 1, 3, "alkali"],
  ["Mg", "Magnesium", 12, 2, 3, "alkaline"],
  ["Al", "Aluminium", 13, 13, 3, "metal"],
  ["Si", "Silicon", 14, 14, 3, "metalloid"],
  ["P", "Phosphorus", 15, 15, 3, "nonmetal"],
  ["S", "Sulfur", 16, 16, 3, "nonmetal"],
  ["Cl", "Chlorine", 17, 17, 3, "nonmetal"],
  ["Ar", "Argon", 18, 18, 3, "noble"],
  ["K", "Potassium", 19, 1, 4, "alkali"],
  ["Ca", "Calcium", 20, 2, 4, "alkaline"],
  ["Sc", "Scandium", 21, 3, 4, "metal"],
  ["Ti", "Titanium", 22, 4, 4, "metal"],
  ["V", "Vanadium", 23, 5, 4, "metal"],
  ["Cr", "Chromium", 24, 6, 4, "metal"],
  ["Mn", "Manganese", 25, 7, 4, "metal"],
  ["Fe", "Iron", 26, 8, 4, "metal"],
  ["Co", "Cobalt", 27, 9, 4, "metal"],
  ["Ni", "Nickel", 28, 10, 4, "metal"],
  ["Cu", "Copper", 29, 11, 4, "metal"],
  ["Zn", "Zinc", 30, 12, 4, "metal"],
  ["Ga", "Gallium", 31, 13, 4, "metal"],
  ["Ge", "Germanium", 32, 14, 4, "metalloid"],
  ["As", "Arsenic", 33, 15, 4, "metalloid"],
  ["Se", "Selenium", 34, 16, 4, "nonmetal"],
  ["Br", "Bromine", 35, 17, 4, "nonmetal"],
  ["Kr", "Krypton", 36, 18, 4, "noble"],
  ["Rb", "Rubidium", 37, 1, 5, "alkali"],
  ["Sr", "Strontium", 38, 2, 5, "alkaline"],
  ["Y", "Yttrium", 39, 3, 5, "metal"],
  ["Zr", "Zirconium", 40, 4, 5, "metal"],
  ["Nb", "Niobium", 41, 5, 5, "metal"],
  ["Mo", "Molybdenum", 42, 6, 5, "metal"],
  ["Tc", "Technetium", 43, 7, 5, "metal"],
  ["Ru", "Ruthenium", 44, 8, 5, "metal"],
  ["Rh", "Rhodium", 45, 9, 5, "metal"],
  ["Pd", "Palladium", 46, 10, 5, "metal"],
  ["Ag", "Silver", 47, 11, 5, "metal"],
  ["Cd", "Cadmium", 48, 12, 5, "metal"],
  ["In", "Indium", 49, 13, 5, "metal"],
  ["Sn", "Tin", 50, 14, 5, "metal"],
  ["Sb", "Antimony", 51, 15, 5, "metalloid"],
  ["Te", "Tellurium", 52, 16, 5, "metalloid"],
  ["I", "Iodine", 53, 17, 5, "nonmetal"],
  ["Xe", "Xenon", 54, 18, 5, "noble"],
  ["Cs", "Cesium", 55, 1, 6, "alkali"],
  ["Ba", "Barium", 56, 2, 6, "alkaline"],
  ["La", "Lanthanum", 57, 4, 9, "lanthanide"],
  ["Ce", "Cerium", 58, 5, 9, "lanthanide"],
  ["Pr", "Praseodymium", 59, 6, 9, "lanthanide"],
  ["Nd", "Neodymium", 60, 7, 9, "lanthanide"],
  ["Pm", "Promethium", 61, 8, 9, "lanthanide"],
  ["Sm", "Samarium", 62, 9, 9, "lanthanide"],
  ["Eu", "Europium", 63, 10, 9, "lanthanide"],
  ["Gd", "Gadolinium", 64, 11, 9, "lanthanide"],
  ["Tb", "Terbium", 65, 12, 9, "lanthanide"],
  ["Dy", "Dysprosium", 66, 13, 9, "lanthanide"],
  ["Ho", "Holmium", 67, 14, 9, "lanthanide"],
  ["Er", "Erbium", 68, 15, 9, "lanthanide"],
  ["Tm", "Thulium", 69, 16, 9, "lanthanide"],
  ["Yb", "Ytterbium", 70, 17, 9, "lanthanide"],
  ["Lu", "Lutetium", 71, 18, 9, "lanthanide"],
  ["Hf", "Hafnium", 72, 4, 6, "metal"],
  ["Ta", "Tantalum", 73, 5, 6, "metal"],
  ["W", "Tungsten", 74, 6, 6, "metal"],
  ["Re", "Rhenium", 75, 7, 6, "metal"],
  ["Os", "Osmium", 76, 8, 6, "metal"],
  ["Ir", "Iridium", 77, 9, 6, "metal"],
  ["Pt", "Platinum", 78, 10, 6, "metal"],
  ["Au", "Gold", 79, 11, 6, "metal"],
  ["Hg", "Mercury", 80, 12, 6, "metal"],
  ["Tl", "Thallium", 81, 13, 6, "metal"],
  ["Pb", "Lead", 82, 14, 6, "metal"],
  ["Bi", "Bismuth", 83, 15, 6, "metal"],
  ["Po", "Polonium", 84, 16, 6, "metalloid"],
  ["At", "Astatine", 85, 17, 6, "metalloid"],
  ["Rn", "Radon", 86, 18, 6, "noble"],
  ["Fr", "Francium", 87, 1, 7, "alkali"],
  ["Ra", "Radium", 88, 2, 7, "alkaline"],
  ["Ac", "Actinium", 89, 4, 10, "actinide"],
  ["Th", "Thorium", 90, 5, 10, "actinide"],
  ["Pa", "Protactinium", 91, 6, 10, "actinide"],
  ["U", "Uranium", 92, 7, 10, "actinide"],
  ["Np", "Neptunium", 93, 8, 10, "actinide"],
  ["Pu", "Plutonium", 94, 9, 10, "actinide"],
  ["Am", "Americium", 95, 10, 10, "actinide"],
  ["Cm", "Curium", 96, 11, 10, "actinide"],
  ["Bk", "Berkelium", 97, 12, 10, "actinide"],
  ["Cf", "Californium", 98, 13, 10, "actinide"],
  ["Es", "Einsteinium", 99, 14, 10, "actinide"],
  ["Fm", "Fermium", 100, 15, 10, "actinide"],
  ["Md", "Mendelevium", 101, 16, 10, "actinide"],
  ["No", "Nobelium", 102, 17, 10, "actinide"],
  ["Lr", "Lawrencium", 103, 18, 10, "actinide"],
  ["Rf", "Rutherfordium", 104, 4, 7, "metal"],
  ["Db", "Dubnium", 105, 5, 7, "metal"],
  ["Sg", "Seaborgium", 106, 6, 7, "metal"],
  ["Bh", "Bohrium", 107, 7, 7, "metal"],
  ["Hs", "Hassium", 108, 8, 7, "metal"],
  ["Mt", "Meitnerium", 109, 9, 7, "metal"],
  ["Ds", "Darmstadtium", 110, 10, 7, "metal"],
  ["Rg", "Roentgenium", 111, 11, 7, "metal"],
  ["Cn", "Copernicium", 112, 12, 7, "metal"],
  ["Nh", "Nihonium", 113, 13, 7, "metal"],
  ["Fl", "Flerovium", 114, 14, 7, "metal"],
  ["Mc", "Moscovium", 115, 15, 7, "metal"],
  ["Lv", "Livermorium", 116, 16, 7, "metal"],
  ["Ts", "Tennessine", 117, 17, 7, "nonmetal"],
  ["Og", "Oganesson", 118, 18, 7, "noble"]
];

const container = document.getElementById("scene-container");

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 2100;

const scene = new THREE.Scene();

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 500;
controls.maxDistance = 4200;

const objects = [];
const targets = {
  table: [],
  sphere: [],
  helix: [],
  grid: []
};

// Create DOM tiles & CSS3DObjects
ELEMENTS.forEach(([symbol, name, number, col, row, category], index) => {
  const tile = document.createElement("div");
  tile.className = `element-tile ${category}`;

  const numEl = document.createElement("div");
  numEl.className = "element-number";
  numEl.textContent = number;

  const symEl = document.createElement("div");
  symEl.className = "element-symbol";
  symEl.textContent = symbol;

  const nameEl = document.createElement("div");
  nameEl.className = "element-name";
  nameEl.textContent = name;

  tile.append(numEl, symEl, nameEl);

  const objectCSS = new CSS3DObject(tile);
  objectCSS.position.x = (Math.random() - 0.5) * 3200;
  objectCSS.position.y = (Math.random() - 0.5) * 3200;
  objectCSS.position.z = (Math.random() - 0.5) * 3200;
  scene.add(objectCSS);
  objects.push(objectCSS);

  // 1. Table target
  const tableObj = new THREE.Object3D();
  tableObj.position.x = col * 145 - 1377.5;
  tableObj.position.y = -(row * 175) + 920;
  tableObj.position.z = 0;
  targets.table.push(tableObj);
});

const total = objects.length;
const vector = new THREE.Vector3();

// 2. Sphere target
for (let i = 0; i < total; i++) {
  const phi = Math.acos(-1 + (2 * i) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 820;

  const obj = new THREE.Object3D();
  obj.position.setFromSphericalCoords(radius, phi, theta);

  vector.copy(obj.position).multiplyScalar(2);
  obj.lookAt(vector);
  targets.sphere.push(obj);
}

// 3. Helix target
for (let i = 0; i < total; i++) {
  const theta = i * 0.175 + Math.PI;
  const y = -(i * 9) + 520;
  const radius = 900;

  const obj = new THREE.Object3D();
  obj.position.set(
    radius * Math.sin(theta),
    y,
    radius * Math.cos(theta)
  );

  vector.x = obj.position.x * 2;
  vector.y = obj.position.y;
  vector.z = obj.position.z * 2;
  obj.lookAt(vector);
  targets.helix.push(obj);
}

// 4. Grid target (5 x 4 x ~6)
for (let i = 0; i < total; i++) {
  const cols = 5;
  const rows = 4;
  const x = i % cols;
  const y = Math.floor(i / cols) % rows;
  const z = Math.floor(i / (cols * rows));

  const obj = new THREE.Object3D();
  obj.position.x = x * 340 - 680;
  obj.position.y = -(y * 280) + 420;
  obj.position.z = z * 360 - 900;
  targets.grid.push(obj);
}

// Smooth transition animation
let activeTweens = [];

function transform(targetArray, duration = 1100) {
  activeTweens = [];

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const target = targetArray[i];

    const startPos = obj.position.clone();
    const startRot = new THREE.Quaternion().setFromEuler(obj.rotation);
    const endRot = new THREE.Quaternion().setFromEuler(target.rotation);

    activeTweens.push({
      obj,
      startPos,
      endPos: target.position.clone(),
      startRot,
      endRot,
      startTime: performance.now(),
      duration
    });
  }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Button controls
const buttons = document.querySelectorAll(".layout-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const layout = btn.dataset.layout;
    transform(targets[layout], 1100);
  });
});

// Start in 'table' layout
transform(targets.table, 1200);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate(now) {
  requestAnimationFrame(animate);

  if (activeTweens.length > 0) {
    const remaining = [];
    for (const tw of activeTweens) {
      const elapsed = now - tw.startTime;
      const rawT = Math.min(Math.max(elapsed / tw.duration, 0), 1);
      const t = easeInOutCubic(rawT);

      tw.obj.position.lerpVectors(tw.startPos, tw.endPos, t);

      const q = tw.startRot.clone().slerp(tw.endRot, t);
      tw.obj.rotation.setFromQuaternion(q);

      if (rawT < 1) {
        remaining.push(tw);
      }
    }
    activeTweens = remaining;
  }

  controls.update();
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
