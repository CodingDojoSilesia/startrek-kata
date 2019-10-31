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

module.exports = {
    cityBlockDistance,
    randomUniques
};
