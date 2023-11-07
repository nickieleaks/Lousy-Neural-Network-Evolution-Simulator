// The Quadtree
var myTree = new Quadtree({
    x: 0,
    y: 0,
    width: 250,
    height: 250
});

function quadtreeLoop() {
    // 1. Clear the tree
    myTree.clear();

    // 2. Insert creatures into the tree
    for (var i = 0; i < window.creatures.length; i++) {
        // Update all as non-intersection (before we run the collision check later)
        window.creatures[i].check = false;
        myTree.insert(window.creatures[i]);
    }

    // 3. Now that the tree is filled, we have to check each object for collisions
    for (var i = 0; i < window.creatures.length; i++) {

        var myObject = window.creatures[i];

        // 4. This gets all collision candidates
        var candidates = myTree.retrieve(myObject);

        // 5. Iterating through candidates while checking for collisions
        for (k = 0; k < candidates.length; k++) {

            var myCandidate = candidates[k];

            // 6. Exclude checking objects against themselves
            if (myObject === myCandidate) continue;
            // 7. If object intersects, get intersection data
            var intersect = getIntersection(myObject, myCandidate);
            // 8. If there is no intersection, nothing is executed
            if (intersect === false) continue;
            if (intersect === true && myObject.carnivorous == false) continue;
            // 9. Update entity as checked with values depending on status: creature or plant?
            if (myObject.check == false && myCandidate.check == false) {
                /*if (myObject.moves == true && myObject.carnivorous == false && myCandidate.moves == false) {
                myObject.check = 1;
                myCandidate.check = 2;
                } */
            // Plants will overcrowd each other if they spawn overlappingly
             /*else if (myObject.check == false && myCandidate.check == false && myObject.moves == false && myCandidate.moves == false) {
                myObject.check = 3;
                myCandidate.check = 4;
            }*/ if (myObject.moves == true && myObject.carnivorous == true && myCandidate.moves == true && myCandidate.carnivorous == false) {
                myObject.check = 7;
                myCandidate.check = 8;
            } else if (myObject.moves == true && myObject.carnivorous == true && myCandidate.moves == true && myCandidate.carnivorous == true && myCandidate.age > 15) {
                myObject.check = 7;
                myCandidate.check = 8; 
             }else if (myObject.moves == true && myCandidate.moves == true) {
                myObject.check = 5;
                myCandidate.check = 6;
            } 
            /*} else if (myObject.moves == true && myCandidate.moves == true) {
            myObject.check = 5;
            myCandidate.check = 6;
            } else if (myObject.moves == false && myCandidate.moves == true) {
            myObject.check = 7;
            myCandidate.check = 8;*/
            }

            //Perform X Push
            /*if (myObject.moves == true && myCandidate.moves == true) {
                if(intersect.pushX < intersect.pushY) {

                if(intersect.dirX < 0) {
                    myObject.x = myCandidate.x - myObject.width;
                } else if(intersect.dirX > 0) {
                    myObject.x = myCandidate.x + myCandidate.width;
                }
                
                //Reverse X trajectory (bounce)
                myObject.vx *= -1;
            
            //Perform Y Push
                } else {

                if(intersect.dirY < 0) {
                    myObject.y = myCandidate.y - myObject.height;
                } else if(intersect.dirY > 0) {
                    myObject.y = myCandidate.y + myCandidate.height;
                }
                
                //reverse Y trajectory (bounce)
                myObject.vy *= -1;
                }
            }*/
        }
    }
}

// Gets intersection for colliding entities
function getIntersection(r1, r2) {

    var r1w = r1.width/2,
        r1h = r1.height/2,
        r2w = r2.width/2,
        r2h = r2.height/2;

    var distX = (r1.x + r1w) - (r2.x + r2w);
    var distY = (r1.y + r1h) - (r2.y + r2h);

    if(Math.abs(distX) < r1w + r2w && Math.abs(distY) < r1h + r2h) {
        return {
            pushX : (r1w  + r2w) - Math.abs(distX),
            pushY : (r1h  + r2h) - Math.abs(distY),
            dirX : distX === 0 ? 0 : distX < 0 ? -1 : 1,
            dirY : distY === 0 ? 0 : distY < 0 ? -1 : 1
        }
    } else {
        return false;
    }
}