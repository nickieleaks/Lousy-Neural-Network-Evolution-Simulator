function toggleInspector() {
    if (window.inspector == false) {
        window.inspector = true;
    } else if (window.inspector == true) {
        window.inspector = false;
        creature_inspector.innerHTML = "";
    }
}

// The Superlative Creature Inspector
function getOldestCreature(parameter = window.inspectorParameter/*, observationIndex = window.observationIndex*/) {
    if (parameter == "nil") {
    window.selectedCreature = null;
    creature_inspector.innerHTML = "";
    document.getElementById("creature_estimator").style.visibility = "hidden";
    document.getElementById("inspector").style.visibility = "hidden";
    document.getElementById("follow").style.visibility = "hidden";
    document.getElementById("followButton").style.visibility = "hidden";
    document.getElementById("cameraFollow").style.visibility = "hidden";
    } else if (parameter == "find") {
    document.getElementById("creature_estimator").style.visibility = "hidden";
    document.getElementById("follow").style.visibility = "visible";
    document.getElementById("followButton").style.visibility = "visible";
    document.getElementById("cameraFollow").style.visibility = "visible";
    idInspect();
    } else {
    document.getElementById("creature_estimator").style.visibility = "visible";
    document.getElementById("inspector").style.visibility = "visible";
    document.getElementById("follow").style.visibility = "hidden";
    document.getElementById("followButton").style.visibility = "hidden";
    document.getElementById("cameraFollow").style.visibility = "visible";
    if (window.numberOfCreatures >= 1) {
    creaturesAliveNow = window.creatures; //[];
    /*for (i = 0; i < window.creatures.length; i ++) {
        if (window.creatures[i].moves == true) {
            creaturesAliveNow.push(window.creatures[i]);
        }
    }*/
    creaturesAliveNow.sort(dynamicSort(parameter));
        if (observationIndex == "best") {
            index = creaturesAliveNow[creaturesAliveNow.length - 1];
        } else if (observationIndex == "worst") {
            index = creaturesAliveNow[0];     
        } else if (observationIndex == "median") {
            index = creaturesAliveNow[Math.round(creaturesAliveNow.length/2)];    
        } else if (observationIndex == "random") {
            index = creaturesAliveNow[getRandomNumberBetween(0, creaturesAliveNow.length - 1)];
        }
    presentStats(index);
    } else if (window.numberOfCreatures <= 1) {
    window.selectedCreature = null;
    creature_inspector.innerHTML = "No creatures currently exist.";
    //document.getElementById("inspector").style.visibility = "hidden";
    }
    }   
}

//visualBrain(creatures[0]);

/*function visualBrain(creature) {
        drawGraph(creature.brain.graph(500, 500), '.draw');
}*/

function changeInspectorParameter(newParameter = window.inspectorParameter) {
    if (window.pause == false) {
    window.inspectorParameter = newParameter;
    } else if (window.pause == true) {
    window.inspectorParameter = newParameter;
    getOldestCreature(window.inspectorParameter);
    }
}

// The Event Creator
function eventCreator(event) {
    document.getElementById("event_creator").selectedIndex = 0;  
    if (event == "nil") {
    } else if (event == "mass extinction") {
        massExtinction();
    } else if (event == "famine") {
        famine();
    } else if (event == "great bloom") {
        greatBloom();
    } else if (event == "reset") {
        if (confirm("Reset the simulation? This world will cease to exist.") == true) {
        resetSimulation();
        } else {
        }
        //confirmPopup("Reset the simulation? This world will cease to exist.", resetSimulation());
    } else if (event == "populate") {
        if (confirm("New creatures may outcompete existing ones, irrevocably destroying the local genepool and populations.") == true) {
        generateCreatures(50);
            } else {
            }
    } else if (event == "forest") {
        toggleForest();
    } else if (event == "foodlines") {
        togglePlantLines();
    } else if (event == "ambientfood") {
        toggleAmbientFood();
    } else if (event == "randomCreature") {
        generateCreatures(1);
    }
}

function bestWorst(attribute) {
    //document.getElementById("creature_estimator").selectedIndex = 0; 
    if (attribute == "best") {
        window.observationIndex = "best";
    } else if (attribute == "worst") {
        window.observationIndex = "worst";
    } else if (attribute  == "median") {
        window.observationIndex = "median";
    }
}

