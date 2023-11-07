// Time and time-related events
function incrementTime(time = 1) {
    for (var i =0; i < time; i++) {
      //depleteCreaturesEnergy();
      if (window.numberOfCreatures == 0 && window.time >=100) {
        if (window.time % 10 == 0)//window.time % 2000 == 0) 
        {
        genesisCreature(1);
        //generateCreatures(1);
        }
        //window.inspector = false; for testing
      }
      if (inspector == true) {
        getOldestCreature(inspectorParameter);
      }
      // Iterate through and update each creature
      creaturesToKill = [];
      newCreatures = [];
      let l = window.creatures.length;
      for (i = 0; i < l; i++) {
        index = i;
        window.creatures[i].age += 1;
        creatureKiller(window.creatures[i]);
        //moveCreatures(window.creatures[i]);
        creatureAct(window.creatures[i]);
        //creatureEat(window.creatures[i]);
      }
      //DOES NOT WORK
      /*var j = 0;
      var firstCreature = window.creatures[j];
        while (firstCreature != null) {
            next = moveCreatures(firstCreature);
            firstCreature = next;
        }*/
    // Kill the creatures
    creaturesCopy = window.creatures;
    let m = window.creaturesToKill.length - 1;
    for (var j = m; j >= 0; j--) {
    creatureKilled = creaturesToKill[j];
    creaturesCopy.splice(creatureKilled, 1);
    }
    window.creatures = creaturesCopy;
    // Concatenate to global creatures array
  window.creatures = window.creatures.concat(newCreatures);
  //return creatures;
    // And reproduce Creatures
    //reproduceCreatures();
    // Concatenate to global creatures array
     //return creatures;
     if (window.ambientFood == true) {
      spawnPlants(getRandomNumberBetween(1, 10));
     }
      if (window.forest == true) {
        spawnForest(getRandomNumberBetween(1, 5));
      }
      if (window.foodlines == true) {
      spawnLine(getRandomNumberBetween(1, 25));
      }
      //generateForest(getRandomNumberBetween(1,3));
      //generateDenseForest(1);
      //generatePlants(getRandomNumberBetween(0,8));
      //generateDesert(getRandomNumberBetween(0,1));
      //var chance = getRandomNumberBetween(1,100);
      //oldAgeKill(100);
      creature_total.innerHTML = window.numberOfCreatures;
      plant_total.innerHTML = window.numberOfPlants;
      time_total.innerHTML = window.time;
      deaths_creatures.innerHTML = window.deathsCreatures;
      deaths_plants.innerHTML = window.deathsPlants;
      window.time++;
      //quadtreeLoop();
      plantsThatCollide = [];
      numberOfCreatures = 0;
      //numberOfPlants = 0;
      /* Draws Creatures according to their updated locations, 
      creatures are 2 x 2? and can have 4 different colors */
      let n = window.creatures.length;
         for (var i = 0; i < n; i++) {
         obj = window.creatures[i];
         index = i;
         //drawCreature(x, y, window.creatures[i].colourA, window.creatures[i].colourB, window.creatures[i].colourC, window.creatures[i].colourD);
          if(obj.moves == true) {
           numberOfCreatures++
          }
          // Executes if creatures collide with other creatures
          if(obj.check == 1) {
          //drawCreature(x, y, Colours.red, Colours.red, Colours.red, Colours.red);
          //obj.energy += getRandomNumberBetween(25,50);
            if (obj.moveMethod == 3) {
              obj.dir = getRandomNumberBetween(1,8)-1;
            }
          //Testing!
          }
            else if(obj.check == 2) {
          plantsThatCollide.push(index);
          window.deathsPlants++;
          } else if (obj.check == 3) {
          plantsThatCollide.push(index);
          window.deathsPlants++;
          }
          else if (obj.check == 4) {
          //plantsThatCollide.push(index);
          } else if (obj.check == 5) {
              if (obj.moveMethod == 3) {
                obj.dir = getRandomNumberBetween(1,8)-1;
              } 
            } else if (obj.check == 7) {
            //obj.energy += getRandomNumberBetween(1, obj.energyToReproduce);
            } else if (obj.check == 8) {
            plantsThatCollide.push(index);
            window.deathsCreatures++;
            }
          //drawCreature(x, y, window.creatures[i].colourA, window.creatures[i].colourB, window.creatures[i].colourC, window.creatures[i].colourD);
          /*drawPixel(x, y, Colours.lime);
          drawPixel(x + 1, y - 1, Colours.lime);
          drawPixel(x, y - 1, Colours.lime);
          drawPixel(x +1, y, Colours.lime);*/
          
        } 
      // Count plants and creatures
      // Calculate the number of plants
      // obsolete // numberOfPlants = window.creatures.length - numberOfCreatures;
      // Removes plants that have been eaten
      let o = plantsThatCollide.length - 1;
      for (var j = o; j >= 0; j--) {
        plantEaten = plantsThatCollide[j];
        window.creatures.splice(plantEaten, 1);
      }
    }
    return window.time;
    //console.log(window.time);
}




