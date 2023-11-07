// Initialise graphical canvas where creatures are displayed (rendered in front of secondary canvas)
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
const camera = new Camera(ctx);
var microscope = false;

// Initialise a secondary hidden canvas where plants will be rendered, before the image is saved and zoomed for main canvas
var plantsCanvas = document.getElementById('plantsCanvas');
var plantsCtx = plantsCanvas.getContext('2d', { willReadFrequently: true });
//document.getElementById("plantsCanvas").style.visibility = "hidden";

// The inspector // Default to a hidden creature inspector
var inspector = true;
var inspectorParameter = "nil";
var observationIndex = "best";
document.getElementById("inspector").style.visibility = "hidden";
document.getElementById("creature_estimator").style.visibility = "hidden";

// Optimise Food! (Array for storing food and substance data)
var simulationHeight = 251;
var simulationWidth = 251;
var worldMap = new Uint8Array(simulationWidth * simulationHeight);
var imgWorld = plantsCtx.createImageData(simulationWidth*2, simulationHeight*2);

var creature_total = document.querySelector('#creature_total');
var plant_total = document.querySelector('#plant_total');
var time_total = document.querySelector('#time_total');
var deaths_total = document.querySelector('#deaths_total');
var pause = false;
var viewPaths = false;
var render = true;
var updateTimeout = 100;

var creatures = []; // Initialise Creatures array
var numberOfPlants = 0;
var numberOfCreatures = 0;
// Empty array that will be used to delete entities? (Testing) currently not in use
var creaturesThatCollide = [];
//var plants = []; // Initialise Plants array. Should be combined together with creatures array for simpler collision checks

// Initialise Time
var time = 0;
var deathsCreatures = 0;
var deathsPlants = 0;
var creatureCount = 0;

var forest = true;
var foodlines = false;
var ambientFood = true;

var selectedCreature = null;

allBlack();
spawnLavaEdge(simulationWidth);
//spawnPlants(5000);

// WARNING DO NOT USE 
function customSetInterval(x) {
  setInterval(update, x); 
}

// Used for non-rendered simulation (time skip)
function customUpdate(x) {
  window.pause = false;
  for (i = 0; i < x; i++) {
    update();
  }
}

// Update rate in milliseconds
// Update
update();