function findId(id) {
let result = null;
let l = creatures.length - 1; 
    for (i = 0; i < l; i++) {
        if (creatures[i].id == id) {
        result = i;
        }
    }
return result;
}

function idInspect() {
    //document.getElementById("creature_monitor").selectedIndex = 0;
    document.getElementById("creature_monitor").selectedIndex = 1;  
    document.getElementById("inspector").style.visibility = "visible";
    let value = document.getElementById("follow").value;
    let totalCreatures = numberOfCreatures + deathsCreatures;
    if (isNaN(value)) {
    window.selectedCreature = null;
    creature_inspector.innerHTML = "Not a valid ID, please enter a number.";
    } else if (value <= (totalCreatures)) {
    let id = findId(value);
    if (id !== null) {
    var index = creatures[id];
    presentStats(index);
    } else {
    window.selectedCreature = null;
    creature_inspector.innerHTML = "This creature is dead.";
    }
    } else if (value > (totalCreatures)) {
    window.selectedCreature = null;
    creature_inspector.innerHTML = "This creature hasn't been born yet!";
    } else {
    window.selectedCreature = null;
    creature_inspector.innerHTML = "This creature is dead.";
    }
}

function presentStats(index) {
    window.selectedCreature = index;
    //window.creatures[index]
    // Get diet
    if (index.carnivorous == false) { 
        diet = "Herbivore"; 
    } else if (index.carnivorous == true) {
        diet = "Carnivore";
    }
    // Get movement:
    /*if (index.moveMethod == 1) {
        movement = "Random Straight"
    } else if (index.moveMethod == 2) {
        movement = "Random Walk"
    } else if (index.moveMethod == 3) {
        movement = "Random Straight Bounce"
    }*/
    // Convert to percentage
    directionalChangeChance = Math.round(((1/index.directionalChangeChance) * 100) * 100) / 100;
    mutability = Math.round(((1/index.mutability) * 100) * 100) / 100;
    // Get direction genes in Array
    /*directionGenes = [];
    for (j = 0; j < index.directionGenes.length; j++) {
        let percentage = Math.round(((index.directionGenes[j]) * 100));
        if (j == 0) {
            dir = "N";
        } else if (j == 1) {
            dir = "NE";
        } else if (j == 2) {
            dir = "E";
        } else if (j == 3) {
            dir = "SE";
        } else if (j == 4) {
            dir = "S";
        } else if (j == 5) {
            dir = "SW";
        } else if (j == 6) {
            dir = "W";
        } else if (j == 7) {
            dir = "NW";
        }
        directionGenes.push(" " + percentage.toString() + dir);
    }*/
    let result = "ID: " + index.id.toString() + ", Generation: " + index.generation.toString() + "<br>"
    + "Mutations: " + index.mutations.toString() + "<br>"
    + "Age/MaxAge: " + index.age.toString() + "/" + index.maxLifespan.toString() + "<br>"
    //+ "Age/max: " + index.age.toString() + "/" + index.maxLifespan.toString() + "<br>"
    //+ "Metabolism/death: " + index.currentMetabolism.toString() + "/" + index.metabolismLife.toString() + "<br>"
    + "Speed/MaxSpeed: " + Math.round(index.moveSpeed).toString() + "/" 
    + Math.round(index.maxSpeed).toString() + "<br>"
    //+ "Direction change: " + directionalChangeChance.toString() + "%" + "<br>"
    //+ "%Dir:" + directionGenes + "<br>"
    + "Diet: " + diet + "<br>"
    + "Energy/to reproduce: " + (Math.round(index.energy * 10) / 10).toString() + "/" + index.energyToReproduce.toString() + "<br>"
    + "Children: " + index.children.toString() + "<br>"
    //+ "Reproduce: " + index.reproductionChance.toString() + "%" + "<br>"
    //+ "Mutability: " + mutability.toString() + "%" + "<br>"
    + "X, Y: " + index.x.toString() + ", " + index.y.toString() + "<br>";
    creature_inspector.innerHTML = result;
}