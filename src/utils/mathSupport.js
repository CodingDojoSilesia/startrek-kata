const Point = require('./point');

function cityBlockDistance(x1, y1, x2, y2)
{
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function randomUniques(min, max, length){
    let uniques = new Set();
    if (length > max - min)
        throw new RangeError('Providen length is bigger than range');
    while(uniques.size < length){
        let rnd = Math.floor(Math.random() * (max - min)) + min
        uniques.add(rnd);
    }
    return Array.from(uniques);
}

function getQuadrantFromSectorNumber(sectorNumber){
    let x = Math.floor(sectorNumber / 8) % 8;
    let y = Math.floor(sectorNumber / 512);
    return new Point(x, y);
}

function getSectorFromSectorNumber(sectorNumber){
    let x = sectorNumber % 8;
    let y = Math.floor(sectorNumber / 64) % 8;
    return new Point(x, y);
}

function getSectorNumberFromPosition(quadrant, sector){
    return quadrant.x * 8 + quadrant.y * 512 + sector.x + sector.y * 64; 
}

function getGlobalPositionFromSectorNumber(sectorNumber){
    return new Point(sectorNumber % 64, Math.floor(sectorNumber / 64));
}

module.exports = {
    cityBlockDistance,
    randomUniques,
    getQuadrantFromSectorNumber,
    getSectorFromSectorNumber,
    getSectorNumberFromPosition,
    getGlobalPositionFromSectorNumber
};
