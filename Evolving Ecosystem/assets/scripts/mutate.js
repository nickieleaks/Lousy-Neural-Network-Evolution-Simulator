
/*function colourMutate(colour) {
    colour = coloursArray[~~(Math.random() * coloursArray.length)];
        return colour;
}*/

function speedMutate(speed) {
        let flip = getRandomNumberBetween(1,2);
        if (flip == 1 && speed < 100) {
            speed = speed + getRandomNumberBetween(1,10);
        } else if (flip == 2 && speed > 2) {
            speed = speed - getRandomNumberBetween(1,10);
        } else if (flip == 2 && speed <= 2) {
            speed = speed + getRandomNumberBetween(1,10);
        } else if (flip == 1 && speed >=100) {
            speed = speed - getRandomNumberBetween(1,10);
        }
    speed = clamp(speed, 1, 100);
    return speed;
}

function directionMutate(speed) {
    let flip = getRandomNumberBetween(1,2);
    if (flip == 1 && speed < 100) {
        speed = speed + getRandomNumberBetween(1,10);
    } else if (flip == 2 && speed > 2) {
        speed = speed - getRandomNumberBetween(1,10);
    } else if (flip == 2 && speed <= 2) {
        speed = speed + getRandomNumberBetween(1,10);
    } else if (flip == 1 && speed >=100) {
        speed = speed - getRandomNumberBetween(1,10);
    }
    speed = clamp(speed, 1, 100);
    return speed;
}

function lifeMutate(lifespan) {
        let flip = getRandomNumberBetween(1,2);
        if (flip == 1) {
            lifespan = lifespan + getRandomNumberBetween(1,10);
            return lifespan;
        } else if (flip == 2 && lifespan >= 100) {
            lifespan = lifespan - getRandomNumberBetween(1,10);
            return lifespan;
        } else if (flip == 2 && lifespan < 100) {
            lifespan = lifespan + getRandomNumberBetween(1,10);
            return lifespan;
        }
}

//? repeat
function mutabilityMutate(mutability) {
    let flip = getRandomNumberBetween(1,2);
    if (flip == 1) {
        mutability = mutability + getRandomNumberBetween(1,25);
    } else if (flip == 2 && mutability > 0) {
        mutability = mutability - getRandomNumberBetween(1,25);
    } else if (flip == 2 && mutability <= 0) {
        mutability = mutability + getRandomNumberBetween(1,25);
    }
    mutability = clamp(mutability, 1, 100);
    return mutability;
}



// REMOVED 
function getRandomDirectionGenes() {
    genes = [];
    sum = 0;
    for (var i = 0; i < 8; ++i) {
        genes[i] = Math.random();
        sum += genes[i];
    }
    for (var i = 0; i < 8; ++i) {
        genes[i] = genes[i] / sum;
    }
    return genes;
}

function mutateDirectionGenes(genes) {
    // Clone the directional gene array so that it can be modified
    newGenes = genes;
    // Mutate just one directional gene
    n = Math.floor(Math.random() * newGenes.length);
    newGenes[n] += (Math.random() - 0.5);
    // Ensure gene value never drops below 0 
    if (newGenes[n] < 0) {
        newGenes[n] = 0;
    }
    // Get the sum before we normalise the genes
    sum = 0;
    for (i = 0; i < genes.length; i++) {
        sum += newGenes[i];
    }
    // Normalize the probabilities so that the sum equals one (100%) again
    for (i = 0; i < genes.length; i++) {
        newGenes[i] = newGenes[i] / sum;
    }
    return newGenes;
}