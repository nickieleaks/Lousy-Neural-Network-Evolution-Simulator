// imgWorld uses r,g,b
function spawnPlant(x, y) {
    if (worldMap[y * simulationWidth + x] == 0 /*|| worldMap[y * simulationWidth + x] == 2*/) {
    numberOfPlants++;
    worldMap[y * simulationWidth + x] = 1;
    // rgb
    let zoom = 2;
    let newWidth = simulationWidth*zoom;
    let newHeight = y*zoom;
    let newX = x*zoom;
    for (l = 0; l < zoom; l ++) {
    imgWorld.data[4 * (newHeight * newWidth + newX+l)] = 50;
    imgWorld.data[4 * (newHeight * newWidth + newX+l) + 1] = 205;
    imgWorld.data[4 * (newHeight * newWidth + newX+l) + 2] = 50;
    imgWorld.data[4 * (newHeight * newWidth + newX+l) + 3] = 255;
    // 
    imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l)] = 50;
    imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 1] = 205;
    imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 2] = 50;
    imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 3] = 255;
    //
    imgWorld.data[4 * ((newHeight + l) * newWidth + newX)] = 50;
    imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 1] = 205;
    imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 2] = 50;
    imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 3] = 255;
    }
    }
}

function spawnPlants(plants) {
    for (i = 0; i < plants; i++) {
        spawnPlant(getRandomNumberBetween(1, simulationWidth-1), getRandomNumberBetween(1, simulationHeight-1));
    }
}

function spawnForest(plants) {
    for (i = 0; i < plants; i++) {
        spawnPlant(getRandomNumberBetween(113,137), getRandomNumberBetween(113,137));
    }
}

function spawnLine(plants) {
    for (i = 0; i < plants; i++) {
        spawnPlant(getRandomNumberBetween(1,simulationWidth-1), 60);
        spawnPlant(getRandomNumberBetween(1,simulationWidth-1), 190);
        spawnPlant(60, getRandomNumberBetween(1,simulationHeight-1));
        spawnPlant(190, getRandomNumberBetween(1,simulationHeight-1));
    }
}

function removePlant(x, y) {
    window.deathsPlants++;
    numberOfPlants--;
    worldMap[y * simulationWidth + x] = 0;
    let zoom = 2;
    let newWidth = simulationWidth*zoom;
    let newHeight = y*zoom;
    let newX = x*zoom;
    imgWorld.data[4 * (newHeight * newWidth + newX)] = 0;
    imgWorld.data[4 * (newHeight * newWidth + newX) + 1] = 0;
    imgWorld.data[4 * (newHeight * newWidth + newX) + 2] = 0;
    imgWorld.data[4 * (newHeight * newWidth + newX) + 3] = 255;
    //
    imgWorld.data[4 * (newHeight * (newWidth) + newX+1)] = 0;
    imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 1] = 0;
    imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 2] = 0;
    imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 3] = 255;
    //
    imgWorld.data[4 * ((newHeight + 1) * newWidth + newX)] = 0;
    imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 1] = 0;
    imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 2] = 0;
    imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 3] = 255;
    //
    imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX+1)] = 0;
    imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 1] = 0;
    imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 2] = 0;
    imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 3] = 255;
}

function allBlack() {
    for (y = 0; y < 250; y++) {
      for (x = 0; x < 250; x++) {
      let zoom = 2;
      let newWidth = simulationWidth*zoom;
      let newHeight = y*zoom;
      let newX = x*zoom;
      imgWorld.data[4 * (newHeight * newWidth + newX)] = 0;
      imgWorld.data[4 * (newHeight * newWidth + newX) + 1] = 0;
      imgWorld.data[4 * (newHeight * newWidth + newX) + 2] = 0;
      imgWorld.data[4 * (newHeight * newWidth + newX) + 3] = 255;
      //
      imgWorld.data[4 * (newHeight * (newWidth) + newX+1)] = 0;
      imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 1] = 0;
      imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 2] = 0;
      imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 3] = 255;
      //
      imgWorld.data[4 * ((newHeight + 1) * newWidth + newX)] = 0;
      imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 1] = 0;
      imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 2] = 0;
      imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 3] = 255;
      //
      imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX+1)] = 0;
      imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 1] = 0;
      imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 2] = 0;
      imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 3] = 255;
  }
}
}

function spawnLava(x, y) {
  if (worldMap[y * simulationWidth + x] == 0) {
  worldMap[y * simulationWidth + x] = 2;
  // rgb
  let zoom = 2;
  let newWidth = simulationWidth*zoom;
  let newHeight = y*zoom;
  let newX = x*zoom;
  for (l = 0; l < zoom; l ++) {
  imgWorld.data[4 * (newHeight * newWidth + newX+l)] = 255;
  imgWorld.data[4 * (newHeight * newWidth + newX+l) + 1] = 0;
  imgWorld.data[4 * (newHeight * newWidth + newX+l) + 2] = 0;
  imgWorld.data[4 * (newHeight * newWidth + newX+l) + 3] = 255;
  // 
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l)] = 255;
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 1] = 0;
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 2] = 0;
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 3] = 255;
  //
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX)] = 255;
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 1] = 0;
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 2] = 0;
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 3] = 255;
  }
}
}

function spawnLavaEdge(lava) {
  for (i = 0; i < lava; i++) {
      spawnLava(250, i);
      spawnLava(i, 250);
      spawnLava(i, 0);
      spawnLava(0, i);
  }
}

