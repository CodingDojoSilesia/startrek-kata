const SpaceObject = require('./spaceObject');

class SpaceShip extends SpaceObject {
    constructor(quadrant, sector, power){
        super(quadrant, sector, 'ship');
        this.power = power;
    }
}

module.exports = SpaceShip;