const SpaceObject = require('./spaceObject');

class SpaceShip extends SpaceObject {
    constructor(quadrant, sector, power){
        super(quadrant, sector, 'ship');
        this.power = power;
    }

    reducePower(amount) {
        this.power -= amount;
        if(this.power <= 0)
            this.isDestroyed = true;
    }
}

module.exports = SpaceShip;