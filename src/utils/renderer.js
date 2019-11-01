const eol = require("os").EOL;
const config = require("../config");

const objectSymbols = {
    player: "<*>",
    ship: "+++",
    starbase: ">!<",
    star: " * "
};

function displayPlayerRaport(player) {
    return `Quadrant: ${player.quadrant.x}|${player.quadrant.y}, sector: ${player.sector.x}|${player.sector.y}, power: ${player.power}`;
}

function renderQuadrant(player, gameObjects) {
    let quadrantString = renderEmptyQuadrant();
    const playerStrPos = getPosInQuadStr(player.sector.x, player.sector.y);
    for (let i = 0; i <= gameObjects.length; i++) {
        let symbol = "";
        let objectPos = 0;
        if (i < gameObjects.length) {
            symbol = objectSymbols[gameObjects[i].type];
            objectPos = getPosInQuadStr(gameObjects[i].sector.x, gameObjects[i].sector.y);
        } else {
            symbol = objectSymbols["player"];
            objectPos = getPosInQuadStr(player.sector.x, player.sector.y);
        }
        quadrantString = quadrantString.substr(0, objectPos) + symbol + quadrantString.substr(objectPos + 3);
    }
    return quadrantString;
}

function getPosInQuadStr(x, y) {
    const quadSideLength = Math.sqrt(config.GALAXY.SECTORS_IN_QUADRANT);
    let rowLength = 3 * quadSideLength + 3 + eol.length;
    return rowLength * quadSideLength - y * rowLength + 2 + x * 3;
}

function renderEmptyQuadrant() {
    let quadrantString = "  ";
    let quadrantSideLength = Math.sqrt(config.GALAXY.SECTORS_IN_QUADRANT);
    for (let i = 0; i < quadrantSideLength; i++) {
        quadrantString += `_${i}_`;
    }
    quadrantString += ` ${eol}`;
    for (let x = 0; x < quadrantSideLength; x++) {
        quadrantString += quadrantSideLength - 1 - x + "|";
        for (let y = 0; y < quadrantSideLength; y++) {
            quadrantString += " . ";
        }
        quadrantString += "|" + eol;
    }
    return quadrantString;
}

function render2dArr(arr){
    let renderStr = '';
    arr.forEach(x => {
        x.forEach(y => {
            renderStr += `|${y.join('')}|`;
        });
        renderStr += eol;
    });
    return renderStr;
}
module.exports = {
    renderQuadrant,
    renderEmptyQuadrant,
    getPosInQuadStr,
    render2dArr,
    displayPlayerRaport
};