// imgWorld uses r,g,b
function spawnCarcass(x, y) {
  if (worldMap[y * simulationWidth + x] == 0 || worldMap[y * simulationWidth + x] == 1) {
  //numberOfPlants++;
  worldMap[y * simulationWidth + x] = 3;
  // rgb
  let zoom = 2;
  let newWidth = simulationWidth*zoom;
  let newHeight = y*zoom;
  let newX = x*zoom;
  for (l = 0; l < zoom; l ++) {
  imgWorld.data[4 * (newHeight * newWidth + newX+l)] = 150;
  imgWorld.data[4 * (newHeight * newWidth + newX+l) + 1] = 75;
  imgWorld.data[4 * (newHeight * newWidth + newX+l) + 2] = 0;
  imgWorld.data[4 * (newHeight * newWidth + newX+l) + 3] = 255;
  // 
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l)] = 150;
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 1] = 75;
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 2] = 0;
  imgWorld.data[4 * ((newHeight+l) * (newWidth) + newX +l) + 3] = 255;
  //
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX)] = 150;
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 1] = 75;
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 2] = 0;
  imgWorld.data[4 * ((newHeight + l) * newWidth + newX) + 3] = 255;
  }
  }
}

function removeCarcass(x, y) {
  worldMap[y * simulationWidth + x] = 0;
  let zoom = 2;
  let newWidth = simulationWidth*zoom;
  let newHeight = y*zoom;
  let newX = x*zoom;
  imgWorld.data[4 * (newHeight * newWidth + newX)] = 0;
  imgWorld.data[4 * (newHeight * newWidth + newX) + 1] = 0;
  imgWorld.data[4 * (newHeight * newWidth + newX) + 2] = 0;
  imgWorld.data[4 * (newHeight * newWidth + newX) + 3] = 255;
  //
  imgWorld.data[4 * (newHeight * (newWidth) + newX+1)] = 0;
  imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 1] = 0;
  imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 2] = 0;
  imgWorld.data[4 * (newHeight * (newWidth) + newX+1) + 3] = 255;
  //
  imgWorld.data[4 * ((newHeight + 1) * newWidth + newX)] = 0;
  imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 1] = 0;
  imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 2] = 0;
  imgWorld.data[4 * ((newHeight + 1) * newWidth + newX) + 3] = 255;
  //
  imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX+1)] = 0;
  imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 1] = 0;
  imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 2] = 0;
  imgWorld.data[4 * ((newHeight+1) * (newWidth) + newX +1) + 3] = 255;
}

// OBSOLETE? !




// Plants constructor
function Plant(x, y, /*energy = 20*/) {
    this.moves = false;
    // Location
    this.x = x;
    this.y = y;
    // Necessary for collision checks
    this.width = 2;
    this.height = 2;
    this.check = false;
    //this.colourA = Colours.lime;
    //this.colourB = Colours.lime;
    //this.colourC = Colours.lime;
    //this.colourD = Colours.lime;
    //this.energy = energy;
}

// Generates Plants in random locations
function generatePlants(numberofPlants) {
    plantsToDepopulate = [];
    if (window.numberOfPlants < 100000) {
      for (var i = 0; i < numberofPlants; i++) {
      window.creatures.push(new Plant(getRandomNumberBetween(0,250), getRandomNumberBetween(0,250)));
      window.creatures.push(new Plant(getRandomNumberBetween(25,simulationWidth-2-25), getRandomNumberBetween(25,simulationHeight-2-25)));
      }
    }
  }
  
  function generateForest(numberofPlants) {
    if (window.forest == true) {
    //if (window.numberOfPlants < 3000) {
      for (var i = 0; i < numberofPlants; i++) {
        window.creatures.push(new Plant(getRandomNumberBetween(113,137), getRandomNumberBetween(113,137)));
      }
    }
    //}
  //return plants;
  }
  
  function generateDenseForest(numberofPlants) {
    if (window.forest == true) {
    //if (window.numberOfPlants < 3000) {
      for (var i = 0; i < numberofPlants; i++) {
        window.creatures.push(new Plant(getRandomNumberBetween(124,126), getRandomNumberBetween(124,126)));
      }
    }
    //}
  //return plants;
  }
  
  function generatePlantsEverywhere(numberofPlants) {
    //if (window.numberOfPlants < 3000) {
      for (var i = 0; i < numberofPlants; i++) {
        window.creatures.push(new Plant(getRandomNumberBetween(1,simulationWidth-2), getRandomNumberBetween(1,simulationHeight-2)));
    }
    //}
  //return plants;
  }
  
  function generateDesert(numberofPlants) {
    if (window.numberOfPlants < 3000) {
      for (var i = 0; i < numberofPlants; i++) {
        let chance = getRandomNumberBetween(1, 4);
        if (chance == 1) {
          window.creatures.push(new Plant(getRandomNumberBetween(1,25), getRandomNumberBetween(1,225)));
        } else if (chance == 2) {
          window.creatures.push(new Plant(getRandomNumberBetween(1,225), getRandomNumberBetween(1,25)));
        } else if (chance == 3) {
          window.creatures.push(new Plant(getRandomNumberBetween(225,250), getRandomNumberBetween(1,225)));
        } else if (chance == 4) {
          window.creatures.push(new Plant(getRandomNumberBetween(1,225), getRandomNumberBetween(225,250)));
        }
      }
    }
  //return plants;
  }