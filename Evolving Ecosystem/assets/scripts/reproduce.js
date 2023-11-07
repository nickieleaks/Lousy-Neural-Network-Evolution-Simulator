// Reproduces creatures that exceed an energy threshold (needs fixing, optimisation, and improving for readability) ! Very crude !
function reproduceCreatures(creature) {
  //newCreatures = [];
    //if (creature.moves == true) {
    if (creature.energy >= creature.energyToReproduce) {
      // There is a 1 in 10 chance of reproducing
      //let chance = getRandomNumberBetween(1, 100);
        /*if (chance <= creature.reproductionChance) {*/
          let id = window.creatureCount + 1;
          let genome = makeRandomGenome(); // To Modify
          let generation = creature.generation + 1;
          let x = creature.x;
          let y = creature.y;
          // The reproduced creature will end up in a different area from its parent
          let r = getRandomNumberBetween(1,8);
        if (r == 1) {
            y +=1;
        } else if (r == 2) {
            x -=1;
        } else if (r == 3) {
            x +=1;
        } else if (r == 4) {
            x-=1;
        } else if (r == 5) {
            y -=1;
            x +=1;
        } else if (r == 6) {
            y -=1;
            x -=1;
        } else if (r == 7) {
            y +=1;
            x +=1;
        } else if (r == 8) {
            y +=2;
            x -=2;
        }
          // Assign a random starting direction
          let dir = getRandomNumberBetween(1,8)-1;
          // Inherit genes
          let reproductionChance = creature.reproductionChance;
          let directionGenes = creature.directionGenes;
          let directionalChangeChance = creature.directionalChangeChance;
          let carnivorous = creature.carnivorous;
          let colourA = creature.colourA;
          let colourB = creature.colourB;
          let colourC = creature.colourC;
          let colourD = creature.colourD;
          let mutability = creature.mutability;
          let moveSpeed = 10;//creature.moveSpeed;
          let moveMethod = creature.moveMethod;
          let moveInterval = 0;
          let maxLifespan = creature.maxLifespan;
          let maxSpeed = creature.maxSpeed;
          //let metabolismLife = creature.metabolismLife;
          //let currentMetabolism = 0;
          let energyToReproduce = creature.energyToReproduce;
          let brain = _.cloneDeep(creature.brain, true);
          let mutations = creature.mutations;
          // Handles mutations
          let randomMutationChance = getRandomNumberBetween(1, 12); // last value was 25 but mutations seemed too rare
          if (randomMutationChance === 1) {
            let mutation = getRandomNumberBetween(0, 2);
            if (mutation == 0) {
              brain = brain.mutate(brainMutate());
            } else if (mutation == 1) {
              speedMod = getRandomNumberBetween(0, Math.round(maxSpeed/2));
              let chance = getRandomNumberBetween(0,1);
              if (chance == 0) {
                speedMod = -speedMod
              }
              maxSpeed = maxSpeed + speedMod;
              if (maxSpeed < 1) {
                maxSpeed = 1;
              }
              if (maxSpeed > 100) {
                maxSpeed = 100;
              }
            } else if (mutation == 2) {
              lifeMod = getRandomNumberBetween(0, Math.round(maxLifespan/2));
              let chance = getRandomNumberBetween(0,1);
              if (chance == 0) {
                lifeMod = -lifeMod
              }
              maxLifespan = maxLifespan + lifeMod;
              if (maxLifespan < 1) {
                maxLifespan = 1;
              }
            }
            mutations = creature.mutations + 1;
            // Changes colour if there is a mutation
            let colourMutation = getRandomNumberBetween(1, 4);
            if (colourMutation == 1) {
              colourA = getRandomColour();
            } else if (colourMutation == 2) {
              colourB = getRandomColour();
            } else if (colourMutation == 3) {
              colourC = getRandomColour();
            } else if (colourMutation == 4) {
              colourD = getRandomColour();
            }
        } 
        let energy = creature.energy/2;
          newCreatures.push(new Creature(id, genome, x, y, energy, 0, colourA, 
          colourB, colourC, colourD, dir, false, moveMethod, 
          moveSpeed, moveInterval, generation, carnivorous, mutability, energyToReproduce, reproductionChance, 
          directionalChangeChance, directionGenes, maxLifespan, brain, mutations, maxSpeed));
          
          creature.children +=1;
          creature.energy = energy;/* -= creature.energyToReproduce*/
          //
          window.creatureCount += 1;
        } else {
          //creature.energy = creature.energy-1;
    }
}

// deepClone function for brain

function deepClone(obj, hash = new WeakMap()) {
  // Primitives and functions are immutable, so they can be returned directly
  if (Object(obj) !== obj || obj instanceof Function) return obj;

  // Handle Date
  if (obj instanceof Date) return new Date(obj);

  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  // Handle Array and Object
  let result = obj instanceof Array ? [] : obj.constructor ? new obj.constructor() : Object.create(null);

  // Store the cloned object in our hash map
  hash.set(obj, result);

  // Recursively copy the object's properties
  if (obj instanceof Map)
    Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
  else if (obj instanceof Set)
    Array.from(obj, (key) => result.add(deepClone(key, hash)));
  else
    Object.assign(result, ...Object.keys(obj).map(
      key => ({ [key]: deepClone(obj[key], hash) })));

  return result;
}