function update() {
    if (pause == false) {
    // Clears the canvas each turn for updates
    // Resets creatures that collide each update
    // Increases time  
    incrementTime(1);
    //x = x + 1;
    } else if (pause == true) {
    }
    camera.begin();
    if (render == true) {
    if (viewPaths == true) {
    } else {
    ctx.clearRect(0, 0, simulationWidth*2, simulationHeight*2);
    }
    drawPlants();
    // Render Plants 
    //drawRectangle(0, 0, [Colours.red, Colours.orange], 125, 125);
    // Count plants and creatures
    // Calculate the number of plants
    //Renders all creatures!!
    let l = window.creatures.length;
    for (var i = 0; i < l; i++) {
      var x = window.creatures[i].x;
      var y = window.creatures[i].y;
      if (window.creatures[i].moves == true) {
      drawCreature(x, y, window.creatures[i].colourA, window.creatures[i].colourB, window.creatures[i].colourC, window.creatures[i].colourD);
      } else if (window.creatures[i].moves == false) { // Handling Plants separately benefits rendering 
        //ctx.drawImage(cacheCanvas, x, y); // Pre-rendered canvas (no noticeable performance benefit)
        /*ctx.beginPath();
        ctx.rect(x, y, 2, 2);
        ctx.fillStyle = Colours.lime;
        ctx.fill();
        ctx.closePath();*/
        //drawCreature(x, y, Colours.lime, Colours.lime, Colours.lime, Colours.lime);
      }
    }
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Draws plants, which don't move ! obsolete, now plants are to be treated as creatures!
    //ctx.beginPath(); should be fine to delete
    /*for (var i = 0; i < window.plants.length; i++) {
      var x = window.plants[i].x;
      var y = window.plants[i].y;
      drawCreature(x, y, Colours.lime, Colours.lime, Colours.lime, Colours.lime);
    }*/
    //ctx.fill(); should be fine to delete
    //ctx.closePath(); should be fine to delete
  // If the simulation is paused, instead:
    } else if (render == false) {
    }
// You need to make sure to include this
// Keep in mind though, resetTransform doesn't exist in some browsers, you may want to use setTransform instead
/*ctx.setTransform(1, 0, 0, 1, 0, 0); 
ctx.translate(125,125);
ctx.scale(2, 2);
ctx.translate(-canvas.width / 2, -canvas.height / 2);*/

// Let the camera follow the selected creature... 
if (selectedCreature !== null) {
  if (microscope === true) {
    camera.zoomTo(54);
    if (time % 10 == 0) {
    camera.moveTo(selectedCreature.x*2, selectedCreature.y*2);
  }
} 
} else if (selectedCreature === null) {
  // The default camera is locked to view the whole world at maximum zoom level
  camera.zoomTo(504);
  camera.moveTo(251, 251);
}
window.setTimeout(update, updateTimeout)
camera.end();
}

function changeTime(rate) {
  if (rate == 1) {
  window.updateTimeout = 128;
  } else if (rate == 2) {
  window.updateTimeout = 64;
  } else if (rate == 4) {
    window.updateTimeout = 32;
  } else if (rate == 8) {
    window.updateTimeout = 16;
  } else if (rate == 16) {
    window.updateTimeout = 8;
  } else if (rate == 32) {
    window.updateTimeout = 4;
  } else if (rate == 64) {
    window.updateTimeout = 2;
  } else if (rate == 128) {
    window.updateTimeout = 1;
  } else if (rate == 0.5) {
    window.updateTimeout = 256;
  } else if (rate == 0.25) {
    window.updateTimeout = 512;
  } else if (rate == 0.125) {
    window.updateTimeout = 1024;
  }
}
