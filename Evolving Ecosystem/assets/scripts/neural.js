// Neatapic variables (testing)
var neat    = neataptic.Neat;
var methods = neataptic.methods;
var config  = neataptic.config;
var architect = neataptic.architect;
// Initialise random creature brain
//var firstBrain = new architect.Random(input_size = 2, hidden_size = 2, output_size = 2);
function firstBrain() {
  return new architect.Random(input_size = 6, hidden_size = 9, output_size = 6);
}
// Array of possible brain mutations
var brainMutationsArray = [
    methods.mutation.ADD_NODE,
    methods.mutation.SUB_NODE,
    methods.mutation.ADD_CONN,
    methods.mutation.SUB_CONN,
    methods.mutation.MOD_WEIGHT,
    methods.mutation.MOD_BIAS,
    methods.mutation.MOD_ACTIVATION,
    methods.mutation.ADD_GATE,
    methods.mutation.SUB_GATE,
    methods.mutation.ADD_SELF_CONN,
    methods.mutation.SUB_SELF_CONN,
    methods.mutation.ADD_BACK_CONN,
    methods.mutation.SUB_BACK_CONN,
    methods.mutation.SWAP_NODES
];  
function brainMutate() {
        var rand = brainMutationsArray[~~(Math.random() * brainMutationsArray.length)];
        return rand;
}

function creatureAct(creature) {
        if (creature.moveInterval >= 1) {
        input = [1]; // Constant input
        } else if (creature.moveInterval < 1) {
        input = [0];
        }
        //input.push(creature.moveSpeed/100);
        // 1 if current tile is food
        if (worldMap[creature.y * simulationWidth + creature.x] == 0) {
            input.push(0);
        } else if (worldMap[creature.y * simulationWidth + creature.x] == 1) {
            input.push(0.5);
        } else if (worldMap[creature.y * simulationWidth + creature.x] == 2) {
          input.push(-1);
        } else if (worldMap[creature.y * simulationWidth + creature.x] == 3) {
          input.push(1);
        }
        // Randomizer input
        //input.push(Math.random());
        // Energy level input
        input.push(creature.energy/creature.energyToReproduce);
        // Sees 4 tiles in front 
        input.push(eyeSight(creature));
        // Antenna on the right
        input.push(antennaFeel(creature));
        //input.push(antennaFeel(creature));
        // Activate all inputs
    creature.brain.noTraceActivate(input);
    // Output actions
    reproduceCreatures(creature);
    //accelerateCreature(creature);
    if (creature.moveInterval < 1) {
      creature.energy -= 0.02; 
    }
    brakeCreature(creature);
    /*if (creature.brain.nodes[creature.brain.nodes.length - 1].activation > 0.5) {
      reproduceCreatures(creature);
    }*/
    if (creature.brain.nodes[creature.brain.nodes.length - 2].activation > 0.5) {
      moveCreatures(creature);
    }
      rotateDirection(creature);
    if (creature.brain.nodes[creature.brain.nodes.length - 4].activation > 0.5) {
      creatureEat(creature);
    } 
}

function rotateDirection(creature) {
  let threshold = creature.brain.nodes[creature.brain.nodes.length - 3].activation;
  if (threshold > 0.2) {
    if (threshold > 0.2 && threshold <= 0.3) {
      rotation = 6; //N
    } else if (threshold > 0.3 && threshold < 0.4) {
      rotation = 7; // S
    } else if (threshold >= 0.4 && threshold < 0.5) {
      rotation = 9; // E
    } else if (threshold >= 0.5 && threshold < 0.6) {
      rotation = 0; // W
    } else if (threshold >= 0.6 && threshold < 0.7) {
      rotation = 1; //NE
    } else if (threshold >= 0.7 && threshold < 0.8) {
      rotation = 2; //SW
    } else if (threshold >= 0.8 && threshold < 0.9) {
      rotation = 3; // NW
    } else if (threshold >= 0.9 && threshold <= 1) {
      rotation = 4; // SE
    }
    newDir = (creature.dir + rotation) % 8;
    creature.dir = newDir;
  }
}

