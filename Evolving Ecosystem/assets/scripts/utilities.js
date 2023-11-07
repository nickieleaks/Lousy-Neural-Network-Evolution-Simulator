// Generates a Random Number Between min and max values (helper function)
function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Sort array of objects by a property, sample usage:
// Array.sort(dynamicSort("objectPropertyString"));
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// Sort array of objects by multiple properties
function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

function massExtinction() {
    extinctCreatures = [];
    for (i = 0; i < window.creatures.length; i++) {
        if (window.creatures[i].moves == true) {
            extinctCreatures.push(i);
            window.deathsCreatures++;
        }
    }
    window.deathsCreatures -=1;
    for (var j = extinctCreatures.length - 10; j >= 0; j--) {
        extinctCreature = extinctCreatures[j];
        window.creatures.splice(extinctCreature, 1);
      }
}

function famine() {
    deadPlants = [];
    for (i = 0; i < window.creatures.length; i++) {
        if (window.creatures[i].moves == false) {
            deadPlants.push(i);
            window.deathsPlants++;
        }
    }
    for (var j = deadPlants.length - 10; j >= 0; j--) {
        deadPlant = deadPlants[j];
        window.creatures.splice(deadPlant, 1);
      }
      window.deathsPlants -= 9;
}

// Doesn't Work
function toggleVariable(x) {
    if (x == false) {
        x = true;
    } else if (x == true) {
        x = false;
    }
}

function toggleForest() {
    if (window.forest == false) {
        window.forest = true;
    } else if (window.forest == true) {
        window.forest = false;
    }
}

function togglePlantLines() {
    if (window.foodlines == false) {
        window.foodlines = true;
    } else if (window.foodlines == true) {
        window.foodlines = false;
    }
}

function toggleAmbientFood() {
    if (window.ambientFood == false) {
        window.ambientFood = true;
    } else if (window.ambientFood == true) {
        window.ambientFood = false;
    }
}

function playPause() {
    if (window.pause == false) {
        window.pause = true;
    } else if (window.pause == true) {
        window.pause = false;
    }
}

function renderHide() {
    if (window.render == false) {
        window.render = true;
    } else if (window.render == true) {
        window.render = false;
    }
}

function pathsReal() {
    if (window.viewPaths == false) {
        window.viewPaths = true;
    } else if (window.viewPaths == true) {
        window.viewPaths = false;
    }
}

function greatBloom() {
    for (i = 0; i < 40000; i ++) {
        spawnPlant(getRandomNumberBetween(0, simulationWidth), getRandomNumberBetween(0, simulationHeight));
    }
}

function cameraToggle() {
    if (microscope == false) {
        microscope = true;
        //camera.moveTo(selectedCreature.x*2, selectedCreature.y*2);
    } else if (microscope == true) {
        microscope = false;
        camera.zoomTo(504);
        camera.moveTo(251, 251);
    }
}

// DOES NOT WORK AS INTENDED
function confirmPopup(text, executeFunction) {
    if (confirm(text) == false) {
    } else if (confirm(text) == true) {
    executeFunction;
    }
}

function resetSimulation() {
    window.location.reload();
}

function updateSimulationSpeed(value) {
    window.updateTimeout = value;
}

// Clamp value to min, max
function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}


// OUTDATED

function maxPlants() {
    plantsToGenerate = 3000 - window.numberOfPlants;
    generatePlantsEverywhere(plantsToGenerate);
}