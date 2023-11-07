function creatureEat(creature) {
  if (worldMap[creature.y * simulationWidth + creature.x] == 1) {
    creature.energy += getRandomNumberBetween(2,4); //50/creature.moveSpeed;
    removePlant(creature.x, creature.y); // Creatures only eat the pixel directly beneath their mouths
  } else if (worldMap[creature.y * simulationWidth + creature.x] == 3) {
    creature.energy += getRandomNumberBetween(2,4); //50/creature.moveSpeed;
    removeCarcass(creature.x, creature.y); 
  }
  /*if (creature.y > 0 && worldMap[creature.y - 1 * canvas.width + creature.x] == 1) {
    creature.energy += getRandomNumberBetween(6,12);
    removePlant(creature.x, creature.y - 1);
  } 
  if (creature.y > 0 && worldMap[creature.y - 1 * canvas.width + creature.x + 1] == 1) {
    creature.energy += getRandomNumberBetween(6,12);
    removePlant(creature.x, creature.y);
  }
  if (worldMap[creature.y * canvas.width + creature.x + 1] == 1) {
    creature.energy += getRandomNumberBetween(6,12);
    removePlant(creature.x + 1, creature.y);
  }*/
}

// Moves creatures, and give them an energy penalty.
function moveCreatures(creature) {
        if (creature.moves == true) {
          speed = creature.moveSpeed;
          timeToMove = speed/100;
          creature.moveInterval += timeToMove;
          if (creature.moveInterval >= 1) { 
            accelerateCreature(creature);
            randomStraight(creature);
            creature.moveInterval = creature.moveInterval - 1;
            creature.energy -= creature.moveSpeed/200; //0.1;
          }
        }
}
  
  // The Random Charge
  function randomStraight(creature) {
    if (creature.dir == 0) {
      creature.y +=1; // N
  } else if (creature.dir == 1) {
    creature.y +=1; // NE
    creature.x +=1;
  } else if (creature.dir == 2) {
      creature.x +=1; // E
  } else if (creature.dir == 3) {
      creature.y -=1; // SE
      creature.x +=1;
  } else if (creature.dir == 4) {
      creature.y -=1; // S
  } else if (creature.dir == 5) {
      creature.x -=1; // SW
      creature.y -=1;
  } else if (creature.dir == 6) {
      creature.x -=1; // W
  } else if (creature.dir == 7) {
      creature.y +=1; // NW
      creature.x -=1;
  }
}