function eyeSight(creature) {
  let viewX = 0;
  let viewY = 0;
  let result = 0;
  if (creature.dir == 0) {
    viewY +=4; // N
} else if (creature.dir == 1) {
  viewY +=4; // NE
  viewX +=4;
} else if (creature.dir == 2) {
  viewX +=4; // E
} else if (creature.dir == 3) {
  viewY -=4; // SW
  viewX -=4;
} else if (creature.dir == 4) {
  viewY -=4; // S
} else if (creature.dir == 5) {
  viewY -=4; // SE
  viewX +=4;
} else if (creature.dir == 6) {
  viewX -=4; // W
} else if (creature.dir == 7) {
  viewX +=4; // SW
  viewY -=4;
}
  // Get target cell info
  if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 0) {
    result = 0;
    // Empty
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 1) {
    result = 0.5;
    // Food
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 2) {
    result = -1;
    // Lava
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 3) {
    result = 1;
    // Carcass
  } 
  return result;
}

function antennaFeel(creature) {
  let viewX = 0;
  let viewY = 0;
  let result = 0;
  // For now, antenna is always on the right of the creature
  if (creature.dir == 0 /* N*/) {
    viewX +=1; // E
} else if (creature.dir == 1 /*NE*/) {
  viewY -=1; // SE
  viewX +=1;
} else if (creature.dir == 2) {
  viewY -=1; // S
} else if (creature.dir == 3) {
  viewX -=1; // NE
  viewY -=1;
} else if (creature.dir == 4) {
  viewX -=1; // W
} else if (creature.dir == 5) {
  viewY +=1; // SW
  viewX -=1;
} else if (creature.dir == 6) {
  viewY +=1; // N
} else if (creature.dir == 7) {
  viewY +=1; // NW
  viewX -=1;
}
  // Get target cell info
  if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 0) {
    result = 0;
    // Empty
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 1) {
    result = 0.5;
    // Food
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 2) {
    result = -1;
    // Lava
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 3) {
    result = 1;
    // Carcass
  } 
  return result;
}

function rightFeel(creature) {
  let viewX = 0;
  let viewY = 0;
  let result = 0;
    viewX +=1; 
  // Get target cell info
  if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 0) {
    result = 0;
    // Empty
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 1) {
    result = 0.5;
    // Food
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 2) {
    result = -1;
    // Lava
  } else if (worldMap[creature.y + viewY * simulationWidth + creature.x + viewX] == 3) {
    result = 1;
    // Carcass
  }
  return result;
}


function accelerateCreature(creature) {
if (creature.moveInterval >= 1) {
  let threshold = creature.brain.nodes[creature.brain.nodes.length - 5].activation;
  if (threshold > 0.5) {
    if (creature.moveSpeed < creature.maxSpeed) {
    creature.moveSpeed += threshold*2;
    }
  } else if (threshold < 0.5) {
    if (creature.moveSpeed > 10) {
    creature.moveSpeed = 10;//-= threshold*20;
    }
  } else if (threshold <=0) {
    creature.moveSpeed = creature.moveSpeed;
  }

  if (creature.moveSpeed < 1) {
    creature.moveSpeed = 1;
  }
  if (creature.moveSpeed > creature.maxSpeed) {
    creature.moveSpeed = creature.maxSpeed;
  }
}
}

function brakeCreature(creature) {
    let threshold = creature.brain.nodes[creature.brain.nodes.length - 6].activation;
    if (threshold < 0.05) {
    creature.moveInterval = 0;
    }
  }
























// NN THIS class WILL PROBABLY NOT WORK, have to study and code own interpretation. 
function initNeat(){
  neat = new neat(
    //1 + PLAYER_DETECTION * 3 + FOOD_DETECTION * 2,
    2,
    2,
    null,
    {
      mutation: [
        methods.mutation.ADD_NODE,
        methods.mutation.SUB_NODE,
        methods.mutation.ADD_CONN,
        methods.mutation.SUB_CONN,
        methods.mutation.MOD_WEIGHT,
        methods.mutation.MOD_BIAS,
        methods.mutation.MOD_ACTIVATION,
        methods.mutation.ADD_GATE,
        methods.mutation.SUB_GATE,
        methods.mutation.ADD_SELF_CONN,
        methods.mutation.SUB_SELF_CONN,
        methods.mutation.ADD_BACK_CONN,
        methods.mutation.SUB_BACK_CONN
      ],
      popsize: 100, //PLAYER_AMOUNT,
      mutationRate: 0.05, //MUTATION_RATE,
      //elitism: Math.round(ELITISM_PERCENT * PLAYER_AMOUNT),
      network: new architect.Random(
        //1 + PLAYER_DETECTION * 3 + FOOD_DETECTION * 2,
        //START_HIDDEN_SIZE,
        2,
        2,
        2
      )
    }
  );

  /*if(USE_TRAINED_POP){
    neat.population = population;
  }*/
}