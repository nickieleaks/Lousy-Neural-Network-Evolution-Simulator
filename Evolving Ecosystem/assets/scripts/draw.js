function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

// Colour bank
var Colours = {};
Colours.cyan = "#00FFFF";
Colours.fuchsia = "#FF00FF";
Colours.yellow = "#FFFF00";
Colours.red = "#FF0000";
Colours.lime = "#65FE08";
Colours.forestgreen = "#21B437";
Colours.orange = "#FFA500";
Colours.white = "#FFFFFF";

// Array of colours 
var coloursArray = [Colours.cyan, Colours.fuchsia, Colours.yellow, Colours.red, /*Colours.lime,*/ Colours.orange, /*Colours.forestgreen,*/ Colours.white];  

// Get a random colour (used to generate creature colours)
function getRandomColour() {
    var rand = coloursArray[~~(Math.random() * coloursArray.length)];
    return rand;
}

// Get other random colours
function getOtherRandomColour(otherColours) {
    var rand = otherColours[~~(Math.random() * otherColours.length)];
    return rand;
}

// Draw a single square pixel in a specified colour
function drawPixel(x, y, colour) {
    //ctx.scale(0.5,0.5);
    ctx.beginPath();
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, 1, 1);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
   // ctx.rect(x, y, 1, 1);
    //ctx.fillStyle = colour;
    //ctx.fill();
    //ctx.closePath();
}

// Function to draw a 2 x 2 creature, input x and y location coordinates, then Colours.x
function drawCreature(x, y, a, b, c, d) {
    drawPixel(x*2, y*2, a);
    drawPixel(x*2 + 1, y*2, b);
    drawPixel(x*2, y*2 +1, c);
    drawPixel(x*2 +1, y*2 + 1, d);
}

function drawPlants() {
    // Render into the environment canvas
    // Reset current transformation matrix to the identity matrix
    //ctx.drawImage(canvas, 0, 0);
    /*plantsCtx.scale(2, 2);*/
    //plantsCtx.setTransform(1, 0, 0, 1, 0, 0); 
    //plantsCanvas.getContext('2d').putImageData(imgWorld, 0, 0);
    plantsCtx.putImageData(imgWorld, 0, 0);
    plantsCtx.drawImage(canvas, camera.viewport.left,camera.viewport.right, camera.viewport.top, camera.viewport.bottom, 0, 0, 800, 800);
    var imD = plantsCtx.getImageData(0,0,800,800);
    //plantsCtx.clearRect(0, 0, simulationWidth*2, simulationHeight*2);
    ctx.putImageData(imD, 0, 0);
    ctx.drawImage(canvas, 0,0, 800, 800, 0, 0, 800, 800);
    /*plantsCtx.scale(0.5,0.5);
    plantsCtx.scale(4,4);
    plantsCtx.drawImage(plantsCanvas, 0, 0);
    plantsCtx.translate(-canvas.width / 2, -canvas.height / 2);
    plantsCtx.setTransform(1, 0, 0, 1, 0, 0);*/
      // <-- added
    /*plantsCtx.drawImage(canvas,0 ,0, canvas.width, canvas.height);
    plantsCtx.translate(125,125);
    plantsCtx.scale(2, 2);
    plantsCtx.translate(-canvas.width / 2, -canvas.height / 2);*/
};




// Draws rectanglular pixel shape, used for lava at map's edges DOESN'T WORK RIDICULOUSLY LAGGY DO NOT USE
function drawRectangle(x, y, colour, a, b) {
    for (i = x; i < a; i++) {
        drawLava (x, i, getOtherRandomColour(colour));
        for (j = y; j < b; j++) {
            drawLava (j, y, getOtherRandomColour(colour));
        }
    }
}

// Draw 2 * 2 with a single colour DO NOT USE
function drawLava(x, y, a) {
    drawPixel(x, y, a);
    drawPixel(x + 1, y - 1, a);
    drawPixel(x, y - 1, a);
    drawPixel(x +1, y, a);
}

// UNUSED
function drawPlant(x = 0, y =0) {
    ctx.beginPath();
    ctx.rect(x, y, 2, 2);
    ctx.fillStyle = Colours.lime;
    ctx.fill();
}