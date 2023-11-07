// Creature constructor, requires genome
function Creature(id = window.creatureCount + 1, genome = makeRandomGenome(), 
x = getRandomNumberBetween(1, simulationWidth - 2), y = getRandomNumberBetween(1, simulationHeight - 2), 
energy = 10, age = 0, 
colourA = getRandomColour(), colourB = getRandomColour(), colourC = getRandomColour(), colourD = getRandomColour(), 
dir = getRandomNumberBetween(1,8)-1, check = false, moveMethod = 2, moveSpeed = 10/*getRandomNumberBetween(1,100)*/, 
moveInterval = 0, generation = 1, carnivorous = false, mutability = getRandomNumberBetween(1,100), 
energyToReproduce = 20, reproductionChance = getRandomNumberBetween(1,100), 
directionalChangeChance = getRandomNumberBetween(1,100), directionGenes = getRandomDirectionGenes(), 
maxLifespan = getRandomNumberBetween(300,500), brain = firstBrain(), mutations = 0, maxSpeed = 10) {
this.id = id;
this.moves = true;
this.generation = generation;
this.children = 0;
this.genome = genome;
this.x = x;
this.y = y;
this.dir = dir;
this.directionGenes = directionGenes;
this.directionalChangeChance = directionalChangeChance;
//this.vx = getRandomNumberBetween(-0.5,0.5);
//this.vy = getRandomNumberBetween(-0.5,0.5);
this.moveMethod = moveMethod;
this.moveSpeed = moveSpeed;
this.moveInterval = moveInterval;
//this.metabolismLife = metabolismLife;
//this.currentMetabolism = currentMetabolism;
this.maxLifespan = maxLifespan;
this.carnivorous = carnivorous;
this.mutability = mutability;
this.energy = energy;
this.energyToReproduce = energyToReproduce;
this.reproductionChance = reproductionChance;
this.age = age;
this.width = 1;
this.height = 1;
this.colourA = colourA;
this.colourB = colourB;
this.colourC = colourC;
this.colourD = colourD;
this.brain = brain;
this.mutations = mutations;
this.maxSpeed = maxSpeed;
// Initialise this creature's brain
/* this.brain = new NeuralNetwork(2, 2, 2, 2);
var weights = this.brain.getWeights();
var newWeights = [];
for (var i=0; i < weights.length; i++) {
    newWeights.push(weights[i] * 0.5); 
}
this.brain.setWeights(newWeights);*/
// For collision checking
this.check = check;
}

// Random Genome constructor, default length 5
function makeRandomGenome(length = 5) {
var genome = "";
var genes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz1234567890";
  for (var i = 0; i < length; i++) {
  genome += genes.charAt(Math.floor(Math.random() * genes.length));
  }
return genome;
}

// World constructor (x, y)
function World(width, height) {
this.x = width;
this.y = height;
}

// Generates random Creatures with random Genomes, defaults to 10. Returns Creatures array. !! Warning BUGGY (improper array handling)
function generateCreatures(numberofCreatures = 1) {
  for (var i = 0; i < numberofCreatures; i++) {
  window.creatures.push(new Creature());
  window.creatureCount += 1;
  }
return creatures;
}

// !! Kills Creatures
function creatureKiller(creature) {
    if (creature.moves == true) {
      if (creature.energy <= 0) {
      spawnCarcass(creature.x, creature.y);
      creaturesToKill.push(index);
      window.deathsCreatures++;
      } else if (creature.x >= simulationWidth) {
      spawnCarcass(creature.x, creature.y);
      creaturesToKill.push(index);
      window.deathsCreatures++;
      } else if (creature.y >= simulationHeight) {
      spawnCarcass(creature.x, creature.y);
      creaturesToKill.push(index);
      window.deathsCreatures++;
      } else if (creature.x <= 0) {
      spawnCarcass(creature.x, creature.y);
      creaturesToKill.push(index);
      window.deathsCreatures++;
      } else if (creature.y <= 0) {
      spawnCarcass(creature.x, creature.y);
      creaturesToKill.push(index);
      window.deathsCreatures++;
      } else if (creature.age >= creature.maxLifespan) {
        spawnCarcass(creature.x, creature.y);
        creaturesToKill.push(index);
        window.deathsCreatures++;
      }
    }
}

// Generate 1 new creature
function genesisCreature() {
starterDirectionGenes = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
genesisCreatures = [];
// Real Genesis Creature
genesisCreatures.push(new Creature(window.creatureCount + 1, makeRandomGenome(), 
getRandomNumberBetween(113,137), getRandomNumberBetween(113,137), 10, 0, 
Colours.cyan, Colours.cyan, 
Colours.cyan, Colours.cyan, getRandomNumberBetween(1,8)-1, false, 
2, 10, 0, 1, false, 25, 20, 5, 1, starterDirectionGenes, 100, 
brain = firstBrain()));
window.creatures = window.creatures.concat(genesisCreatures);
window.creatureCount += 1;
}


// Depletes all Creature energy by 1: NOT IN USE
function depleteCreaturesEnergy() {
  for (var i = 0; i < window.creatures.length; i++) {
    if (window.creatures[i].moves == true) {
      window.creatures[i].energy -= getRandomNumberBetween(0,2);
    }
  }
return creatures;
}